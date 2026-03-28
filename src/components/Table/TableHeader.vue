<script setup lang="ts">
import { inject } from "vue";
import {
  makeResetStyles,
  useResetStyles,
  mergeClasses,
} from "@ntkrnl64/griffel-vue";
import { TableContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TableContextKey)!;

const useBaseClass = makeResetStyles({
  display: "table-header-group",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <thead
    v-if="!ctx.noNativeElements"
    :class="mergeClasses('fui-TableHeader', baseClassName)"
    role="rowgroup"
    v-bind="$attrs"
  >
    <slot />
  </thead>
  <div
    v-else
    :class="mergeClasses('fui-TableHeader', baseClassName)"
    role="rowgroup"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
