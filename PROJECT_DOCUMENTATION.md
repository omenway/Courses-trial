# vue-courses — Very Detailed Project Documentation

This document explains the entire project in a “beginner-friendly but very specific” way. It focuses on:
1. How the app starts (entry files).
2. How pages are routed (Vue Router).
3. How data is stored and persisted (Pinia + persisted state).
4. How each page/component works (props, emits, slots, and key logic).
5. How styling is applied (Tailwind + small custom CSS). 

---

## 1) Project at a Glance

This is a small Vue 3 + Vite learning project that demonstrates:
- Fetching a list of “courses/books” from a REST API.
- A basic “buy flow”:
  - Browse courses
  - Click **Buy Now** to add a course into a local **Cart**
  - Go to **My Cart** and click **Confirm** to move the item into **My Courses**
  - (You can also **Delete** from cart, or **Un-enrol** from My Courses)
- Persistence:
  - Your cart and purchased courses are persisted in the browser so refreshing the page keeps them.

Even though the backend calls them “books”, the UI and requirements treat them as “courses”.

---

## 2) Top-Level Files (Config / Tooling)

### `package.json`
This file controls scripts (commands you run) and dependencies.

Important parts:
- `"type": "module"`
  - Tells Node/Vite to treat JS files as ES modules.
- `scripts`
  - `dev`: runs Vite dev server.
  - `build`: creates production build output.
  - `preview`: serves the built production files.
  - `lint`: runs both oxlint and eslint fixes.
  - `format`: runs Prettier on `src/`.
  - `server`: starts a `json-server` mock API, but this project currently uses the hosted API instead (so `db.json` is not required for runtime).
- `dependencies`
  - `vue`: Vue runtime.
  - `vue-router`: routing for pages.
  - `pinia`: state management.
  - `pinia-plugin-persistedstate`: makes certain Pinia state survive refresh.
  - `axios`: HTTP client used to fetch courses.
  - `tailwindcss` and `@tailwindcss/vite`: Tailwind integration.
- `devDependencies`
  - Vite plugins for Vue and devtools.
  - ESLint/Prettier tooling.

### `vite.config.js`
Vite config tells Vite how to build and what plugins to use.

Key parts:
- `plugins: [vue(), vueDevTools(), tailwindcss()]`
  - `vue()` enables Vue SFC support (`.vue` files).
  - `vite-plugin-vue-devtools` helps with devtools integration.
  - `tailwindcss()` enables Tailwind processing.
- `resolve.alias`
  - Defines `@` as an alias to `./src`.
  - Example: `@/stores/store` means `src/stores/store`.

### `index.html`
This is the HTML file Vite uses as the base page.

Key parts:
- `<div id="app"></div>`
  - This is the mount target for the Vue app.
- `<script type="module" src="/src/main.js"></script>`
  - Loads the JS entry file for the app.
- `<body class="bg-linear-to-r from-sky-300 to-indigo-300">`
  - Adds a background gradient-style class.
  - (The exact look comes from Tailwind configuration.)

### `jsconfig.json`
Used mostly for IDE/editor tooling.

Key part:
- `compilerOptions.paths` maps:
  - `"@/*": ["./src/*"]`
So TypeScript-aware tooling understands the `@` alias (even though this is not TypeScript code).

### Formatting / Linting
- `.prettierrc.json`
  - Settings for Prettier (quotes, printWidth, etc).
- `.oxlintrc.json`
  - Settings for oxlint (a lint tool).
- `eslint.config.js`
  - ESLint flat config combining recommended JS + Vue + oxlint rules.
- `.editorconfig`
  - Consistent editor formatting rules.
- `.gitignore` / `.gitattributes`
  - Git housekeeping (what files to ignore, and some default attributes).

#### Extra: the exact editor/git settings in this repo
- `.editorconfig` (key rules)
  - Charset: `utf-8`
  - Indentation: 2 spaces (`indent_style = space`, `indent_size = 2`)
  - Ensures: `insert_final_newline = true`, `trim_trailing_whitespace = true`
  - Line endings: `end_of_line = lf`
  - Max line length: `100`
- `.gitignore` (key groups)
  - Ignores logs like `*.log`, `npm-debug.log*`
  - Ignores `node_modules`
  - Ignores build output folders like `dist` and coverage
  - Ignores IDE folders like `.vscode`, `.idea`
  - Ignores Vite timestamp/temp files and Cypress/Vitest screenshot folders
- `.gitattributes`
  - `* text=auto eol=lf`
  - Tells Git to normalize text line endings to LF in the repo.

