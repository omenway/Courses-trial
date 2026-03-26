<template>
    <div>
        <button
            :class="[
                'border border-gray-200 rounded-full px-3 py-1 transition-colors duration-200 text-black hover:scale-105',
                variant === 'danger'
                    ? 'bg-gradient-to-r from-red-400 to-red-600 hover:bg-red-500 hover:text-white'
                    : 'bg-gradient-to-r from-blue-400 to-indigo-400 hover:bg-blue-400 hover:text-white',
            ]"
            @click="$emit('click')"
        >
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
defineEmits(["click"]);

defineProps({
    variant: {
        type: String,
        default: "default",
    },
});
</script>
