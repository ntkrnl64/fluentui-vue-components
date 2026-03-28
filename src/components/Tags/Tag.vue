<script setup lang="ts">
import { computed, inject } from "vue";
import { Dismiss16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TagGroupContextKey } from "./context";
import type { TagSize } from "./context";

export type TagAppearance = "filled" | "outline" | "brand";
export type TagShape = "rounded" | "circular";

export interface TagProps {
  appearance?: TagAppearance;
  shape?: TagShape;
  size?: TagSize;
  disabled?: boolean;
  value?: string;
  dismissible?: boolean;
}

const props = withDefaults(defineProps<TagProps>(), {
  appearance: "filled",
  shape: "rounded",
  size: "medium",
  disabled: false,
  dismissible: false,
});

const emit = defineEmits<{
  dismiss: [value: string];
}>();

defineOptions({ inheritAttrs: false });

const groupCtx = inject(TagGroupContextKey, null);

const resolvedSize = computed(() => groupCtx?.size ?? props.size);
const resolvedDismissible = computed(
  () => groupCtx?.dismissible ?? props.dismissible,
);

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  boxSizing: "border-box",
  fontFamily: tokens.fontFamilyBase,
  fontWeight: tokens.fontWeightRegular,
  cursor: "default",
  whiteSpace: "nowrap",
});

const useTagStyles = makeStyles({
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  rounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  "extra-small": {
    height: "20px",
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    ...shorthands.padding("0", tokens.spacingHorizontalXS),
    gap: tokens.spacingHorizontalXXS,
  },
  small: {
    height: "24px",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.padding("0", tokens.spacingHorizontalS),
    gap: tokens.spacingHorizontalXXS,
  },
  medium: {
    height: "32px",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    ...shorthands.padding("0", tokens.spacingHorizontalM),
    gap: tokens.spacingHorizontalXS,
  },
  disabled: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeDisabled}`,
    cursor: "not-allowed",
  },
  dismissButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
    padding: "0",
    fontSize: "12px",
    lineHeight: "1",
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineColor: tokens.colorStrokeFocus2,
    },
  },
  dismissButtonDisabled: {
    cursor: "not-allowed",
    color: tokens.colorNeutralForegroundDisabled,
    ":hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "16px",
  },
  media: {
    display: "inline-flex",
    alignItems: "center",
  },
  primaryText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  secondaryText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTagStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Tag",
    baseClassName.value,
    styles.value[props.appearance],
    styles.value[props.shape],
    styles.value[resolvedSize.value],
    props.disabled && styles.value.disabled,
  ),
);

const dismissClass = computed(() =>
  mergeClasses(
    styles.value.dismissButton,
    props.disabled && styles.value.dismissButtonDisabled,
  ),
);

function handleDismiss() {
  if (props.disabled) return;
  const value = props.value ?? "";
  if (groupCtx) {
    groupCtx.handleDismiss(value);
  }
  emit("dismiss", value);
}
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <span v-if="$slots.media" :class="styles.media">
      <slot name="media" />
    </span>
    <span v-if="$slots.icon" :class="styles.icon">
      <slot name="icon" />
    </span>
    <span :class="styles.primaryText">
      <slot name="primaryText">
        <slot />
      </slot>
    </span>
    <span v-if="$slots.secondaryText" :class="styles.secondaryText">
      <slot name="secondaryText" />
    </span>
    <button
      v-if="resolvedDismissible"
      :class="dismissClass"
      :disabled="disabled"
      aria-label="dismiss"
      @click="handleDismiss"
    >
      <Dismiss16Regular />
    </button>
  </span>
</template>
