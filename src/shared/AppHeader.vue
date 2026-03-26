<template>
    <header class="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/70 border-b border-white/50">
        <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <RouterLink to="/" class="font-comfortaa font-bold text-lg">Courses Hub</RouterLink>

            <nav class="flex items-center gap-4 text-sm">
                <RouterLink class="hover:underline" to="/">Home</RouterLink>
                <RouterLink class="hover:underline" to="/courses">Courses</RouterLink>
                <RouterLink class="hover:underline" to="/cart">
                    My Cart
                    <span class="ml-1 text-xs text-gray-700">({{ bookStore.cart.length }})</span>
                </RouterLink>
                <RouterLink class="hover:underline" to="/my-courses">My Courses</RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { useBookStore } from "@/stores/store";

// Header reads cart length so the UI updates immediately after "Buy Now".
const bookStore = useBookStore();
</script>

