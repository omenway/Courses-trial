<template>
    <CardSections>
        <template #header>{{ title }}</template>
        <template #default>{{ author }}</template>
        <template #footer>
            <p class="mb-4">{{ description }}</p>
            <RoundedButton @click="$emit('click')"> Buy Now </RoundedButton>
        </template>
    </CardSections>
</template>

<script setup>
import CardSections from "./CardSections.vue";
import RoundedButton from "./RoundedButton.vue";

// This is a presentational component:
// it renders UI and emits an event when the user clicks the button.
defineProps({
    title: String,
    author: String,
    description: String,
});
defineEmits(["click"]);
</script>
