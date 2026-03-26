<template>
    <div class="space-y-4">
        <div class="flex items-end justify-between gap-4">
            <h1 class="text-3xl font-bold font-comfortaa">My Courses</h1>
            <div class="text-sm text-gray-700">
                Owned: <span class="font-semibold">{{ bookStore.myCourses.length }}</span>
            </div>
        </div>

        <div
            v-if="bookStore.myCourses.length === 0"
            class="bg-white/70 border border-white/50 rounded-xl p-6"
        >
            <div class="text-gray-700">No courses purchased yet.</div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MyCourseCard
                v-for="course in bookStore.myCourses"
                :key="course.purchasedId"
                :course="course"
                @unenroll="bookStore.unenrollCourse(course.purchasedId)"
            />
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from "@/stores/store";

import MyCourseCard from "@/shared/MyCourseCard.vue";

// "My Courses" is the persisted "owned" list.
const bookStore = useBookStore();
</script>

