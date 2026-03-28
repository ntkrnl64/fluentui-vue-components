<script setup lang="ts">
import { Divider } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Divider</h1>
    <p>A divider visually separates content into distinct groups.</p>

    <ControlExample headerText="Horizontal Divider">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 16px"
      >
        <p>Content above</p>
        <Divider />
        <p>Content below</p>
      </div>
    </ControlExample>

    <ControlExample headerText="Vertical Divider">
      <div style="display: flex; align-items: center; gap: 16px; height: 40px">
        <span>Left</span>
        <Divider vertical />
        <span>Right</span>
      </div>
    </ControlExample>

    <ControlExample headerText="Divider with Content">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 16px"
      >
        <Divider>Section 1</Divider>
        <p>Some content here</p>
        <Divider>Section 2</Divider>
        <p>More content here</p>
      </div>
    </ControlExample>

    <ControlExample headerText="Divider Appearances">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 16px"
      >
        <Divider appearance="default">Default</Divider>
        <Divider appearance="subtle">Subtle</Divider>
        <Divider appearance="brand">Brand</Divider>
        <Divider appearance="strong">Strong</Divider>
      </div>
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
