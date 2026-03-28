<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  CompoundButton,
  ToggleButton,
  MenuButton,
  SplitButton,
} from "../../index";
import ControlExample from "../ControlExample.vue";

const toggleChecked = ref(false);
</script>

<template>
  <div class="page">
    <h1>Button</h1>
    <p>A button triggers an action or event when activated.</p>

    <ControlExample headerText="Button Appearances">
      <Button appearance="secondary">Secondary</Button>
      <Button appearance="primary">Primary</Button>
      <Button appearance="outline">Outline</Button>
      <Button appearance="subtle">Subtle</Button>
      <Button appearance="transparent">Transparent</Button>
    </ControlExample>

    <ControlExample headerText="Button Sizes">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </ControlExample>

    <ControlExample headerText="Button Shapes">
      <Button shape="rounded">Rounded</Button>
      <Button shape="circular">Circular</Button>
      <Button shape="square">Square</Button>
    </ControlExample>

    <ControlExample headerText="Disabled Buttons">
      <Button disabled>Disabled</Button>
      <Button disabled appearance="primary">Disabled Primary</Button>
      <Button disabledFocusable>Disabled Focusable</Button>
    </ControlExample>

    <ControlExample headerText="Icon Button">
      <Button appearance="primary">+ Add Item</Button>
      <Button shape="circular" size="small">+</Button>
      <Button iconPosition="after">Next ></Button>
    </ControlExample>

    <ControlExample headerText="CompoundButton">
      <CompoundButton
        appearance="primary"
        secondaryContent="This is the secondary content"
      >
        Compound
      </CompoundButton>
      <CompoundButton secondaryContent="Another description here">
        Secondary Compound
      </CompoundButton>
    </ControlExample>

    <ControlExample headerText="ToggleButton">
      <ToggleButton v-model:checked="toggleChecked" appearance="primary">
        {{ toggleChecked ? "Checked" : "Unchecked" }}
      </ToggleButton>
      <ToggleButton>Toggle Me</ToggleButton>
      <template #output>
        <span>Checked: {{ toggleChecked }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="MenuButton">
      <MenuButton appearance="primary">Menu Button</MenuButton>
      <MenuButton>Secondary Menu</MenuButton>
    </ControlExample>

    <ControlExample headerText="SplitButton">
      <SplitButton appearance="primary">Split Button</SplitButton>
      <SplitButton>Secondary Split</SplitButton>
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
