<script setup lang="ts">
import { computed, inject, ref } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { AvatarGroupContextKey } from "./context";

export interface AvatarGroupPopoverProps {
  count?: number;
}

const props = defineProps<AvatarGroupPopoverProps>();

defineOptions({ inheritAttrs: false });

const ctx = inject(AvatarGroupContextKey);
const isOpen = ref(false);
const triggerRef = ref<HTMLElement | null>(null);

const size = computed(() => ctx?.size ?? 32);

const useBaseClass = makeResetStyles({
  display: "inline-flex",
  position: "relative",
});

const usePopoverStyles = makeStyles({
  trigger: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    border: "none",
    backgroundColor: tokens.colorNeutralBackground6,
    color: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold as string,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground6Hover,
    },
    ":active": {
      backgroundColor: tokens.colorNeutralBackground6Pressed,
    },
  },
  surface: {
    position: "absolute",
    top: "100%",
    left: "0",
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    boxShadow: tokens.shadow16,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    marginTop: tokens.spacingVerticalXS,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    maxHeight: "300px",
    overflowY: "auto",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(usePopoverStyles);

const rootClass = computed(() =>
  mergeClasses("fui-AvatarGroupPopover", baseClassName.value),
);

const triggerStyle = computed(() => ({
  width: `${size.value}px`,
  height: `${size.value}px`,
  fontSize: `${Math.max(10, Math.floor(size.value * 0.35))}px`,
}));

function handleTriggerClick() {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event: MouseEvent) {
  if (triggerRef.value && !triggerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("click", handleClickOutside);
}
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <button
      ref="triggerRef"
      :class="styles.trigger"
      :style="triggerStyle"
      :aria-expanded="isOpen"
      aria-label="View more people"
      @click.stop="handleTriggerClick"
    >
      +{{ count }}
    </button>
    <div v-if="isOpen" :class="styles.surface" role="list" @click.stop>
      <slot />
    </div>
  </div>
</template>
