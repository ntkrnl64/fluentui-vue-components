<script setup lang="ts">
import { h } from "vue";
import {
  Toast,
  ToastTitle,
  ToastBody,
  useToastController,
  Button,
} from "../../index";
import ControlExample from "../ControlExample.vue";

const { dispatchToast } = useToastController();

function showToast(intent: "info" | "success" | "warning" | "error") {
  const titles: Record<string, string> = {
    info: "Information",
    success: "Success",
    warning: "Warning",
    error: "Error",
  };
  dispatchToast(
    () =>
      h(Toast, null, () => [
        h(ToastTitle, null, () => titles[intent]),
        h(ToastBody, null, () => `This is a ${intent} toast notification.`),
      ]),
    { intent, timeout: 5000 },
  );
}
</script>

<template>
  <div class="page">
    <ControlExample headerText="Toast Intents">
      <Button @click="showToast('info')">Info Toast</Button>
      <Button @click="showToast('success')">Success Toast</Button>
      <Button @click="showToast('warning')">Warning Toast</Button>
      <Button @click="showToast('error')">Error Toast</Button>
    </ControlExample>
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
}
</style>