#### `README.md` (existing)
There is a default starter Vue/Vite README with commands like `npm install`, `npm run dev`, and `npm run build`.
This project now uses `PROJECT_DOCUMENTATION.md` for the detailed learning notes.

#### `package-lock.json`
This is the npm-generated lockfile. It captures exact dependency versions installed.
It is not meant to be edited manually in a learning project.


---

## 3) App Entry + Mount

### `src/main.js`
This file is where the Vue app is created and mounted.

What it does:
1. Imports global CSS: `import './assets/main.css'`
   - This ensures Tailwind and the custom CSS rules are loaded.
2. Creates a Vue app:
   - `const app = createApp(App)`
3. Creates a Pinia store instance:
   - `const pinia = createPinia()`
4. Registers persisted-state plugin:
   - `pinia.use(piniaPluginPersistedstate)`
5. Installs plugins:
   - `app.use(pinia)`
   - `app.use(router)`
6. Mounts:
   - `app.mount('#app')`

Important beginner note:
- Vue plugins must be registered before `mount()` so they’re available in all components.

### `src/App.vue`
This is the root component (layout wrapper).

Template behavior:
- Renders:
  - `<AppHeader />` (fixed at top)
  - `<main class="app-main"> ... <RouterView /> ... </main>`
  - `<AppFooter />` (fixed at bottom)

Key points:
- `RouterView` is where the current route page component is displayed.
- The `main` wrapper uses CSS class `app-main` to avoid content being hidden under fixed header/footer.

Script behavior:
- Uses `script setup` syntax:
  - Imports `RouterView` and the header/footer components.
  - No manual component registration needed (Vue handles it in `<script setup>`).

---

## 4) Routing (Pages)

### `src/router/index.js`
Defines the set of routes for the app.

How routing works here:
- Uses `createRouter({ history: createWebHistory(), routes: [...] })`
  - `createWebHistory()` uses normal browser URLs (no hash).

Routes:
- `{ path: '/', name: 'home', component: HomePage }`
  - Home page.
- `{ path: '/courses', name: 'courses', component: CoursesPage }`
  - Lists all courses (from the API).
- `{ path: '/cart', name: 'cart', component: CartPage }`
  - Shows cart items and actions.
- `{ path: '/my-courses', name: 'myCourses', component: MyCoursesPage }`
  - Shows purchased items and the “Un-enrol” action.
- `{ path: '/:pathMatch(.*)*', redirect: '/' }`
  - Any unknown path redirects to `/`.

Scroll behavior:
- `scrollBehavior() { return { top: 0 } }`
  - On navigation, scroll position resets to top.

---

## 5) State Management (Pinia Store)

### `src/stores/store.js`
This file is the “single source of truth” for the app’s data.

#### 5.1 API endpoint constant
- `const API_URL = "https://library-management-api-i6if.onrender.com/api";`
Used to fetch courses:
- GET `${API_URL}/books`

#### 5.2 Store definition
- `export const useBookStore = defineStore("book", { ... })`
This creates a Pinia store named `"book"`.

#### 5.3 State shape
Initial state:
- `courses: []`
  - The catalog fetched from the API.
- `loading: false`
  - Shared loading flag used by the UI to show a spinner.
- `cart: []`
  - Items the user has “bought” but not yet confirmed.
- `myCourses: []`
  - Items confirmed and considered “owned”.

#### 5.4 Persistence configuration
`persist: { paths: ["cart", "myCourses"] }`
- Only cart and myCourses are saved to browser storage.
- `courses` is not persisted; it is refetched when needed.

#### 5.5 Getters
Getters are computed helper functions that read state.

- `isInCart: (state) => (courseId) => state.cart.some((c) => c.id === courseId)`
  - Returns true if a course (by id) is currently in the cart.

- `isPurchased: (state) => (courseId) => state.myCourses.some((c) => c.id === courseId)`
  - Returns true if a course (by id) is already owned.

- `latestCourses(state)`
  - Returns `state.courses.slice(0, 3)`
  - “Latest” in this project means: the first 3 elements returned by the API.

- `highestRatedCourses(state)`
  - Returns the “remaining” courses for the Home page’s second section.
  - With the project requirement that the API returns 6 books total:
    - `latestCourses` shows the first 3 (`slice(0, 3)`)
    - `highestRatedCourses` shows the last 3 (`slice(3, 6)`)

#### 5.6 Actions
Actions are methods you call from components.

