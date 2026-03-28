<script setup lang="ts">
import { Label } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Label</h1>
    <p>A label provides a name or title for a control.</p>

    <ControlExample headerText="Basic Label">
      <Label>Standard label</Label>
    </ControlExample>

    <ControlExample headerText="Required Label">
      <Label required>Required field</Label>
    </ControlExample>

    <ControlExample headerText="Label Sizes">
      <Label size="small">Small label</Label>
      <Label size="medium">Medium label (default)</Label>
      <Label size="large">Large label</Label>
    </ControlExample>

    <ControlExample headerText="Label Weights">
      <Label weight="regular">Regular weight</Label>
      <Label weight="semibold">Semibold weight</Label>
    </ControlExample>

    <ControlExample headerText="Disabled Label">
      <Label disabled>Disabled label</Label>
      <Label disabled required>Disabled required label</Label>
    </ControlExample>
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
}
.page h1 {
  color: var(--colorNeutralForeground1);
  margin-bottom: 4px;
}
.page > p {
  color: var(--colorNeutralForeground2);
  margin-bottom: 24px;
}
</style>
