<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { AccordionContextKey } from "./context";

export interface AccordionProps {
  collapsible?: boolean;
  multiple?: boolean;
}

const props = withDefaults(defineProps<AccordionProps>(), {
  collapsible: false,
  multiple: false,
});

defineOptions({ inheritAttrs: false });

const openItems = defineModel<string[]>("openItems", { default: () => [] });

function toggleItem(value: string) {
  const current = openItems.value;
  const index = current.indexOf(value);

  if (index >= 0) {
    // Item is open, try to close
    if (!props.collapsible && current.length === 1) {
      // Cannot collapse the last item when collapsible is false
      return;
    }
    openItems.value = current.filter((item) => item !== value);
  } else {
    // Item is closed, open it
    if (props.multiple) {
      openItems.value = [...current, value];
    } else {
      openItems.value = [value];
    }
  }
}

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-Accordion", baseClassName.value),
);

provide(AccordionContextKey, {
  openItems,
  toggleItem,
  collapsible: props.collapsible,
  multiple: props.multiple,
});
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>
