import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
// Enables "persist" for selected store state so cart + myCourses survive refresh.
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
// Mount the Vue app after registering plugins.
app.mount('#app')
