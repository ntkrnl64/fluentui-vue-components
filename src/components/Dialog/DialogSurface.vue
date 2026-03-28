<script setup lang="ts">
import { inject, computed, watch, ref, onUnmounted, nextTick } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
  shorthands,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { DialogContextKey } from "./context";

const ctx = inject(DialogContextKey)!;

defineOptions({ inheritAttrs: false });

const scaleInKeyframes = {
  from: { opacity: 0, transform: "scale(0.85)" },
  to: { opacity: 1, transform: "scale(1)" },
};

const fadeInKeyframes = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

const useBaseClass = makeResetStyles({
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000000,
});

const useSurfaceStyles = makeStyles({
  backdrop: {
    position: "fixed",
    inset: "0",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    animationName: fadeInKeyframes,
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveEasyEase,
    animationFillMode: "forwards",
    "@media screen and (prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms",
    },
  },
  surface: {
    position: "relative",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    boxShadow: tokens.shadow64,
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    ...shorthands.padding(
      tokens.spacingVerticalXXL,
      tokens.spacingHorizontalXXL,
    ),
    maxWidth: "600px",
    maxHeight: "80vh",
    width: "100%",
    margin: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    zIndex: 1,
    // Scale + fade entrance animation
    animationName: scaleInKeyframes,
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveDecelerateMid,
    animationFillMode: "forwards",
    "@media screen and (prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms",
    },
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSurfaceStyles);

const surfaceRef = ref<HTMLElement | null>(null);

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && ctx.modalType !== "alert") {
    ctx.setOpen(false);
  }
}

function handleBackdropClick() {
  if (ctx.modalType !== "alert") {
    ctx.setOpen(false);
  }
}

// Reactively manage body scroll lock and keydown listener
watch(
  () => ctx.open.value,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
      if (ctx.modalType === "modal") {
        document.body.style.overflow = "hidden";
      }
      nextTick(() => {
        surfaceRef.value?.focus();
      });
    } else {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="ctx.open.value"
      :class="mergeClasses('fui-DialogSurface', baseClassName)"
      v-bind="$attrs"
    >
      <div :class="styles.backdrop" @click="handleBackdropClick" />
      <div
        ref="surfaceRef"
        :class="styles.surface"
        role="dialog"
        :aria-modal="ctx.modalType === 'modal'"
        :aria-labelledby="ctx.titleId"
        tabindex="-1"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