- `fetchCourses()`
  - Sets `loading = true`.
  - Calls axios GET `${API_URL}/books`.
  - Stores the result:
    - `this.courses = response.data.books ?? []`
  - Always sets `loading = false` in `finally`.
  - Beginner concept: `try/catch/finally` ensures the loading state resets even if the API fails.

- `ensureCoursesLoaded()`
  - Used to prevent repeated API calls.
  - If `loading` is already true, it returns immediately.
  - If `courses.length > 0`, it assumes courses already exist.
  - Otherwise it calls `fetchCourses()`.

- `addToCart(course)`
  - Validates:
    - extracts `courseId = course?._id`
    - if missing, return
  - Prevents duplicates:
    - if already purchased, do nothing
    - if already in cart, do nothing
  - Adds a normalized cart item:
    - `const cartItem = normalizeCourse(course)`
    - `this.cart.unshift(cartItem)`
  - `unshift` adds to the beginning of the array.

- `removeFromCart(cartItemId)`
  - Filters out a cart item using `cartItemId`.
  - Note: cart items use `cartItemId` (unique per cart entry), not the API id.

- `confirmPurchase(cartItemId)`
  - Finds the cart item with that `cartItemId`.
  - If not found, returns.
  - If the course is not already purchased:
    - Inserts a new object into `myCourses`:
      - spreads the cart item
      - adds `purchasedId: crypto.randomUUID()`
      - adds `purchasedAt: new Date().toISOString()`
  - Removes the item from the cart afterward.

- `unenrollCourse(purchasedId)`
  - Removes a course from `myCourses` by `purchasedId`.
  - Because `myCourses` is persisted, refresh keeps the result.

Backwards-compat methods:
- `fetchBooks()` calls `fetchCourses()`
- `registerBook(book)` calls `addToCart(book)`
- `removeBook(id)` calls `removeFromCart(id)`

These are here so older/previous components would still work if they were still present.

#### 5.7 Helper functions
- `normalizeCourse(course)`
  - Converts the API object into the shape used in cart.
  - Creates:
    - `cartItemId: crypto.randomUUID()`
    - `id: course._id` (course’s API id)
    - `title, author, category`

---

## 6) Layout Components (Header/Footer)

### `src/shared/AppHeader.vue`
Purpose: fixed header visible on every page.

Template:
- `header` has Tailwind classes including:
  - `fixed top-0 left-0 right-0 z-40`
    - fixed to the viewport, stays above most content
  - `backdrop-blur bg-white/70 border-b ...`
    - a translucent look

Inside header:
- Left: app title linking to `/`
  - `<RouterLink to="/">Courses Hub</RouterLink>`
- Right: nav links:
  - `/` Home
  - `/courses` Courses
  - `/cart` My Cart + cart count
  - `/my-courses` My Courses

Why it can show cart count:
- It imports `useBookStore()` and uses:
  - `{{ bookStore.cart.length }}`

Script:
- Uses `script setup` and imports:
  - `RouterLink`
  - `useBookStore`

### `src/shared/AppFooter.vue`
Purpose: fixed footer visible on every page.

Template:
- `footer` is `fixed bottom-0 left-0 right-0`
- Shows two text lines:
  - “Vue learning project”
  - “Data persists locally”

No script logic needed.

---

## 7) Shared UI Components

### `src/components/RoundedButton.vue`
Reusable button with consistent style.

Template behavior:
- A `<button>` with a dynamic class list:
  - Always has:
    - border, rounded-full, padding, hover scale, etc.
  - Uses `variant` prop to decide colors:
    - `variant === 'danger'` uses a red gradient
    - otherwise uses blue gradient
- Click handler:
  - `@click="$emit('click')"`
So the parent can listen to `@click`.

Props:
- `variant`
  - type `String`
  - default: `"default"`

Emits:
- `defineEmits(["click"])`

Beginner note:
- Even though this component emits `"click"`, it does *not* automatically use native click listeners. The parent must do `@click="..."` (which Vue maps to listening for the emitted `click` event).

### `src/components/CardSections.vue`
Reusable “card with header/body/footer slots”.

Template:
- Outer container:
  - `div` with border, rounded, background
- Header area:
  - shows only if `$slots.header` exists
  - uses:
    - `<slot name="header"></slot>`
- Default/body area:
  - always shows:
    - `<slot></slot>` (unnamed slot)
- Footer area:
  - shows only if `$slots.footer` exists
  - `<slot name="footer"></slot>`

No props. It’s purely slot-based.

Beginner note:
- `$slots` lets the component detect which named slots were provided by the parent.

### `src/components/BookCard.vue`
Represents one course in the catalog list and “Latest/Highest Rated” sections.

