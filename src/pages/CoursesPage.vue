<template>
    <div class="space-y-4">
        <div class="flex items-end justify-between gap-4">
            <h1 class="text-3xl font-bold font-comfortaa">Courses</h1>
            <div class="text-sm text-gray-700">
                Cart: <span class="font-semibold">{{ bookStore.cart.length }}</span>
            </div>
        </div>

        <LoadingSpinner v-if="bookStore.loading" />

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <BookCard
                v-for="course in bookStore.courses"
                :key="course._id"
                :title="course.title"
                :author="course.author"
                :description="course.category"
                @click="bookStore.addToCart(course)"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useBookStore } from "@/stores/store";

import BookCard from "@/components/BookCard.vue";
import LoadingSpinner from "@/shared/LoadingSpinner.vue";

const bookStore = useBookStore();

onMounted(() => {
    // Ensures `bookStore.courses` is fetched from the API before rendering cards.
    bookStore.ensureCoursesLoaded();
});
</script>

