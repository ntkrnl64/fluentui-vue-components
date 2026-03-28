import { onMounted, onUnmounted, type Ref } from "vue";

/**
 * Calls the callback when a click occurs outside the referenced element.
 */
export function useOnClickOutside(
  elementRef: Ref<HTMLElement | null | undefined>,
  callback: (event: MouseEvent) => void,
  disabled?: Ref<boolean>,
) {
  function handler(event: MouseEvent) {
    if (disabled?.value) return;
    const el = elementRef.value;
    if (el && !el.contains(event.target as Node)) {
      callback(event);
    }
  }

  onMounted(() => {
    document.addEventListener("mousedown", handler, true);
  });

  onUnmounted(() => {
    document.removeEventListener("mousedown", handler, true);
  });
}
