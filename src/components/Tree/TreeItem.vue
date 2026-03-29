<script setup lang="ts">
import { provide, inject, ref, computed } from "vue";
import {
  useStyles,
  useResetStyles,
  mergeClasses,
  makeStyles,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { TreeContextKey, TreeItemContextKey } from "./context";

export interface TreeItemProps {
  value?: string;
  itemType?: "leaf" | "branch";
}

const props = withDefaults(defineProps<TreeItemProps>(), {
  itemType: "leaf",
});

defineOptions({ inheritAttrs: false });

const treeCtx = inject(TreeContextKey)!;
const level = treeCtx.level;

const isOpen = ref(false);

function toggle() {
  if (props.itemType === "branch") {
    isOpen.value = !isOpen.value;
  }
}

const useBaseClass = makeResetStyles({
  listStyleType: "none",
  display: "flex",
  flexDirection: "column",
});

const useTreeItemStyles = makeStyles({
  leaf: {},
  branch: {
    cursor: "pointer",
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useTreeItemStyles);

const rootClass = computed(() =>
  mergeClasses(
    "fui-TreeItem",
    baseClassName.value,
    styles.value[props.itemType],
  ),
);

provide(TreeItemContextKey, {
  level,
  itemType: props.itemType,
  isOpen,
  toggle,
});

// Provide a nested tree context for children
provide(TreeContextKey, {
  level: level + 1,
});
</script>

<template>
  <li
    :class="rootClass"
    role="treeitem"
    :aria-expanded="itemType === 'branch' ? isOpen : undefined"
    v-bind="$attrs"
  >
    <slot />
    <ul
      v-if="itemType === 'branch' && isOpen"
      role="group"
      style="list-style-type: none; padding: 0; margin: 0"
    >
      <slot name="subtree" />
    </ul>
  </li>
</template>
