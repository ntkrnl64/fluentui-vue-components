<script setup lang="ts">
import { useRouter } from "vue-router";
import { Subtitle1, Body1, LargeTitle, Subtitle2 } from "../../index";

const router = useRouter();

const categories = [
  {
    title: "Basic Input",
    description: "Buttons, checkboxes, inputs, sliders, and more",
    icon: "\u{1F518}",
    path: "/button",
  },
  {
    title: "Collections",
    description: "Tables and data grids for displaying data",
    icon: "\u{1F4CA}",
    path: "/table",
  },
  {
    title: "Dialog & Flyouts",
    description: "Dialogs, menus, popovers, tooltips, and drawers",
    icon: "\u{1F4AC}",
    path: "/dialog",
  },
  {
    title: "Layout",
    description: "Cards, dividers, and form fields",
    icon: "\u{1F4BB}",
    path: "/card",
  },
  {
    title: "Navigation",
    description: "Accordions, tabs, and navigation components",
    icon: "\u2630",
    path: "/accordion",
  },
  {
    title: "Status & Info",
    description: "Avatars, badges, progress, spinners, and skeletons",
    icon: "\u2139",
    path: "/avatar",
  },
  {
    title: "Text",
    description: "Typography, labels, and links",
    icon: "Aa",
    path: "/text",
  },
];

function navigateTo(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <LargeTitle class="hero__title">Fluent UI Vue Gallery</LargeTitle>
      <Subtitle1 class="hero__subtitle"
        >A collection of Fluent UI components built with Vue 3</Subtitle1
      >
    </div>

    <div class="categories-grid">
      <div
        v-for="cat in categories"
        :key="cat.title"
        class="category-card"
        tabindex="0"
        role="button"
        @click="navigateTo(cat.path)"
        @keydown.enter="navigateTo(cat.path)"
      >
        <span class="category-card__icon">{{ cat.icon }}</span>
        <Subtitle2 class="category-card__title">{{ cat.title }}</Subtitle2>
        <Body1 class="category-card__description">{{ cat.description }}</Body1>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px;
}
.hero {
  text-align: center;
  margin-bottom: 48px;
}
.hero__title {
  display: block;
  color: var(--colorBrandForeground1);
  margin-bottom: 8px;
}
.hero__subtitle {
  display: block;
  color: var(--colorNeutralForeground2);
}
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
.category-card {
  background: var(--colorNeutralBackground1);
  border: 1px solid var(--colorNeutralStroke2);
  border-radius: var(--borderRadiusXLarge);
  padding: 24px;
  cursor: pointer;
  transition:
    box-shadow 0.15s,
    border-color 0.15s;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.category-card:hover {
  border-color: var(--colorBrandStroke1);
  box-shadow: var(--shadow4);
}
.category-card:focus-visible {
  outline: 2px solid var(--colorBrandStroke1);
  outline-offset: 2px;
}
.category-card__icon {
  font-size: 32px;
  margin-bottom: 4px;
}
.category-card__title {
  color: var(--colorNeutralForeground1);
}
.category-card__description {
  color: var(--colorNeutralForeground2);
}
</style>
