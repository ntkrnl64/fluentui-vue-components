<script setup lang="ts">
import { provide, computed } from "vue";
import {
  useResetStyles,
  useStyles,
  mergeClasses,
  makeResetStyles,
  makeStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { BreadcrumbContextKey } from "./context";
import type { BreadcrumbSize } from "./context";

export interface BreadcrumbProps {
  size?: BreadcrumbSize;
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  size: "medium",
});

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  alignItems: "center",
});

const useBreadcrumbStyles = makeStyles({
  ol: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    listStyleType: "none",
    margin: "0",
    padding: "0",
  },
  small: {
    columnGap: tokens.spacingHorizontalXXS,
  },
  medium: {
    columnGap: tokens.spacingHorizontalXS,
  },
  large: {
    columnGap: tokens.spacingHorizontalSNudge,
  },
});

const baseClassName = useResetStyles(useBaseClass);
const styles = useStyles(useBreadcrumbStyles);

const rootClass = computed(() =>
  mergeClasses("fui-Breadcrumb", baseClassName.value),
);
const olClass = computed(() =>
  mergeClasses(styles.value.ol, styles.value[props.size]),
);

provide(BreadcrumbContextKey, {
  size: props.size,
});
</script>

<template>
  <nav :class="rootClass" aria-label="breadcrumb" v-bind="$attrs">
    <ol :class="olClass">
      <slot />
    </ol>
  </nav>
</template>
