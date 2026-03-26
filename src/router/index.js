import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import CoursesPage from '@/pages/CoursesPage.vue'
import CartPage from '@/pages/CartPage.vue'
import MyCoursesPage from '@/pages/MyCoursesPage.vue'

const router = createRouter({
    history: createWebHistory(),
    // Routes map URLs -> page components.
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/courses', name: 'courses', component: CoursesPage },
        { path: '/cart', name: 'cart', component: CartPage },
        { path: '/my-courses', name: 'myCourses', component: MyCoursesPage },
        // Catch-all route: redirect unknown URLs back to home.
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
    scrollBehavior() {
        // Beginner-friendly UX: every navigation goes to the top.
        return { top: 0 }
    },
})

export default router

