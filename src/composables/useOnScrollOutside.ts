import { onMounted, onUnmounted, type Ref } from "vue";

/**
 * Calls the callback when scrolling occurs outside the referenced element.
 */
export function useOnScrollOutside(
  elementRef: Ref<HTMLElement | null | undefined>,
  callback: (event: Event) => void,
  disabled?: Ref<boolean>,
) {
  function handler(event: Event) {
    if (disabled?.value) return;
    const el = elementRef.value;
    if (el && !el.contains(event.target as Node)) {
      callback(event);
    }
  }

  onMounted(() => {
    document.addEventListener("scroll", handler, true);
  });

  onUnmounted(() => {
    document.removeEventListener("scroll", handler, true);
  });
}
