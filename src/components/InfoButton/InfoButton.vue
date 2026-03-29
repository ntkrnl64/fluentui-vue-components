<script setup lang="ts">
import { computed, ref } from "vue";
import { Info16Regular } from "@ntkrnl64/fluentui-vue-icons";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export type InfoButtonSize = "small" | "medium" | "large";

export interface InfoButtonProps {
  size?: InfoButtonSize;
}

const props = withDefaults(defineProps<InfoButtonProps>(), {
  size: "medium",
});

defineOptions({ inheritAttrs: false });

const isOpen = ref(false);

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  position: "relative",
});

const useInfoButtonStyles = makeStyles({
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    outlineStyle: "none",
    padding: "0",
    ":hover": {
      color: tokens.colorNeutralForeground2BrandHover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ":hover:active": {
      color: tokens.colorNeutralForeground2BrandPressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
    ":focus-visible": {
      outlineColor: tokens.colorStrokeFocus2,
      outlineWidth: tokens.strokeWidthThick,
      outlineStyle: "solid",
      outlineOffset: "2px",
    },
  },
  small: {
    width: "16px",
    height: "16px",
    fontSize: "12px",
  },
  medium: {
    width: "20px",
    height: "20px",
    fontSize: "14px",
  },
  large: {
    width: "24px",
    height: "24px",
    fontSize: "16px",
  },
  popover: {
    position: "absolute",
    top: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: tokens.spacingVerticalXS,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow16,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    maxWidth: "300px",
    minWidth: "200px",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useInfoButtonStyles);

const rootClass = computed(() =>
  mergeClasses("fui-InfoButton", baseClassName.value),
);

const buttonClass = computed(() =>
  mergeClasses(styles.value.button, styles.value[props.size]),
);

function togglePopover() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <span :class="rootClass" v-bind="$attrs">
    <button
      ref="buttonRef"
      :class="buttonClass"
      type="button"
      :aria-expanded="isOpen"
      @click="togglePopover"
    >
      <slot name="icon"><Info16Regular /></slot>
    </button>
    <div v-if="isOpen" :class="styles.popover" role="note">
      <slot />
    </div>
  </span>
</template>
