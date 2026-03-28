<script setup lang="ts">
import { provide, ref, computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { NavCategoryContextKey } from "./context";

export interface NavCategoryProps {
  value: string;
}

const props = defineProps<NavCategoryProps>();

defineOptions({ inheritAttrs: false });

const open = ref(false);

function toggle() {
  open.value = !open.value;
}

const useBaseClass = makeResetStyles({
  display: "flex",
  flexDirection: "column",
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-NavCategory", baseClassName.value),
);

provide(NavCategoryContextKey, {
  value: props.value,
  open,
  toggle,
});
</script>

<template>
  <div :class="rootClass" v-bind="$attrs">
    <slot />
  </div>
</template>
