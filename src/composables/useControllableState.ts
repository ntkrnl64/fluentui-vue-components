import { computed, ref, watch } from "vue";
import type { Ref, WritableComputedRef } from "vue";

/**
 * Manages controlled/uncontrolled state. If `prop` is defined, the component is controlled
 * and updates come from the parent. Otherwise, internal state is used.
 */
export function useControllableState<T>(options: {
  prop: Ref<T | undefined>;
  defaultValue: T;
}): WritableComputedRef<T> {
  const internalState = ref(options.defaultValue) as Ref<T>;

  // Sync internal state when controlled value changes
  watch(options.prop, (val) => {
    if (val !== undefined) {
      internalState.value = val;
    }
  });

  return computed({
    get() {
      return options.prop.value !== undefined
        ? options.prop.value
        : internalState.value;
    },
    set(value: T) {
      internalState.value = value;
    },
  });
}
