<script setup lang="ts">
import { computed, ref, onUnmounted, watch, nextTick } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

export interface OverlayDrawerProps {
  open?: boolean;
  position?: "start" | "end";
  size?: "small" | "medium" | "large" | "full";
  modalType?: "modal" | "non-modal";
}

const props = withDefaults(defineProps<OverlayDrawerProps>(), {
  open: false,
  position: "start",
  size: "small",
  modalType: "modal",
});

const emit = defineEmits<{ "update:open": [value: boolean] }>();

defineOptions({ inheritAttrs: false });

const slideInFromStartKeyframes = {
  from: { transform: "translateX(-100%)" },
  to: { transform: "translateX(0)" },
};

const slideInFromEndKeyframes = {
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
};

const fadeInKeyframes = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

const useOverlayClass = makeResetStyles({
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  display: "flex",
  zIndex: 1000000,
});

const useDrawerStyles = makeStyles({
  backdrop: {
    position: "fixed",
    inset: "0",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    animationName: fadeInKeyframes,
    animationDuration: tokens.durationNormal,
    animationTimingFunction: tokens.curveEasyEase,
    animationFillMode: "forwards",
    "@media screen and (prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms",
    },
  },
  surface: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    boxShadow: tokens.shadow64,
    height: "100%",
    overflow: "auto",
    position: "relative",
    zIndex: 1,
    animationFillMode: "forwards",
    "@media screen and (prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms",
    },
  },
  surfaceStart: {
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    animationName: slideInFromStartKeyframes,
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveDecelerateMid,
  },
  surfaceEnd: {
    borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    animationName: slideInFromEndKeyframes,
    animationDuration: tokens.durationGentle,
    animationTimingFunction: tokens.curveDecelerateMid,
  },
  start: { justifyContent: "flex-start" },
  end: { justifyContent: "flex-end" },
  small: { width: "320px" },
  medium: { width: "592px" },
  large: { width: "940px" },
  full: { width: "100vw" },
});

const overlayClassName = useResetStyles(useOverlayClass);
const styles = useStyles(useDrawerStyles);

const surfaceRef = ref<HTMLElement | null>(null);

const overlayClass = computed(() =>
  mergeClasses(
    "fui-OverlayDrawer",
    overlayClassName.value,
    styles.value[props.position],
  ),
);

const surfaceClass = computed(() =>
  mergeClasses(
    "fui-OverlayDrawer__surface",
    styles.value.surface,
    props.position === "start"
      ? styles.value.surfaceStart
      : styles.value.surfaceEnd,
    styles.value[props.size],
  ),
);

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "Escape" && props.open) {
    emit("update:open", false);
  }
}

function handleBackdropClick() {
  if (props.modalType === "modal") {
    emit("update:open", false);
  }
}

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      document.body.style.overflow =
        props.modalType === "modal" ? "hidden" : "";
      document.addEventListener("keydown", handleKeydown);
      await nextTick();
      surfaceRef.value?.focus();
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
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
    <div v-if="open" :class="overlayClass" v-bind="$attrs">
      <div
        v-if="modalType === 'modal'"
        :class="styles.backdrop"
        @click="handleBackdropClick"
      />
      <div
        ref="surfaceRef"
        :class="surfaceClass"
        role="dialog"
        :aria-modal="modalType === 'modal'"
        tabindex="-1"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
