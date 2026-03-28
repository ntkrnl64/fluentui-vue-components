<script setup lang="ts">
import { computed, inject } from "vue";
import { MoreHorizontal20Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { NavContextKey } from "./context";

export interface SplitNavItemProps {
  value: string;
  href?: string;
}

const props = defineProps<SplitNavItemProps>();
defineOptions({ inheritAttrs: false });
const emit = defineEmits<{
  click: [event: MouseEvent];
  actionClick: [event: MouseEvent];
}>();
const navCtx = inject(NavContextKey)!;

const isSelected = computed(() => navCtx.selectedValue.value === props.value);

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
  width: "100%",
  boxSizing: "border-box",
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  outlineStyle: "none",
});

const useSplitStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    textDecorationLine: "none",
    outlineStyle: "none",
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ":hover": {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground2Hover,
    },
    ":focus-visible": {
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineOffset: "2px",
    },
  },
  action: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ":hover": { backgroundColor: tokens.colorSubtleBackgroundHover },
    ":focus-visible": {
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineOffset: "2px",
    },
  },
  selected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground2BrandSelected,
    fontWeight: tokens.fontWeightSemibold,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSplitStyles);

const tag = computed(() => (props.href ? "a" : "button"));

function handleClick(event: MouseEvent) {
  navCtx.selectItem(props.value);
  emit("click", event);
}
</script>

<template>
  <div :class="mergeClasses('fui-SplitNavItem', baseClassName)" v-bind="$attrs">
    <component
      :is="tag"
      :class="mergeClasses(styles.main, isSelected && styles.selected)"
      :href="href"
      :aria-current="isSelected ? 'page' : undefined"
      @click="handleClick"
    >
      <slot />
    </component>
    <button
      :class="styles.action"
      type="button"
      aria-label="More actions"
      @click="emit('actionClick', $event)"
    >
      <slot name="action">
        <MoreHorizontal20Regular />
      </slot>
    </button>
  </div>
</template>
