<script setup lang="ts">
import { computed, provide } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { TagGroupContextKey } from "./context";
import type { TagSize } from "./context";

export interface TagGroupProps {
  size?: TagSize;
  dismissible?: boolean;
}

const props = withDefaults(defineProps<TagGroupProps>(), {
  size: "medium",
  dismissible: false,
});

const emit = defineEmits<{
  dismiss: [value: string];
}>();

defineOptions({ inheritAttrs: false });

const useBaseClass = makeResetStyles({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: tokens.spacingHorizontalXS,
});

const baseClassName = useResetStyles(useBaseClass);

const rootClass = computed(() =>
  mergeClasses("fui-TagGroup", baseClassName.value),
);

provide(TagGroupContextKey, {
  size: props.size,
  dismissible: props.dismissible,
  handleDismiss: (value: string) => {
    emit("dismiss", value);
  },
});
</script>

<template>
  <div :class="rootClass" role="listbox" v-bind="$attrs">
    <slot />
  </div>
</template>
