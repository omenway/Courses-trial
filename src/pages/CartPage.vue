<template>
    <div class="space-y-4">
        <div class="flex items-end justify-between gap-4">
            <h1 class="text-3xl font-bold font-comfortaa">My Cart</h1>
            <div class="text-sm text-gray-700">
                Items: <span class="font-semibold">{{ bookStore.cart.length }}</span>
            </div>
        </div>

        <div v-if="bookStore.cart.length === 0" class="bg-white/70 border border-white/50 rounded-xl p-6">
            <div class="text-gray-700">Your cart is empty.</div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CartItem
                v-for="item in bookStore.cart"
                :key="item.cartItemId"
                :item="item"
                @confirm="bookStore.confirmPurchase(item.cartItemId)"
                @remove="bookStore.removeFromCart(item.cartItemId)"
            />
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from "@/stores/store";

import CartItem from "@/shared/CartItem.vue";

// This page is purely a renderer: all cart logic lives in the Pinia store.
const bookStore = useBookStore();
</script>

