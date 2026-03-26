import axios from "axios";
import { defineStore } from "pinia";

const API_URL = "https://library-management-api-i6if.onrender.com/api";

// This learning project uses a simple flow:
// 1) API -> `courses` (catalog)
// 2) User clicks "Buy Now" -> course goes into `cart`
// 3) User clicks "Confirm" in cart -> item moves into `myCourses` (purchased)
export const useBookStore = defineStore("book", {
  state: () => ({
    courses: [],
    loading: false,
    cart: [],
    myCourses: [],
  }),

  persist: {
    paths: ["cart", "myCourses"],
  },

  getters: {
    isInCart: (state) => (courseId) => state.cart.some((c) => c.id === courseId),
    isPurchased: (state) => (courseId) =>
      state.myCourses.some((c) => c.id === courseId),
    latestCourses(state) {
      return state.courses.slice(0, 3);
    },
    highestRatedCourses(state) {
      // Per project requirement: API returns 6 books total,
      // so "Highest Rated" shows the remaining last 3.
      return state.courses.slice(3, 6);
    },
  },

  actions: {
    async fetchCourses() {
      this.loading = true;

      try {
        // API response shape: { books: [...] }
        const response = await axios.get(`${API_URL}/books`);
        this.courses = response.data.books ?? [];
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        this.loading = false;
      }
    },

    async ensureCoursesLoaded() {
      if (this.loading) return;
      if (this.courses.length > 0) return;
      await this.fetchCourses();
    },

    addToCart(course) {
      const courseId = course?._id;
      if (!courseId) return;
      if (this.isPurchased(courseId)) return;
      if (this.isInCart(courseId)) return;

      // We store cart entries with their own `cartItemId`
      // (so each "cart row" can be removed/confirmed independently).
      const cartItem = normalizeCourse(course);
      this.cart.unshift(cartItem);
    },

    removeFromCart(cartItemId) {
      this.cart = this.cart.filter((c) => c.cartItemId !== cartItemId);
    },

    confirmPurchase(cartItemId) {
      const item = this.cart.find((c) => c.cartItemId === cartItemId);
      if (!item) return;

      if (!this.isPurchased(item.id)) {
        // Add to owned list and remove from cart
        this.myCourses.unshift({
          ...item,
          purchasedId: crypto.randomUUID(),
          purchasedAt: new Date().toISOString(),
        });
      }

      this.removeFromCart(cartItemId);
    },

    unenrollCourse(purchasedId) {
      this.myCourses = this.myCourses.filter((c) => c.purchasedId !== purchasedId);
    },
  },
});

function normalizeCourse(course) {
  return {
    cartItemId: crypto.randomUUID(),
    id: course._id,
    title: course.title,
    author: course.author,
    category: course.category,
  };
}

