import { onUnmounted } from "vue";

/**
 * Returns setTimeout/clearTimeout helpers that auto-cleanup on unmount.
 */
export function useTimeout() {
  const timers = new Set<ReturnType<typeof setTimeout>>();

  function set(callback: () => void, delay: number) {
    const id = setTimeout(() => {
      timers.delete(id);
      callback();
    }, delay);
    timers.add(id);
    return id;
  }

  function clear(id: ReturnType<typeof setTimeout>) {
    clearTimeout(id);
    timers.delete(id);
  }

  onUnmounted(() => {
    timers.forEach(clearTimeout);
    timers.clear();
  });

  return { set, clear };
}
