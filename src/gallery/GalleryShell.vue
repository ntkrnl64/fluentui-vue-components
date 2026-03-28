<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { navCategories } from "./router";
import {
  Home20Regular,
  WeatherSunny20Regular,
  WeatherMoon20Regular,
} from "@ntkrnl64/fluentui-vue-icons";

const route = useRoute();
const router = useRouter();

const searchQuery = ref("");
const navOpen = ref(true);
const expandedCategories = ref<Set<string>>(
  new Set(navCategories.map((c) => c.name)),
);

const isDark = ref(false);

function toggleTheme() {
  isDark.value = !isDark.value;
}

function toggleCategory(name: string) {
  if (expandedCategories.value.has(name)) {
    expandedCategories.value.delete(name);
  } else {
    expandedCategories.value.add(name);
  }
}

const filteredCategories = computed(() => {
  if (!searchQuery.value) return navCategories;
  const q = searchQuery.value.toLowerCase();
  return navCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.name.toLowerCase().includes(q)),
    }))
    .filter((cat) => cat.items.length > 0);
});

const pageTitle = computed(() => {
  return (route.meta?.title as string) ?? "Home";
});

// Emit theme to parent
const emit = defineEmits<{ "update:dark": [boolean] }>();
watch(isDark, (val) => emit("update:dark", val));
</script>

