<script setup lang="ts">
import { computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
  useStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import type { AvatarSize } from "../Avatar/Avatar.vue";

export type PersonaTextPosition = "before" | "after" | "below";
export type PersonaTextAlignment = "start" | "center";

export interface PersonaProps {
  name?: string;
  secondaryText?: string;
  tertiaryText?: string;
  quaternaryText?: string;
  presence?: object;
  size?: AvatarSize;
  textPosition?: PersonaTextPosition;
  textAlignment?: PersonaTextAlignment;
}

const props = withDefaults(defineProps<PersonaProps>(), {
  textPosition: "after",
  textAlignment: "start",
  size: 32,
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  alignItems: "center",
  gap: tokens.spacingHorizontalS,
  fontFamily: tokens.fontFamilyBase,
});

const usePersonaStyles = makeStyles({
  before: { flexDirection: "row-reverse" },
  below: { flexDirection: "column", alignItems: "center" },
  center: { textAlign: "center" },
  textContainer: { display: "flex", flexDirection: "column" },
  name: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  secondary: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  tertiary: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase100,
  },
  quaternary: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase100,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(usePersonaStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-Persona",
    baseClassName.value,
    props.textPosition === "before" && styles.value.before,
    props.textPosition === "below" && styles.value.below,
  ),
);
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot name="avatar" />
    <div
      :class="
        mergeClasses(
          styles.textContainer,
          textAlignment === 'center' && styles.center,
        )
      "
    >
      <span v-if="name" :class="styles.name">{{ name }}</span>
      <span v-if="secondaryText" :class="styles.secondary">{{
        secondaryText
      }}</span>
      <span v-if="tertiaryText" :class="styles.tertiary">{{
        tertiaryText
      }}</span>
      <span v-if="quaternaryText" :class="styles.quaternary">{{
        quaternaryText
      }}</span>
    </div>
  </div>
</template>
