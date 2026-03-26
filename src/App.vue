<template>
    <!-- App layout: fixed header/footer + RouterView for page content -->
    <AppHeader />
    <main class="app-main">
        <!-- RouterView displays the matched page component -->
        <div class="max-w-6xl mx-auto px-4 py-6">
            <RouterView />
        </div>
    </main>
    <AppFooter />
</template>

<script setup>
import { RouterView } from "vue-router";
import AppHeader from "@/shared/AppHeader.vue";
import AppFooter from "@/shared/AppFooter.vue";
</script>
