<script setup lang="ts">
import { ref } from "vue";
import { Select, Combobox, Option, Dropdown } from "../../index";
import ControlExample from "../ControlExample.vue";

const selectValue = ref("");
const comboValue = ref("");
const dropdownValue = ref("");
</script>

<template>
  <div class="page">
    <h1>Select, Combobox &amp; Dropdown</h1>
    <p>Components for selecting from a list of options.</p>

    <ControlExample headerText="Select">
      <Select v-model="selectValue">
        <option value="">Choose a color...</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
      </Select>
      <template #output>
        <span>Selected: {{ selectValue || "(none)" }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Combobox">
      <Combobox v-model="comboValue" placeholder="Pick a fruit">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry">Cherry</Option>
        <Option value="grape">Grape</Option>
        <Option value="mango">Mango</Option>
        <Option value="orange">Orange</Option>
      </Combobox>
      <template #output>
        <span>Combobox value: {{ comboValue || "(none)" }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Dropdown">
      <Dropdown v-model="dropdownValue" placeholder="Select an animal">
        <Option value="cat">Cat</Option>
        <Option value="dog">Dog</Option>
        <Option value="fish">Fish</Option>
        <Option value="hamster">Hamster</Option>
        <Option value="parrot">Parrot</Option>
      </Dropdown>
      <template #output>
        <span>Dropdown value: {{ dropdownValue || "(none)" }}</span>
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
