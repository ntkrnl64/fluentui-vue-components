<script setup lang="ts">
import { inject, computed, ref } from "vue";
import { PortalMountNodeKey } from "../../contexts";

const props = defineProps<{
  mountNode?: string | HTMLElement;
}>();

const contextMountNode = inject(
  PortalMountNodeKey,
  ref<string | HTMLElement>("body"),
);
const mountNode = computed(() => props.mountNode ?? contextMountNode.value);
</script>

<template>
  <Teleport :to="mountNode">
    <slot />
  </Teleport>
</template>
