<script setup lang="ts">
import { inject } from "vue";
import { TableContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(TableContextKey)!;
</script>

<template>
  <tbody v-if="!ctx.noNativeElements" role="rowgroup" v-bind="$attrs">
    <slot />
  </tbody>
  <div v-else role="rowgroup" v-bind="$attrs">
    <slot />
  </div>
</template>
