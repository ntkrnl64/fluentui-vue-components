<script setup lang="ts">
import { provide, computed, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TabListContextKey } from "./context";

export interface TabListProps {
  size?: "small" | "medium" | "large";
  appearance?: "subtle" | "transparent";
  vertical?: boolean;
}

const props = withDefaults(defineProps<TabListProps>(), {
  size: "medium",
  appearance: "transparent",
  vertical: false,
});

defineOptions({ inheritAttrs: false });

const selectedValue = defineModel<string>("selectedValue", { default: "" });

function selectTab(value: string) {
  selectedValue.value = value;
}

const tabListRef = ref<HTMLElement | null>(null);

function handleKeydown(event: KeyboardEvent) {
  const el = tabListRef.value;
  if (!el) return;

  const tabs = Array.from(
    el.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'),
  );
  const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);

  if (currentIndex < 0) return;

  const isVertical = props.vertical;
  const prevKey = isVertical ? "ArrowUp" : "ArrowLeft";
  const nextKey = isVertical ? "ArrowDown" : "ArrowRight";

  let nextIndex = -1;

  if (event.key === nextKey) {
    nextIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
  } else if (event.key === prevKey) {
    nextIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = tabs.length - 1;
  }

  if (nextIndex >= 0) {
    event.preventDefault();
    tabs[nextIndex].focus();
  }
}

const useBaseClass = makeResetStyles({
  display: "flex",
  position: "relative",
  flexShrink: 0,
});

const useTabListStyles = makeStyles({
  horizontal: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  vertical: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  small: {
    columnGap: tokens.spacingHorizontalSNudge,
    rowGap: tokens.spacingVerticalXXS,
  },
  medium: {
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
  },
  large: {
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTabListStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-TabList",
    baseClassName.value,
    props.vertical ? styles.value.vertical : styles.value.horizontal,
    styles.value[props.size],
  ),
);

provide(TabListContextKey, {
  selectedValue,
  size: props.size,
  appearance: props.appearance,
  selectTab,
});
</script>

<template>
  <div
    ref="tabListRef"
    :class="rootClass"
    role="tablist"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    v-bind="$attrs"
    @keydown="handleKeydown"
  >
    <slot />
  </div>
</template>
