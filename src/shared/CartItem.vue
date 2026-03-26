<template>
    <CardSections>
        <!-- Uses `item` (a cart entry) coming from the store -->
        <template #header>{{ item.title }}</template>
        <div class="text-gray-700">{{ item.author }}</div>
        <template #footer>
            <div class="text-sm text-gray-600 mb-3">{{ item.category }}</div>
            <div class="flex gap-2">
                <!-- Confirm moves the cart entry into "My Courses" via the store -->
                <RoundedButton @click="$emit('confirm')">Confirm</RoundedButton>
                <!-- Delete removes this cart entry (only from cart) -->
                <RoundedButton variant="danger" @click="$emit('remove')">Delete</RoundedButton>
            </div>
        </template>
    </CardSections>
</template>

<script setup>
import CardSections from "@/components/CardSections.vue";
import RoundedButton from "@/components/RoundedButton.vue";

defineProps({
    item: { type: Object, required: true },
});

defineEmits(["confirm", "remove"]);
</script>

