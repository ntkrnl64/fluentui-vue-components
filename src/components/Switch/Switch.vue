<script setup lang="ts">
import { computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useId } from "../../composables/useId";

export interface SwitchProps {
  disabled?: boolean;
  labelPosition?: "before" | "after" | "above";
  size?: "small" | "medium";
}

const props = withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  labelPosition: "after",
  size: "medium",
});

defineOptions({ inheritAttrs: false });
const checked = defineModel<boolean>("checked", { default: false });
const slots = defineSlots<{ default?(props: {}): any }>();

const inputId = useId("switch-");

// Thumb and track sizes used by the component (matching React exactly).
const spaceBetweenThumbAndTrack = 2;
const trackHeightMedium = 20;
const trackWidthMedium = 40;
const thumbSizeMedium = trackHeightMedium - spaceBetweenThumbAndTrack; // 18
const trackHeightSmall = 16;
const trackWidthSmall = 32;
const thumbSizeSmall = trackHeightSmall - spaceBetweenThumbAndTrack; // 14

const useBaseClass = makeResetStyles({
  alignItems: "flex-start",
  boxSizing: "border-box",
  display: "inline-flex",
  position: "relative",

  ":focus-within:has(:focus-visible)": {
    outlineColor: tokens.colorStrokeFocus2,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: "solid",
  },
});

const useIndicatorBaseClass = makeResetStyles({
  borderRadius: tokens.borderRadiusCircular,
  border: "1px solid",
  lineHeight: "0",
  boxSizing: "border-box",
  fill: "currentColor",
  flexShrink: 0,
  fontSize: `${thumbSizeMedium}px`,
  height: `${trackHeightMedium}px`,
  margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  pointerEvents: "none" as const,
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveEasyEase,
  transitionProperty: "background, border, color",
  width: `${trackWidthMedium}px`,

  "@media screen and (prefers-reduced-motion: reduce)": {
    transitionDuration: "0.01ms",
  },

  "@media (forced-colors: active)": {
    color: "CanvasText",
  },

  "> *": {
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: "transform",

    "@media screen and (prefers-reduced-motion: reduce)": {
      transitionDuration: "0.01ms",
    },
  },
});

