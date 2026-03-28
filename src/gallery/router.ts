import { createRouter, createWebHistory } from "vue-router";
import type { Component } from "vue";
import {
  Home20Regular,
  FormNew20Regular,
  Table20Regular,
  Chat20Regular,
  LayoutCellFour20Regular,
  Navigation20Regular,
  Info20Regular,
  TextT20Regular,
} from "@ntkrnl64/fluentui-vue-icons";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./pages/HomePage.vue"),
    meta: { title: "Home" },
  },

  // Basic Input
  {
    path: "/button",
    name: "Button",
    component: () => import("./pages/ButtonPage.vue"),
    meta: { title: "Button", category: "Basic Input" },
  },
  {
    path: "/checkbox",
    name: "Checkbox",
    component: () => import("./pages/CheckboxPage.vue"),
    meta: { title: "Checkbox", category: "Basic Input" },
  },
  {
    path: "/input",
    name: "Input",
    component: () => import("./pages/InputPage.vue"),
    meta: { title: "Input", category: "Basic Input" },
  },
  {
    path: "/radio",
    name: "Radio",
    component: () => import("./pages/RadioPage.vue"),
    meta: { title: "RadioGroup", category: "Basic Input" },
  },
  {
    path: "/rating",
    name: "Rating",
    component: () => import("./pages/RatingPage.vue"),
    meta: { title: "Rating", category: "Basic Input" },
  },
  {
    path: "/select",
    name: "Select",
    component: () => import("./pages/SelectPage.vue"),
    meta: { title: "Select & Combobox", category: "Basic Input" },
  },
  {
    path: "/slider",
    name: "Slider",
    component: () => import("./pages/SliderPage.vue"),
    meta: { title: "Slider", category: "Basic Input" },
  },
  {
    path: "/switch",
    name: "Switch",
    component: () => import("./pages/SwitchPage.vue"),
    meta: { title: "Switch", category: "Basic Input" },
  },
  {
    path: "/spinbutton",
    name: "SpinButton",
    component: () => import("./pages/SliderPage.vue"),
    meta: { title: "SpinButton", category: "Basic Input" },
  },

  // Collections & Data
  {
    path: "/table",
    name: "Table",
    component: () => import("./pages/TablePage.vue"),
    meta: { title: "Table & DataGrid", category: "Collections" },
  },

  // Dialog & Flyouts
  {
    path: "/dialog",
    name: "Dialog",
    component: () => import("./pages/DialogPage.vue"),
    meta: { title: "Dialog", category: "Dialog & Flyouts" },
  },
  {
    path: "/tooltip",
    name: "Tooltip",
    component: () => import("./pages/TooltipPage.vue"),
    meta: { title: "Tooltip", category: "Dialog & Flyouts" },
  },
  {
    path: "/popover",
    name: "Popover",
    component: () => import("./pages/PopoverPage.vue"),
    meta: { title: "Popover", category: "Dialog & Flyouts" },
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import("./pages/MenuPage.vue"),
    meta: { title: "Menu", category: "Dialog & Flyouts" },
  },
  {
    path: "/drawer",
    name: "Drawer",
    component: () => import("./pages/DrawerPage.vue"),
    meta: { title: "Drawer", category: "Dialog & Flyouts" },
  },
  {
    path: "/toast",
    name: "Toast",
    component: () => import("./pages/ToastPage.vue"),
    meta: { title: "Toast", category: "Dialog & Flyouts" },
  },

  // Layout
  {
    path: "/card",
    name: "Card",
    component: () => import("./pages/CardPage.vue"),
    meta: { title: "Card", category: "Layout" },
  },
  {
    path: "/divider",
    name: "Divider",
    component: () => import("./pages/DividerPage.vue"),
    meta: { title: "Divider", category: "Layout" },
  },
  {
    path: "/field",
    name: "Field",
    component: () => import("./pages/FieldPage.vue"),
    meta: { title: "Field", category: "Layout" },
  },

  // Navigation
  {
    path: "/accordion",
    name: "Accordion",
    component: () => import("./pages/AccordionPage.vue"),
    meta: { title: "Accordion", category: "Navigation" },
  },
  {
    path: "/tabs",
    name: "Tabs",
    component: () => import("./pages/TabsPage.vue"),
    meta: { title: "TabList", category: "Navigation" },
  },

  // Status & Info
  {
    path: "/avatar",
    name: "Avatar",
    component: () => import("./pages/AvatarPage.vue"),
    meta: { title: "Avatar", category: "Status & Info" },
  },
  {
    path: "/badge",
    name: "Badge",
    component: () => import("./pages/BadgePage.vue"),
    meta: { title: "Badge", category: "Status & Info" },
  },
  {
    path: "/messagebar",
    name: "MessageBar",
    component: () => import("./pages/MessageBarPage.vue"),
    meta: { title: "MessageBar", category: "Status & Info" },
  },
  {
    path: "/progress",
    name: "Progress",
    component: () => import("./pages/ProgressPage.vue"),
    meta: { title: "ProgressBar", category: "Status & Info" },
  },
  {
    path: "/skeleton",
    name: "Skeleton",
    component: () => import("./pages/SkeletonPage.vue"),
    meta: { title: "Skeleton", category: "Status & Info" },
  },
  {
    path: "/spinner",
    name: "Spinner",
    component: () => import("./pages/SpinnerPage.vue"),
    meta: { title: "Spinner", category: "Status & Info" },
  },

  // Text
  {
    path: "/text",
    name: "Text",
    component: () => import("./pages/TextPage.vue"),
    meta: { title: "Text", category: "Text" },
  },
  {
    path: "/label",
    name: "Label",
    component: () => import("./pages/LabelPage.vue"),
    meta: { title: "Label", category: "Text" },
  },
  {
    path: "/link",
    name: "Link",
    component: () => import("./pages/LinkPage.vue"),
    meta: { title: "Link", category: "Text" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export interface NavCategory {
  name: string;
  icon: Component;
  items: { name: string; path: string }[];
}

export const navCategories: NavCategory[] = [
  {
    name: "Basic Input",
    icon: FormNew20Regular,
    items: [
      { name: "Button", path: "/button" },
      { name: "Checkbox", path: "/checkbox" },
      { name: "Input", path: "/input" },
      { name: "RadioGroup", path: "/radio" },
      { name: "Rating", path: "/rating" },
      { name: "Select & Combobox", path: "/select" },
      { name: "Slider", path: "/slider" },
      { name: "Switch", path: "/switch" },
    ],
  },
  {
    name: "Collections",
    icon: Table20Regular,
    items: [{ name: "Table & DataGrid", path: "/table" }],
  },
  {
    name: "Dialog & Flyouts",
    icon: Chat20Regular,
    items: [
      { name: "Dialog", path: "/dialog" },
      { name: "Drawer", path: "/drawer" },
      { name: "Menu", path: "/menu" },
      { name: "Popover", path: "/popover" },
      { name: "Toast", path: "/toast" },
      { name: "Tooltip", path: "/tooltip" },
    ],
  },
  {
    name: "Layout",
    icon: LayoutCellFour20Regular,
    items: [
      { name: "Card", path: "/card" },
      { name: "Divider", path: "/divider" },
      { name: "Field", path: "/field" },
    ],
  },
  {
    name: "Navigation",
    icon: Navigation20Regular,
    items: [
      { name: "Accordion", path: "/accordion" },
      { name: "TabList", path: "/tabs" },
    ],
  },
  {
    name: "Status & Info",
    icon: Info20Regular,
    items: [
      { name: "Avatar", path: "/avatar" },
      { name: "Badge", path: "/badge" },
      { name: "MessageBar", path: "/messagebar" },
      { name: "ProgressBar", path: "/progress" },
      { name: "Skeleton", path: "/skeleton" },
      { name: "Spinner", path: "/spinner" },
    ],
  },
  {
    name: "Text",
    icon: TextT20Regular,
    items: [
      { name: "Text", path: "/text" },
      { name: "Label", path: "/label" },
      { name: "Link", path: "/link" },
    ],
  },
];
