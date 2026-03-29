import { watch, onUnmounted } from "vue";
import type { Ref } from "vue";

export interface MotionDefinition {
  keyframes: Keyframe[];
  duration: number;
  easing?: string;
  fill?: FillMode;
}

export interface PresenceMotionDefinition {
  enter: MotionDefinition;
  exit: MotionDefinition;
}

/**
 * Applies enter/exit animations using the Web Animations API.
 */
export function usePresenceMotion(
  elementRef: Ref<HTMLElement | null | undefined>,
  motion: PresenceMotionDefinition,
  visible: Ref<boolean>,
) {
  let currentAnimation: Animation | null = null;

  const stopWatch = watch(visible, (isVisible, _wasVisible) => {
    const el = elementRef.value;
    if (!el) return;

    if (currentAnimation) {
      currentAnimation.cancel();
    }

    const def = isVisible ? motion.enter : motion.exit;
    currentAnimation = el.animate(def.keyframes, {
      duration: def.duration,
      easing: def.easing ?? "ease",
      fill: def.fill ?? "forwards",
    });

    currentAnimation.onfinish = () => {
      currentAnimation = null;
    };
  });

  onUnmounted(() => {
    stopWatch();
    currentAnimation?.cancel();
  });
}