const useInputBaseClass = makeResetStyles({
  boxSizing: "border-box",
  cursor: "pointer",
  height: "100%",
  margin: "0",
  opacity: 0,
  position: "absolute" as const,
  // Calculate the width of the hidden input by taking into account the size of the indicator + the padding around it.
  // This is done so that clicking on that "empty space" still toggles the switch.
  width: `calc(${trackWidthMedium}px + 2 * ${tokens.spacingHorizontalS})`,

  // Checked (both enabled and disabled)
  ":checked": {
    [`& ~ .fui-Switch__indicator`]: {
      "> *": {
        transform: `translateX(${trackWidthMedium - thumbSizeMedium - spaceBetweenThumbAndTrack}px)`,
      },
    },
  },

  // Disabled (both checked and unchecked)
  ":disabled": {
    cursor: "default",

    [`& ~ .fui-Switch__indicator`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },

    [`& ~ .fui-Switch__label`]: {
      cursor: "default",
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  // Enabled and unchecked
  ":enabled:not(:checked)": {
    [`& ~ .fui-Switch__indicator`]: {
      color: tokens.colorNeutralStrokeAccessible,
      borderColor: tokens.colorNeutralStrokeAccessible,
    },

    [`& ~ .fui-Switch__label`]: {
      color: tokens.colorNeutralForeground1,
    },

    ":hover": {
      [`& ~ .fui-Switch__indicator`]: {
        color: tokens.colorNeutralStrokeAccessibleHover,
        borderColor: tokens.colorNeutralStrokeAccessibleHover,
      },
    },

    ":hover:active": {
      [`& ~ .fui-Switch__indicator`]: {
        color: tokens.colorNeutralStrokeAccessiblePressed,
        borderColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  // Enabled and checked
  ":enabled:checked": {
    [`& ~ .fui-Switch__indicator`]: {
      backgroundColor: tokens.colorCompoundBrandBackground,
      color: tokens.colorNeutralForegroundInverted,
      borderColor: tokens.colorTransparentStroke,
    },

    ":hover": {
      [`& ~ .fui-Switch__indicator`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
        borderColor: tokens.colorTransparentStrokeInteractive,
      },
    },

    ":hover:active": {
      [`& ~ .fui-Switch__indicator`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
        borderColor: tokens.colorTransparentStrokeInteractive,
      },
    },
  },

  // Disabled and unchecked
  ":disabled:not(:checked)": {
    [`& ~ .fui-Switch__indicator`]: {
      borderColor: tokens.colorNeutralStrokeDisabled,
    },
  },

  // Disabled and checked
  ":disabled:checked": {
    [`& ~ .fui-Switch__indicator`]: {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      borderColor: tokens.colorTransparentStrokeDisabled,
    },
  },

  "@media (forced-colors: active)": {
    ":disabled": {
      [`& ~ .fui-Switch__indicator`]: {
        color: "GrayText",
        borderColor: "GrayText",
      },

      [`& ~ .fui-Switch__label`]: {
        color: "GrayText",
      },
    },
    ":hover": {
      color: "CanvasText",
    },
    ":hover:active": {
      color: "CanvasText",
    },
    ":enabled:checked": {
      ":hover": {
        [`& ~ .fui-Switch__indicator`]: {
          backgroundColor: "Highlight",
          color: "Canvas",
        },
      },
      ":hover:active": {
        [`& ~ .fui-Switch__indicator`]: {
          backgroundColor: "Highlight",
          color: "Canvas",
        },
      },
      [`& ~ .fui-Switch__indicator`]: {
        backgroundColor: "Highlight",
        color: "Canvas",
      },
    },
  },
});

const useSwitchStyles = makeStyles({
  vertical: {
    flexDirection: "column",
  },
  indicatorLabelAbove: {
    marginTop: "0",
  },
  indicatorSmall: {
    fontSize: `${thumbSizeSmall}px`,
    height: `${trackHeightSmall}px`,
    width: `${trackWidthSmall}px`,
  },
  inputBefore: {
    right: "0",
    top: "0",
  },
  inputAfter: {
    left: "0",
    top: "0",
  },
  inputAbove: {
    bottom: "0",
    height: `calc(${trackHeightMedium}px + ${tokens.spacingVerticalS})`,
    width: "100%",
  },
  inputSmall: {
    width: `calc(${trackWidthSmall}px + 2 * ${tokens.spacingHorizontalS})`,
    ":checked": {
      [`& ~ .fui-Switch__indicator`]: {
        "> *": {
          transform: `translateX(${trackWidthSmall - thumbSizeSmall - spaceBetweenThumbAndTrack}px)`,
        },
      },
    },
  },
  label: {
    cursor: "pointer",
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightRegular as unknown as string,
    // Use a (negative) margin to account for the difference between the track's height and the label's line height.
    // This prevents the label from expanding the height of the switch, but preserves line height if the label wraps.
    marginBottom: `calc((${trackHeightMedium}px - ${tokens.lineHeightBase300}) / 2)`,
    marginTop: `calc((${trackHeightMedium}px - ${tokens.lineHeightBase300}) / 2)`,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },
  labelSmall: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    marginBottom: `calc((${trackHeightSmall}px - ${tokens.lineHeightBase200}) / 2)`,
    marginTop: `calc((${trackHeightSmall}px - ${tokens.lineHeightBase200}) / 2)`,
  },
  labelAbove: {
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    width: "100%",
  },
  labelAfter: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
  labelBefore: {
    paddingRight: tokens.spacingHorizontalXS,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const indicatorBaseClassName = useResetStyles(useIndicatorBaseClass);
const inputBaseClassName = useResetStyles(useInputBaseClass);
const styles = useStyles(useSwitchStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Switch",
    baseClassName.value,
    props.labelPosition === "above" && styles.value.vertical,
  ),
);

const indicatorClass = computed(() =>
  mergeClasses(
    "fui-Switch__indicator",
    indicatorBaseClassName.value,
    slots.default &&
      props.labelPosition === "above" &&
      styles.value.indicatorLabelAbove,
    props.size === "small" && styles.value.indicatorSmall,
  ),
);

const inputClass = computed(() => {
  const s = styles.value;
  const pos = props.labelPosition;

  return mergeClasses(
    "fui-Switch__input",
    inputBaseClassName.value,
    slots.default && pos === "before" && s.inputBefore,
    slots.default && pos === "after" && s.inputAfter,
    slots.default && pos === "above" && s.inputAbove,
    props.size === "small" && s.inputSmall,
  );
});

const labelClass = computed(() => {
  const s = styles.value;
  const pos = props.labelPosition;

  return mergeClasses(
    "fui-Switch__label",
    s.label,
    pos === "above" && s.labelAbove,
    pos === "after" && s.labelAfter,
    pos === "before" && s.labelBefore,
    props.size === "small" && s.labelSmall,
  );
});

function onChange(e: Event) {
  if (props.disabled) return;
  checked.value = !checked.value;
}
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <input
      :id="inputId"
      :class="inputClass"
      type="checkbox"
      role="switch"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    />
    <label
      v-if="$slots.default && labelPosition !== 'after'"
      :for="inputId"
      :class="labelClass"
      ><slot
    /></label>
    <div :class="indicatorClass" aria-hidden="true">
      <svg
        fill="currentColor"
        aria-hidden="true"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
        />
      </svg>
    </div>
    <label
      v-if="$slots.default && labelPosition === 'after'"
      :for="inputId"
      :class="labelClass"
      ><slot
    /></label>
  </div>
</template>
