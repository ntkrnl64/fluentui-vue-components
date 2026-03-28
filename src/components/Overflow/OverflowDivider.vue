<script setup lang="ts">
import { inject, ref, computed, onMounted, onUnmounted } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { OverflowContextKey } from "./context";

export interface OverflowDividerProps {
  groupId: string;
}

const props = defineProps<OverflowDividerProps>();
defineOptions({ inheritAttrs: false });
const ctx = inject(OverflowContextKey)!;
const itemRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (itemRef.value) ctx.registerItem(props.groupId, itemRef.value);
});
onUnmounted(() => {
  ctx.unregisterItem(props.groupId);
});

const isHidden = computed(() =>
  ctx.overflowItems.value.includes(props.groupId),
);

const useBaseClass = makeResetStyles({
  width: tokens.strokeWidthThin,
  height: "20px",
  backgroundColor: tokens.colorNeutralStroke2,
  flexShrink: 0,
  alignSelf: "center",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <div
    v-show="!isHidden"
    ref="itemRef"
    :class="mergeClasses('fui-OverflowDivider', baseClassName)"
    role="separator"
    v-bind="$attrs"
  />
</template>