Template:
- Uses the `CardSections` component:
  - `header` slot gets `title`
  - default slot gets `author`
  - footer slot includes:
    - description paragraph
    - `RoundedButton` labeled “Buy Now”

Important:
- The button triggers:
  - `@click="$emit('click')"`

Props:
- `title`, `author`, `description` (all `String`)

Emits:
- `defineEmits(["click"])`

Parent usage:
- In `CoursesPage.vue` and `HomePage.vue`, the parent listens:
  - `@click="bookStore.addToCart(course)"`

This means:
- BookCard itself does not know about carts.
- It only signals “someone clicked buy” to the parent.

---

## 8) Shared “Learning” Components (Cards for Pages)

### `src/shared/LoadingSpinner.vue`
Simple loading UI.

Template:
- Uses a centered container.
- Inner element uses Tailwind animation:
  - `animate-[pulse_0.7s_ease-in-out_infinite]`
  - plus a spinning circle using `animate-spin`

No props, no script logic.

### `src/shared/ReviewCard.vue`
Static fake review card used only on the Home page.

Template:
- Wraps a `CardSections` component:
  - header shows `title`
  - default shows `"body"` inside quotes
  - footer shows author name

Props:
- `name`, `title`, `body` (all `String`, required)

No emits.

### `src/shared/CartItem.vue`
Represents one item in the cart (My Cart page).

Template:
- Uses `CardSections`
- Header slot: `item.title`
- Default: `item.author`
- Footer:
  - shows category
  - has two buttons:
    - `Confirm` → emits `confirm`
    - `Delete` (danger variant) → emits `remove`

Props:
- `item` object (required)

Emits:
- `confirm`
- `remove`

Parent usage:
- `CartPage.vue` listens:
  - `@confirm="bookStore.confirmPurchase(item.cartItemId)"`
  - `@remove="bookStore.removeFromCart(item.cartItemId)"`

### `src/shared/MyCourseCard.vue`
Represents one purchased course in My Courses page.

Template:
- Uses `CardSections`
- Header slot: `course.title`
- Default: `course.author`
- Footer:
  - category line
  - red `Un-enrol` button
    - emits `unenroll` with `course.purchasedId`

Props:
- `course` object (required)

Emits:
- `unenroll`

---

## 9) Pages (The Screens)

Each page is a Vue component under `src/pages/`.

### `src/pages/HomePage.vue`
Purpose:
- Simple introduction
- Show 2 course sections:
  - Latest Courses (top 3)
  - Highest Rated (top 3)
- Show 3 static review cards

Template structure:
1. Introduction section:
   - `section` with a translucent white background
   - `h1` and a short paragraph
2. Latest courses section:
   - header row includes:
     - title “Latest Courses”
     - link to `/courses` labeled “View all”
   - loading spinner:
     - displayed when `bookStore.loading` is true
   - grid list of `BookCard`:
     - loops `v-for="course in bookStore.latestCourses"`
     - each card uses `@click="bookStore.addToCart(course)"`
3. Highest rated section:
   - similar structure, uses `bookStore.highestRatedCourses`
4. Reviews section:
   - renders three `ReviewCard` components with hardcoded text

Script:
- `onMounted(() => { bookStore.ensureCoursesLoaded(); })`
  - This loads API data once when Home is visited.

### `src/pages/CoursesPage.vue`
Purpose:
- Show all courses from the API.

Template:
- Heading + cart count summary (from `bookStore.cart.length`)
- Spinner if `bookStore.loading`
- Otherwise:
  - grid
  - loops over `bookStore.courses`
  - each `BookCard`:
    - uses course fields:
      - `:title="course.title"`, etc.
    - on Buy Now:
      - `@click="bookStore.addToCart(course)"`

Script:
- Same pattern:
  - `onMounted(() => { bookStore.ensureCoursesLoaded(); })`

### `src/pages/CartPage.vue`
Purpose:
- Show cart items the user added but not yet confirmed.

Template:
- Header row:
  - “My Cart” title
  - Items count from `bookStore.cart.length`
- Empty-state:
  - if `cart.length === 0`, show “Your cart is empty.”
- If not empty:
  - grid layout
  - loops through `bookStore.cart`
  - each cart item uses `<CartItem />`
  - connects events:
    - `@confirm` → `bookStore.confirmPurchase(item.cartItemId)`
    - `@remove` → `bookStore.removeFromCart(item.cartItemId)`

Script:
- Just gets the store and uses it.

### `src/pages/MyCoursesPage.vue`
Purpose:
- Show courses the user has confirmed/purchased.
- Provide “Un-enrol” to remove them.

