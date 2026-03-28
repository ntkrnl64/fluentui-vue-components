<script setup lang="ts">
import { computed } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  height: tokens.strokeWidthThin,
  backgroundColor: tokens.colorNeutralStroke2,
  marginTop: tokens.spacingVerticalXS,
  marginBottom: tokens.spacingVerticalXS,
  border: "none",
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-NavDivider", baseClassName.value),
);
</script>

<template>
  <hr :class="rootClass" role="separator" v-bind="$attrs" />
</template>
