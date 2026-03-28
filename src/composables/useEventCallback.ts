import { ref } from "vue";

/**
 * Returns a stable function reference that always calls the latest callback.
 * Equivalent to React's useEventCallback pattern.
 */
export function useEventCallback<Args extends unknown[], Return>(
  callback: (...args: Args) => Return,
): (...args: Args) => Return {
  const callbackRef = ref(callback) as { value: (...args: Args) => Return };

  // Update to latest callback on each call
  callbackRef.value = callback;

  return (...args: Args) => callbackRef.value(...args);
}
