import { ref, onMounted, onUnmounted } from "vue";

/**
 * Tracks whether focus should show a visible ring (keyboard navigation)
 * vs being hidden (mouse/pointer interaction).
 */
export function useFocusVisible() {
  const isKeyboardNavigation = ref(false);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Tab" || e.key === "Escape" || e.key.startsWith("Arrow")) {
      isKeyboardNavigation.value = true;
    }
  }

  function handlePointerDown() {
    isKeyboardNavigation.value = false;
  }

  onMounted(() => {
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("mousedown", handlePointerDown, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
  });

  onUnmounted(() => {
    document.removeEventListener("keydown", handleKeyDown, true);
    document.removeEventListener("mousedown", handlePointerDown, true);
    document.removeEventListener("pointerdown", handlePointerDown, true);
  });

  return isKeyboardNavigation;
}
