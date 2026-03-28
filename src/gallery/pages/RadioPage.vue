<script setup lang="ts">
import { ref } from "vue";
import { Radio, RadioGroup } from "../../index";
import ControlExample from "../ControlExample.vue";

const selectedFruit = ref("apple");
const selectedColor = ref("");
const selectedSize = ref("medium");
</script>

<template>
  <div class="page">
    <h1>RadioGroup</h1>
    <p>RadioGroup lets users select a single option from a set of choices.</p>

    <ControlExample headerText="Vertical Layout (default)">
      <RadioGroup v-model="selectedFruit" layout="vertical">
        <Radio value="apple">Apple</Radio>
        <Radio value="banana">Banana</Radio>
        <Radio value="cherry">Cherry</Radio>
      </RadioGroup>
      <template #output>
        <span>Selected fruit: {{ selectedFruit }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Horizontal Layout">
      <RadioGroup v-model="selectedColor" layout="horizontal">
        <Radio value="red">Red</Radio>
        <Radio value="green">Green</Radio>
        <Radio value="blue">Blue</Radio>
      </RadioGroup>
      <template #output>
        <span>Selected color: {{ selectedColor || "(none)" }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Horizontal Stacked Layout">
      <RadioGroup v-model="selectedSize" layout="horizontal-stacked">
        <Radio value="small">Small</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="large">Large</Radio>
      </RadioGroup>
      <template #output>
        <span>Selected size: {{ selectedSize }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Disabled Radios">
      <RadioGroup disabled>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>
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
