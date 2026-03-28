<script setup lang="ts">
import { ref } from "vue";
import { Slider } from "../../index";
import ControlExample from "../ControlExample.vue";

const horizontal = ref(50);
const stepped = ref(5);
</script>

<template>
  <div class="page">
    <h1>Slider</h1>
    <p>
      A slider lets the user select a value from a continuous or discrete range.
    </p>

    <ControlExample headerText="Horizontal Slider">
      <div style="width: 100%">
        <Slider v-model="horizontal" :min="0" :max="100" />
      </div>
      <template #output>
        <span>Value: {{ horizontal }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Vertical Slider">
      <div style="height: 200px; display: flex; gap: 24px">
        <Slider vertical :min="0" :max="100" :modelValue="60" />
        <Slider vertical :min="0" :max="100" :modelValue="30" size="small" />
      </div>
    </ControlExample>

    <ControlExample headerText="Small Size">
      <div style="width: 100%">
        <Slider size="small" :min="0" :max="100" :modelValue="40" />
      </div>
    </ControlExample>

    <ControlExample headerText="Custom Min/Max/Step">
      <div style="width: 100%">
        <Slider v-model="stepped" :min="0" :max="10" :step="1" />
      </div>
      <template #output>
        <span>Value: {{ stepped }} (step: 1, range: 0-10)</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Disabled Slider">
      <div style="width: 100%">
        <Slider disabled :min="0" :max="100" :modelValue="50" />
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
