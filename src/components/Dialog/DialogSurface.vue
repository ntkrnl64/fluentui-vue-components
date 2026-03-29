<script setup lang="ts">
import { inject, watch, ref, onUnmounted, nextTick } from "vue";
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
    backgroundColor: tokens.colorBackgroundOverlay,
  },
  surface: {
    position: "relative",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    border: "1px solid " + tokens.colorTransparentStroke,
    boxShadow: tokens.shadow64,
    boxSizing: "border-box",
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    ...shorthands.padding(
      tokens.spacingVerticalXXL,
      tokens.spacingHorizontalXXL,
    ),
    maxWidth: "600px",
    maxHeight: "100vh",
    width: "100%",
    margin: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    zIndex: 1,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useSurfaceStyles);

const surfaceRef = ref<HTMLElement | null>(null);
const backdropRef = ref<HTMLElement | null>(null);

// Local visibility flag: stays true during exit animation
const mounted = ref(false);
let exitAnimations: Animation[] = [];

// Motion tokens (matching React's DialogSurfaceMotion / DialogBackdropMotion)
const DURATION_GENTLE = 250;
const CURVE_DECELERATE_MID = "cubic-bezier(0.1, 0.9, 0.2, 1)";
const CURVE_ACCELERATE_MIN = "cubic-bezier(0.8, 0, 1, 1)";
const CURVE_EASY_EASE = "cubic-bezier(0.33, 0, 0.67, 1)";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateEnter() {
  const duration = prefersReducedMotion ? 1 : DURATION_GENTLE;

  // Surface: scale(0.85) + fade -> scale(1) + opaque
  surfaceRef.value?.animate(
    [
      { opacity: 0, transform: "scale(0.85)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    { duration, easing: CURVE_DECELERATE_MID, fill: "forwards" },
  );

  // Backdrop: fade in
  backdropRef.value?.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration,
    easing: CURVE_EASY_EASE,
    fill: "forwards",
  });
}

function animateExit(): Promise<void> {
  if (prefersReducedMotion) {
    return Promise.resolve();
  }

  const promises: Promise<void>[] = [];

  // Surface: scale(1) + opaque -> scale(0.85) + fade
  if (surfaceRef.value) {
    const anim = surfaceRef.value.animate(
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.85)" },
      ],
      {
        duration: DURATION_GENTLE,
        easing: CURVE_ACCELERATE_MIN,
        fill: "forwards",
      },
    );
    exitAnimations.push(anim);
    promises.push(anim.finished.then(() => {}));
  }

  // Backdrop: fade out
  if (backdropRef.value) {
    const anim = backdropRef.value.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: DURATION_GENTLE,
      easing: CURVE_EASY_EASE,
      fill: "forwards",
    });
    exitAnimations.push(anim);
    promises.push(anim.finished.then(() => {}));
  }

  return Promise.all(promises).then(() => {});
}

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

watch(
  () => ctx.open.value,
  async (isOpen) => {
    if (isOpen) {
      // Cancel any running exit animations
      exitAnimations.forEach((a) => a.cancel());
      exitAnimations = [];

      // Mount the DOM
      mounted.value = true;
      document.addEventListener("keydown", handleKeydown);
      if (ctx.modalType === "modal") {
        document.body.style.overflow = "hidden";
      }

      // Wait for DOM, then animate in
      await nextTick();
      animateEnter();
      surfaceRef.value?.focus();
    } else {
      document.removeEventListener("keydown", handleKeydown);

      // Play exit animation, then unmount
      await animateExit();
      mounted.value = false;
      document.body.style.overflow = "";
      exitAnimations = [];
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
  exitAnimations.forEach((a) => a.cancel());
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="mounted"
      :class="mergeClasses('fui-DialogSurface', baseClassName)"
      v-bind="$attrs"
    >
      <div
        ref="backdropRef"
        :class="styles.backdrop"
        @click="handleBackdropClick"
      />
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
