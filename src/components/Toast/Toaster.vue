<script setup lang="ts">
import { provide, reactive, h } from "vue";
import type { VNode } from "vue";
import {
  useResetStyles,
  mergeClasses,
  makeResetStyles,
} from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import { ToasterContextKey } from "./context";
import type { ToastEntry, ToastOptions } from "./context";

defineOptions({ inheritAttrs: false });

let toastId = 0;
const toasts = reactive<ToastEntry[]>([]);

function dispatchToast(
  content: VNode | (() => VNode),
  options: ToastOptions = {},
) {
  const id = ++toastId;
  const entry: ToastEntry = { id, content, options };
  toasts.push(entry);

  const timeout = options.timeout ?? 5000;
  if (timeout > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, timeout);
  }
}

function dismissToast(id: number) {
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) {
    toasts.splice(index, 1);
  }
}

provide(ToasterContextKey, { dispatchToast });

const useBaseClass = makeResetStyles({
  position: "fixed",
  top: tokens.spacingVerticalXXL,
  right: tokens.spacingHorizontalXXL,
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacingVerticalM,
  zIndex: 1000001,
  maxWidth: "400px",
  width: "100%",
  pointerEvents: "none",
});

const baseClassName = useResetStyles(useBaseClass);
</script>

<template>
  <slot />
  <Teleport to="body">
    <div
      v-if="toasts.length > 0"
      :class="mergeClasses('fui-Toaster', baseClassName)"
      v-bind="$attrs"
    >
      <template v-for="toast in toasts" :key="toast.id">
        <component
          v-if="typeof toast.content === 'function'"
          :is="toast.content"
        />
        <component v-else :is="toast.content" />
      </template>
    </div>
  </Teleport>
</template>
