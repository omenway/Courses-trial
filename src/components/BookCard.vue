<template>
    <CardSections>
        <template #header>{{ title }}</template>
        <template #default>{{ author }}</template>
        <template #footer>
            <p class="mb-4">{{ description }}</p>
            <div class="flex w-full items-center gap-2">
                <RoundedButton
                    class="min-w-0 w-full flex-1 font-comfortaa"
                    :disabled="purchased || inCart"
                    @click="$emit('click')"
                >
                    {{
                        purchased
                            ? "Already bought"
                            : inCart
                              ? "already in cart"
                              : "Buy Now"
                    }}
                </RoundedButton>
                <RouterLink
                    v-if="courseId"
                    :to="{ name: 'courseDetails', params: { courseId } }"
                    class="font-comfortaa inline-flex min-h-[2.25rem] min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full border border-gray-300 bg-white px-3 py-1.5 text-center text-sm font-medium text-gray-800 shadow-sm transition-colors duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-900"
                >
                    Course details
                </RouterLink>
            </div>
        </template>
    </CardSections>
</template>

<script setup>
import { RouterLink } from "vue-router";

import CardSections from "./CardSections.vue";
import RoundedButton from "./RoundedButton.vue";

defineProps({
    title: String,
    author: String,
    description: String,
    courseId: {
        type: String,
        default: "",
    },
    purchased: {
        type: Boolean,
        default: false,
    },
    inCart: {
        type: Boolean,
        default: false,
    },
});
defineEmits(["click"]);
</script>
