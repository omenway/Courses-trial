<template>
    <div class="space-y-10">
        <section class="bg-white/70 border border-white/50 rounded-xl p-6">
            <h1 class="text-3xl font-bold font-comfortaa">Courses Hub</h1>
            <p class="text-gray-700 mt-2 max-w-2xl">
                A small Vue learning project: browse courses, add them to your cart, and confirm
                purchase to save them in “My Courses”.
            </p>
        </section>

        <section class="space-y-4">
            <div class="flex items-end justify-between gap-4">
                <h2 class="text-2xl font-medium font-comfortaa">Latest Courses</h2>
                <RouterLink class="underline text-sm text-gray-700" to="/courses">
                    View all
                </RouterLink>
            </div>

            <LoadingSpinner v-if="bookStore.loading" />

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <BookCard
                    v-for="course in bookStore.latestCourses"
                    :key="course._id"
                    :title="course.title"
                    :author="course.author"
                    :description="course.category"
                    @click="bookStore.addToCart(course)"
                />
            </div>
        </section>

        <section class="space-y-4">
            <h2 class="text-2xl font-medium font-comfortaa">Highest Rated</h2>

            <LoadingSpinner v-if="bookStore.loading" />

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <BookCard
                    v-for="course in bookStore.highestRatedCourses"
                    :key="course._id"
                    :title="course.title"
                    :author="course.author"
                    :description="course.category"
                    @click="bookStore.addToCart(course)"
                />
            </div>
        </section>

        <section class="space-y-4">
            <h2 class="text-2xl font-medium font-comfortaa">Reviews</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ReviewCard
                    name="Maha"
                    title="Simple and clean"
                    body="I liked how fast it was to browse and save courses. Perfect for a learning project."
                />
                <ReviewCard
                    name="Fahad"
                    title="Great structure"
                    body="Pages + routing + persistence makes it feel like a real app without being complicated."
                />
                <ReviewCard
                    name="Sara"
                    title="Nice components"
                    body="Reusable buttons/cards kept everything consistent. Easy to extend later."
                />
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useBookStore } from "@/stores/store";

import BookCard from "@/components/BookCard.vue";
import LoadingSpinner from "@/shared/LoadingSpinner.vue";
import ReviewCard from "@/shared/ReviewCard.vue";

const bookStore = useBookStore();

onMounted(() => {
    // Load API data once when Home is opened.
    // This enables "latest" + "highest rated" sections.
    bookStore.ensureCoursesLoaded();
});
</script>

