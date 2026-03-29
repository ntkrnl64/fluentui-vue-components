<script setup lang="ts">
import {
  provide,
  computed,
  ref,
  toRef,
  onMounted,
  onUnmounted,
  watchEffect,
  inject,
} from "vue";
import type { Theme } from "@fluentui/react-theme";
import { webLightTheme } from "@fluentui/react-theme";
import { GriffelRendererKey, TextDirectionKey } from "@ntkrnl64/griffel-vue";
import { createDOMRenderer } from "@griffel/core";
import type { GriffelRenderer } from "@griffel/core";
import { createTabster } from "tabster";
import { createCSSRuleFromTheme } from "./createCSSRuleFromTheme";
import {
  ThemeKey,
  ProviderContextKey,
  TabsterKey,
  TooltipVisibilityKey,
  PortalMountNodeKey,
} from "../contexts";
import { useId } from "../composables/useId";

const props = withDefaults(
  defineProps<{
    theme?: Theme;
    dir?: "ltr" | "rtl";
    targetDocument?: Document;
    customStylesPortalNode?: HTMLElement;
    /** Apply theme to the entire page (body background + color) */
    applyToBody?: boolean;
  }>(),
  {
    dir: "ltr",
    applyToBody: true,
  },
);

defineOptions({
  inheritAttrs: false,
});

// Theme
const parentTheme = inject(ThemeKey, undefined);
const isRoot = !parentTheme;
const mergedTheme = computed(
  () => props.theme ?? parentTheme?.value ?? webLightTheme,
);

// Generate unique class for theme scoping
const themeId = useId("fui-FluentProvider");
const themeClassName = ref(themeId);

// CSS rule for theme custom properties on the scoped class
const cssRule = computed(() =>
  createCSSRuleFromTheme(`.${themeClassName.value}`, mergedTheme.value),
);

// Body-level rule for full-page theming + Teleported content
const bodyRule = computed(() => {
  const t = mergedTheme.value as unknown as Record<string, string>;
  return `body { background-color: var(--colorNeutralBackground1, ${t.colorNeutralBackground1}); color: var(--colorNeutralForeground1, ${t.colorNeutralForeground1}); font-family: var(--fontFamilyBase, ${t.fontFamilyBase}); margin: 0; }`;
});

// A rule that puts theme vars on body too, so Teleported elements inherit them
const bodyThemeRule = computed(() =>
  createCSSRuleFromTheme("body", mergedTheme.value),
);

// Style tag management
let styleElement: HTMLStyleElement | null = null;

onMounted(() => {
  const doc = props.targetDocument ?? document;
  styleElement = doc.createElement("style");
  styleElement.setAttribute("data-fui-theme", themeClassName.value);
  doc.head.appendChild(styleElement);

  watchEffect(() => {
    if (styleElement?.sheet) {
      // Clear existing rules
      while (styleElement.sheet.cssRules.length > 0) {
        styleElement.sheet.deleteRule(0);
      }
      // Scoped class rule
      styleElement.sheet.insertRule(cssRule.value, 0);

      // If root provider, also apply theme to body for Teleported content
      if (isRoot && props.applyToBody) {
        styleElement.sheet.insertRule(
          bodyThemeRule.value,
          styleElement.sheet.cssRules.length,
        );
        styleElement.sheet.insertRule(
          bodyRule.value,
          styleElement.sheet.cssRules.length,
        );
      }
    }
  });
});

onUnmounted(() => {
  styleElement?.remove();
  styleElement = null;
});

// Tabster (focus management)
const parentTabster = inject(TabsterKey, undefined);
let tabsterInstance = parentTabster;
if (!tabsterInstance && typeof window !== "undefined") {
  tabsterInstance = createTabster(window);
}

// Griffel renderer
const parentRenderer = inject(GriffelRendererKey, undefined);
const renderer: GriffelRenderer = parentRenderer ?? createDOMRenderer();

// Provide all contexts
provide(ThemeKey, mergedTheme);
provide(ProviderContextKey, {
  dir: toRef(props, "dir"),
  targetDocument:
    props.targetDocument ??
    (typeof document !== "undefined" ? document : undefined),
});
provide(GriffelRendererKey, renderer);
provide(TextDirectionKey, toRef(props, "dir"));
provide(TooltipVisibilityKey, ref(false));
provide(
  PortalMountNodeKey,
  ref<string | HTMLElement>(props.customStylesPortalNode ?? "body"),
);

if (tabsterInstance) {
  provide(TabsterKey, tabsterInstance);
}

const rootRef = ref<HTMLElement | null>(null);
defineExpose({ el: rootRef });
</script>

<template>
  <div ref="rootRef" :class="themeClassName" :dir="dir" v-bind="$attrs">
    <slot />
  </div>
</template>