<template>
  <div class="gallery-shell" :class="{ 'nav-collapsed': !navOpen }">
    <!-- Title Bar -->
    <header class="gallery-titlebar">
      <button
        class="gallery-titlebar__hamburger"
        @click="navOpen = !navOpen"
        aria-label="Toggle navigation"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="1" y="3" width="14" height="1.5" rx="0.75" />
          <rect x="1" y="7.25" width="14" height="1.5" rx="0.75" />
          <rect x="1" y="11.5" width="14" height="1.5" rx="0.75" />
        </svg>
      </button>
      <div class="gallery-titlebar__icon">
        <img src="/favicon.svg" alt="icon" />
      </div>
      <span class="gallery-titlebar__title">Fluent UI Vue Gallery</span>
      <div class="gallery-titlebar__search">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search controls..."
          class="gallery-titlebar__search-input"
        />
      </div>
      <div class="gallery-titlebar__actions">
        <button
          class="gallery-titlebar__theme-btn"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <WeatherSunny20Regular v-if="isDark" />
          <WeatherMoon20Regular v-else />
        </button>
      </div>
    </header>

    <div class="gallery-body">
      <!-- Navigation Sidebar -->
      <nav class="gallery-nav" v-show="navOpen">
        <div class="gallery-nav__scroll">
          <!-- Home -->
          <router-link
            to="/"
            class="gallery-nav__item"
            :class="{ active: route.path === '/' }"
          >
            <span class="gallery-nav__item-icon"><Home20Regular /></span>
            <span class="gallery-nav__item-text">Home</span>
          </router-link>

          <!-- Categories -->
          <div
            v-for="cat in filteredCategories"
            :key="cat.name"
            class="gallery-nav__category"
          >
            <button
              class="gallery-nav__category-header"
              @click="toggleCategory(cat.name)"
            >
              <span class="gallery-nav__category-icon"
                ><component :is="cat.icon"
              /></span>
              <span class="gallery-nav__category-text">{{ cat.name }}</span>
              <span
                class="gallery-nav__category-chevron"
                :class="{ expanded: expandedCategories.has(cat.name) }"
                >&#9656;</span
              >
            </button>
            <div
              v-show="expandedCategories.has(cat.name)"
              class="gallery-nav__category-items"
            >
              <router-link
                v-for="item in cat.items"
                :key="item.path"
                :to="item.path"
                class="gallery-nav__item gallery-nav__item--sub"
                :class="{ active: route.path === item.path }"
              >
                <span class="gallery-nav__item-text">{{ item.name }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </nav>

      <!-- Content Area -->
      <main class="gallery-content">
        <div class="gallery-content__header" v-if="route.path !== '/'">
          <h1 class="gallery-content__title">{{ pageTitle }}</h1>
        </div>
        <div class="gallery-content__body">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.gallery-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* Title Bar */
.gallery-titlebar {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  gap: 12px;
  background: var(--colorNeutralBackground1);
  border-bottom: 1px solid var(--colorNeutralStroke2);
  flex-shrink: 0;
  z-index: 100;
  -webkit-app-region: drag;
}
.gallery-titlebar__hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: var(--borderRadiusMedium);
  cursor: pointer;
  color: var(--colorNeutralForeground1);
  -webkit-app-region: no-drag;
}
.gallery-titlebar__hamburger:hover {
  background: var(--colorNeutralBackground1Hover);
}
.gallery-titlebar__icon {
  display: flex;
  color: var(--colorBrandForeground1);
  width: 20px;
  height: 20px;
}
.gallery-titlebar__title {
  font-size: 12px;
  font-weight: var(--fontWeightSemibold);
  color: var(--colorNeutralForeground1);
  white-space: nowrap;
}
.gallery-titlebar__search {
  flex: 1;
  max-width: 400px;
  margin: 0 auto;
  -webkit-app-region: no-drag;
}
.gallery-titlebar__search-input {
  width: 100%;
  height: 28px;
  padding: 0 12px;
  border: 1px solid var(--colorNeutralStroke1);
  border-radius: var(--borderRadiusMedium);
  background: var(--colorNeutralBackground3);
  color: var(--colorNeutralForeground1);
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase200);
  outline: none;
  box-sizing: border-box;
}
.gallery-titlebar__search-input:focus {
  border-color: var(--colorCompoundBrandStroke);
}
.gallery-titlebar__search-input::placeholder {
  color: var(--colorNeutralForeground4);
}
.gallery-titlebar__actions {
  -webkit-app-region: no-drag;
}
.gallery-titlebar__theme-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: var(--borderRadiusMedium);
  cursor: pointer;
  font-size: 16px;
  color: var(--colorNeutralForeground1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.gallery-titlebar__theme-btn:hover {
  background: var(--colorNeutralBackground1Hover);
}

/* Body Layout */
.gallery-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Navigation */
.gallery-nav {
  width: 280px;
  flex-shrink: 0;
  background: var(--colorNeutralBackground2);
  border-right: 1px solid var(--colorNeutralStroke2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: width 0.2s var(--curveEasyEase);
}
.nav-collapsed .gallery-nav {
  width: 0;
  border-right: none;
}
.gallery-nav__scroll {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.gallery-nav__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: var(--borderRadiusMedium);
  text-decoration: none;
  color: var(--colorNeutralForeground2);
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  cursor: pointer;
  transition: background-color 0.1s;
}
.gallery-nav__item:hover {
  background: var(--colorNeutralBackground1Hover);
  color: var(--colorNeutralForeground1);
}
.gallery-nav__item.active {
  background: var(--colorNeutralBackground1Selected);
  color: var(--colorNeutralForeground1);
  font-weight: var(--fontWeightSemibold);
}
.gallery-nav__item.active::before {
  content: "";
  width: 3px;
  height: 16px;
  background: var(--colorBrandForeground1);
  border-radius: var(--borderRadiusCircular);
  margin-left: -8px;
  margin-right: 5px;
  flex-shrink: 0;
}
.gallery-nav__item--sub {
  padding-left: 44px;
  font-size: var(--fontSizeBase200);
}
.gallery-nav__item-icon {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  font-size: 14px;
}
.gallery-nav__category {
  margin-top: 2px;
}
.gallery-nav__category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: var(--borderRadiusMedium);
  cursor: pointer;
  color: var(--colorNeutralForeground2);
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  text-align: left;
}
.gallery-nav__category-header:hover {
  background: var(--colorNeutralBackground1Hover);
  color: var(--colorNeutralForeground1);
}
.gallery-nav__category-icon {
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  font-size: 14px;
}
.gallery-nav__category-text {
  flex: 1;
}
.gallery-nav__category-chevron {
  font-size: 10px;
  transition: transform 0.15s var(--curveEasyEase);
}
.gallery-nav__category-chevron.expanded {
  transform: rotate(90deg);
}

/* Content */
.gallery-content {
  flex: 1;
  overflow-y: auto;
  background: var(--colorNeutralBackground3);
}
.gallery-content__header {
  padding: 24px 36px 0;
}
.gallery-content__title {
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeHero700);
  font-weight: var(--fontWeightSemibold);
  line-height: var(--lineHeightHero700);
  color: var(--colorNeutralForeground1);
  margin: 0 0 16px;
}
.gallery-content__body {
  padding: 16px 36px 36px;
}

@media (max-width: 768px) {
  .gallery-nav {
    position: fixed;
    top: 48px;
    left: 0;
    bottom: 0;
    z-index: 50;
    box-shadow: var(--shadow16);
  }
  .gallery-content__header {
    padding: 16px 16px 0;
  }
  .gallery-content__body {
    padding: 8px 16px 16px;
  }
}
</style>
