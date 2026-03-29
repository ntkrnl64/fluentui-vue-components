<script setup lang="ts">
import { computed, useSlots } from "vue";
import {
  useStyles,
  mergeClasses,
  makeStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { useId } from "../../composables/useId";

export type DividerAppearance = "default" | "subtle" | "brand" | "strong";
export type DividerAlign = "start" | "center" | "end";

export interface DividerProps {
  vertical?: boolean;
  inset?: boolean;
  appearance?: DividerAppearance;
  alignContent?: DividerAlign;
}

const props = withDefaults(defineProps<DividerProps>(), {
  vertical: false,
  inset: false,
  appearance: "default",
  alignContent: "center",
});

defineOptions({ inheritAttrs: false });

const slots = useSlots();
const dividerId = useId("divider-");
const hasContent = computed(() => !!slots.default);

const contentSpacing = "12px";
const insetSpacing = "12px";
const maxStartEndLength = "8px";
const minStartEndLength = "8px";

const useBaseStyles = makeStyles({
  base: {
    alignItems: "center",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    position: "relative",

    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular as unknown as string,
    lineHeight: tokens.lineHeightBase200,
    textAlign: "center",

    "::before": {
      boxSizing: "border-box",
      display: "flex",
      flexGrow: 1,
    },
    "::after": {
      boxSizing: "border-box",
      display: "flex",
      flexGrow: 1,
    },
  },

  childless: {
    "::before": {
      marginBottom: 0,
      marginRight: 0,
    },
    "::after": {
      marginLeft: 0,
      marginTop: 0,
    },
  },

  // Alignment variations (content pseudo-element placement)
  start: {
    "::after": {
      content: '""',
    },
  },
  center: {
    "::before": {
      content: '""',
    },
    "::after": {
      content: '""',
    },
  },
  end: {
    "::before": {
      content: '""',
    },
  },

  // Appearance variations
  brand: {
    color: tokens.colorBrandForeground1,
    "::before": {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },
    "::after": {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },
  },
  default: {
    color: tokens.colorNeutralForeground2,
    "::before": {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
    },
    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke2),
    },
  },
  subtle: {
    color: tokens.colorNeutralForeground3,
    "::before": {
      ...shorthands.borderColor(tokens.colorNeutralStroke3),
    },
    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke3),
    },
  },
  strong: {
    color: tokens.colorNeutralForeground1,
    "::before": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
    "::after": {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
  },
});

const useHorizontalStyles = makeStyles({
  base: {
    width: "100%",
    "::before": {
      borderTopStyle: "solid",
      borderTopWidth: tokens.strokeWidthThin,
      minWidth: minStartEndLength,
    },
    "::after": {
      borderTopStyle: "solid",
      borderTopWidth: tokens.strokeWidthThin,
      minWidth: minStartEndLength,
    },
  },
  inset: {
    paddingLeft: insetSpacing,
    paddingRight: insetSpacing,
  },
  start: {
    textAlign: "left",
    "::before": {
      content: '""',
      marginRight: contentSpacing,
      maxWidth: maxStartEndLength,
    },
    "::after": {
      marginLeft: contentSpacing,
    },
  },
  center: {
    textAlign: "center",
    "::before": {
      marginRight: contentSpacing,
    },
    "::after": {
      marginLeft: contentSpacing,
    },
  },
  end: {
    textAlign: "right",
    "::before": {
      marginRight: contentSpacing,
    },
    "::after": {
      content: '""',
      marginLeft: contentSpacing,
      maxWidth: maxStartEndLength,
    },
  },
});

const useVerticalStyles = makeStyles({
  base: {
    flexDirection: "column",
    minHeight: "20px",
    "::before": {
      borderRightStyle: "solid",
      borderRightWidth: tokens.strokeWidthThin,
      minHeight: minStartEndLength,
    },
    "::after": {
      borderRightStyle: "solid",
      borderRightWidth: tokens.strokeWidthThin,
      minHeight: minStartEndLength,
    },
  },
  inset: {
    marginTop: insetSpacing,
    marginBottom: insetSpacing,
  },
  withChildren: {
    minHeight: "84px",
  },
  start: {
    "::before": {
      content: '""',
      marginBottom: contentSpacing,
      maxHeight: maxStartEndLength,
    },
    "::after": {
      marginTop: contentSpacing,
    },
  },
  center: {
    "::before": {
      marginBottom: contentSpacing,
    },
    "::after": {
      marginTop: contentSpacing,
    },
  },
  end: {
    "::before": {
      marginBottom: contentSpacing,
    },
    "::after": {
      content: '""',
      marginTop: contentSpacing,
      maxHeight: maxStartEndLength,
    },
  },
});

const baseStyles = useStyles(useBaseStyles);
const horizontalStyles = useStyles(useHorizontalStyles);
const verticalStyles = useStyles(useVerticalStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Divider",

    // Base styles
    baseStyles.value.base,
    baseStyles.value[props.alignContent],
    baseStyles.value[props.appearance],

    // Horizontal styles
    !props.vertical && horizontalStyles.value.base,
    !props.vertical && props.inset && horizontalStyles.value.inset,
    !props.vertical && horizontalStyles.value[props.alignContent],

    // Vertical styles
    props.vertical && verticalStyles.value.base,
    props.vertical && props.inset && verticalStyles.value.inset,
    props.vertical && verticalStyles.value[props.alignContent],
    props.vertical && hasContent.value && verticalStyles.value.withChildren,

    // Childless styles
    !hasContent.value && baseStyles.value.childless,
  ),
);
</script>

<template>
  <div
    :class="rootClass"
    role="separator"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-labelledby="hasContent ? dividerId : undefined"
    v-bind="$attrs"
  >
    <div v-if="hasContent" :id="dividerId" class="fui-Divider__wrapper">
      <slot />
    </div>
  </div>
</template>
