<template>
    <CardSections>
        <template #header>{{ title }}</template>
        <div class="text-gray-800">“{{ body }}”</div>
        <template #footer>
            <div class="text-sm text-gray-600">— {{ name }}</div>
        </template>
    </CardSections>
</template>

<script setup>
import CardSections from "@/components/CardSections.vue";

defineProps({
    name: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
});
</script>

