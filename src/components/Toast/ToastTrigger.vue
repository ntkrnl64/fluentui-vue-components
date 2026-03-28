<script setup lang="ts">
import { inject } from "vue";
import { ToasterContextKey } from "./context";

defineOptions({ inheritAttrs: false });
const ctx = inject(ToasterContextKey)!;

function handleClick() {
  ctx.dispatchToast(() => null as any);
}
</script>

<template>
  <slot :onClick="handleClick" />
</template>
