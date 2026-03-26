<template>
    <div class="bg-white border border-gray-300 rounded-md p-4">
        <div
            v-if="$slots.header"
            class="p-4 text-medium font-bold border-b border-gray-300 font-[700]"
        >
            <slot name="header"></slot>
        </div>

        <div :class="{ 'p-4 text-medium border-b border-gray-300': $slots.footer }">
            <slot></slot>
        </div>

        <div v-if="$slots.footer" class="p-4 text-medium">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup></script>
