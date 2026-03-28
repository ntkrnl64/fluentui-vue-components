<script setup lang="ts">
import { ref } from "vue";
import { Input, Textarea, SearchBox, SpinButton, Slider } from "../../index";
import ControlExample from "../ControlExample.vue";

const inputValue = ref("");
const textareaValue = ref("");
const searchValue = ref("");
const spinValue = ref(5);
const sliderValue = ref(50);
</script>

<template>
  <div class="page">
    <h1>Input</h1>
    <p>
      Input components allow users to enter and edit text or numeric values.
    </p>

    <ControlExample headerText="Input Appearances">
      <Input appearance="outline" placeholder="Outline (default)" />
      <Input appearance="underline" placeholder="Underline" />
      <Input appearance="filled-darker" placeholder="Filled Darker" />
      <Input appearance="filled-lighter" placeholder="Filled Lighter" />
    </ControlExample>

    <ControlExample headerText="Input Sizes">
      <Input size="small" placeholder="Small" />
      <Input size="medium" placeholder="Medium" />
      <Input size="large" placeholder="Large" />
    </ControlExample>

    <ControlExample headerText="Input with Content Slots">
      <Input placeholder="Amount">
        <template #contentBefore><span>$</span></template>
      </Input>
      <Input placeholder="Weight">
        <template #contentAfter><span>kg</span></template>
      </Input>
      <Input placeholder="Price">
        <template #contentBefore><span>$</span></template>
        <template #contentAfter><span>.00</span></template>
      </Input>
    </ControlExample>

    <ControlExample headerText="Input with v-model">
      <Input v-model="inputValue" placeholder="Type something..." />
      <template #output>
        <span>Current value: "{{ inputValue }}"</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Textarea">
      <Textarea v-model="textareaValue" placeholder="Default textarea" />
      <Textarea resize="vertical" placeholder="Resize vertical" />
      <Textarea resize="both" placeholder="Resize both" />
      <Textarea resize="horizontal" placeholder="Resize horizontal" />
      <template #output>
        <span>Textarea value: "{{ textareaValue }}"</span>
      </template>
    </ControlExample>

    <ControlExample headerText="SearchBox">
      <SearchBox v-model="searchValue" placeholder="Search..." />
      <SearchBox
        appearance="filled-darker"
        placeholder="Filled darker search"
      />
      <template #output>
        <span>Search: "{{ searchValue }}"</span>
      </template>
    </ControlExample>

    <ControlExample headerText="SpinButton">
      <SpinButton v-model="spinValue" :min="0" :max="20" :step="1" />
      <SpinButton :min="0" :max="100" :step="5" appearance="underline" />
      <SpinButton disabled :min="0" :max="10" />
      <template #output>
        <span>Spin value: {{ spinValue }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Slider">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 16px"
      >
        <Slider v-model="sliderValue" :min="0" :max="100" />
        <Slider :min="0" :max="10" :step="1" size="small" />
        <Slider disabled :min="0" :max="100" :modelValue="30" />
      </div>
      <template #output>
        <span>Slider value: {{ sliderValue }}</span>
      </template>
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
