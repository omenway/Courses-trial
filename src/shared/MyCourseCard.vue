<template>
    <CardSections>
        <template #header>{{ course.title }}</template>
        <div class="text-gray-700">{{ course.author }}</div>
        <template #footer>
            <div class="text-sm text-gray-600 mb-3">{{ course.category }}</div>
            <div class="flex">
                <RoundedButton variant="danger" @click="$emit('unenroll', course.purchasedId)">
                    Un-enrol
                </RoundedButton>
            </div>
        </template>
    </CardSections>
</template>

<script setup>
import CardSections from "@/components/CardSections.vue";
import RoundedButton from "@/components/RoundedButton.vue";

// This card is for one purchased entry, so it uses `course.purchasedId`.
defineProps({
    course: { type: Object, required: true },
});

defineEmits(["unenroll"]);
</script>

