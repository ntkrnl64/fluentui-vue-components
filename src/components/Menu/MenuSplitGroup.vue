<script setup lang="ts">
import { makeStyles } from "@griffel/core";
import { useStyles, mergeClasses } from "@ntkrnl64/griffel-vue";

defineOptions({ inheritAttrs: false });

const useMenuSplitGroupStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
});

const styles = useStyles(useMenuSplitGroupStyles);
</script>

<template>
  <div
    :class="mergeClasses('fui-MenuSplitGroup', styles.root)"
    role="group"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
