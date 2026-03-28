<script setup lang="ts">
import { ref } from "vue";
import { Checkbox } from "../../index";
import ControlExample from "../ControlExample.vue";

const checked1 = ref(false);
const checked2 = ref(true);
const mixed = ref<boolean | "mixed">("mixed");
</script>

<template>
  <div class="page">
    <h1>Checkbox</h1>
    <p>A checkbox allows the user to toggle an option on or off.</p>

    <ControlExample headerText="Basic Checkbox States">
      <Checkbox v-model:checked="checked1">Unchecked</Checkbox>
      <Checkbox v-model:checked="checked2">Checked</Checkbox>
      <Checkbox v-model:checked="mixed">Mixed</Checkbox>
      <template #output>
        <span
          >Values: unchecked={{ checked1 }}, checked={{ checked2 }}, mixed={{
            mixed
          }}</span
        >
      </template>
    </ControlExample>

    <ControlExample headerText="Checkbox Shapes">
      <Checkbox shape="square" :checked="true">Square (default)</Checkbox>
      <Checkbox shape="circular" :checked="true">Circular</Checkbox>
    </ControlExample>

    <ControlExample headerText="Checkbox Sizes">
      <Checkbox size="medium" :checked="true">Medium (default)</Checkbox>
      <Checkbox size="large" :checked="true">Large</Checkbox>
    </ControlExample>

    <ControlExample headerText="Disabled Checkbox">
      <Checkbox disabled>Disabled unchecked</Checkbox>
      <Checkbox disabled :checked="true">Disabled checked</Checkbox>
    </ControlExample>

    <ControlExample headerText="Label Position">
      <Checkbox labelPosition="after" :checked="true"
        >Label after (default)</Checkbox
      >
      <Checkbox labelPosition="before" :checked="true">Label before</Checkbox>
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
