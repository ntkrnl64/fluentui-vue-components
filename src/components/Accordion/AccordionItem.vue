<script setup lang="ts">
import { inject, provide, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { AccordionContextKey, AccordionItemContextKey } from "./context";

export interface AccordionItemProps {
  value: string;
}

const props = defineProps<AccordionItemProps>();

defineOptions({ inheritAttrs: false });

const accordionCtx = inject(AccordionContextKey)!;

const isOpen = computed(() =>
  accordionCtx.openItems.value.includes(props.value),
);

function toggle() {
  accordionCtx.toggleItem(props.value);
}

const useBaseClass = makeResetStyles({
  borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-AccordionItem", baseClassName.value),
);

provide(AccordionItemContextKey, {
  isOpen,
  toggle,
  value: props.value,
});
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>