Template:
- Header row:
  - “My Courses”
  - Owned count `bookStore.myCourses.length`
- Empty-state:
  - when `myCourses.length === 0`, show “No courses purchased yet.”
- Otherwise:
  - grid list
  - loops `bookStore.myCourses`
  - renders `MyCourseCard`
  - listens to:
    - `@unenroll="bookStore.unenrollCourse(course.purchasedId)"`

Script:
- Only initializes the store.

---

## 10) Styling (Tailwind + Custom CSS)

### `src/assets/main.css`
This file is imported by `src/main.js`.

What it contains:
- Imports:
  - Google font `Comfortaa`
  - Tailwind base styles: `@import "tailwindcss";`
- Tailwind theme configuration:
  - `@theme { --font-sans: "Comfortaa", cursive; }`
  - This lets the `font-comfortaa` class work (Tailwind uses this theme variable).
- Utility classes:
  - `.main`:
    - applies `p-4 space-y-8`
    - (Note: after refactor, the app uses `.app-main` instead.)
  - `.app-main`:
    - `@apply pt-20 pb-20;`
    - This is essential because header/footer are fixed.
    - `pt-20` pushes content down so it won’t go behind the fixed header.
    - `pb-20` prevents content from being hidden behind the fixed footer.

---

## 11) Full Data Flow (End-to-End)

This is the most important “how it works” explanation.

1. App starts:
   - `main.js` mounts `App.vue`
   - `App.vue` renders `RouterView`
   - Browser URL decides which page component loads.

2. Courses are fetched:
   - When you land on `HomePage` or `CoursesPage`,
     they call `bookStore.ensureCoursesLoaded()`.
   - If the store has no courses yet:
     - `fetchCourses()` calls API:
       - GET `/api/books`
     - Response is stored in `bookStore.courses`.

3. Click **Buy Now**:
   - In `BookCard`, click emits a `"click"` event.
   - Parent handler (`@click="bookStore.addToCart(course)"`) runs.
   - `addToCart(course)`:
     - ensures it’s not already purchased
     - ensures it’s not already in cart
     - creates a normalized cart item
     - adds it to `bookStore.cart` and persists it.

4. Go to **My Cart**:
   - `CartPage.vue` displays `bookStore.cart`.

5. Click **Confirm**:
   - `CartItem.vue` emits `"confirm"`.
   - Parent calls `confirmPurchase(cartItemId)`.
   - `confirmPurchase`:
     - adds the item into `myCourses` (with `purchasedId` and `purchasedAt`)
     - removes it from `cart`
   - Because both are persisted, refresh keeps this state.

6. Click **Un-enrol**:
   - `MyCourseCard.vue` emits `"unenroll"` with `purchasedId`.
   - Parent calls `unenrollCourse(purchasedId)`.
   - This filters it out of `myCourses`.
   - Persisted state updates immediately.

---

## 12) Notes / Beginner Guidance (Important Behaviors)

### Persistence scope
- Only `cart` and `myCourses` persist.
- `courses` is re-fetched as needed.

### Duplicate handling
- You can’t add a course to cart if it’s already purchased.
- You can’t add it to cart twice (based on the API `course._id`).

### Crypto usage
- `crypto.randomUUID()` is used to create unique IDs for:
  - `cartItemId`
  - `purchasedId`

---

## 13) Quick Reference: Where Everything Lives

- Entry / bootstrap:
  - `src/main.js`
  - `src/App.vue`
- Routing:
  - `src/router/index.js`
- Store:
  - `src/stores/store.js`
- Layout:
  - `src/shared/AppHeader.vue`
  - `src/shared/AppFooter.vue`
- Pages:
  - `src/pages/HomePage.vue`
  - `src/pages/CoursesPage.vue`
  - `src/pages/CartPage.vue`
  - `src/pages/MyCoursesPage.vue`
- Shared components:
  - `src/shared/LoadingSpinner.vue`
  - `src/shared/ReviewCard.vue`
  - `src/shared/CartItem.vue`
  - `src/shared/MyCourseCard.vue`
- Core UI components:
  - `src/components/BookCard.vue`
  - `src/components/CardSections.vue`
  - `src/components/RoundedButton.vue`
- Styling:
  - `src/assets/main.css`

---

## 14) If You Want Even More “Tiny Detail”

If you want the *absolute maximum* level (even down to explaining each prop binding like `:key`, each slot name, each class decision), tell me and I’ll produce a second document that goes section-by-section through every `.vue` file template and script, line-by-line style.

