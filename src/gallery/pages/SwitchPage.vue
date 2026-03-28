<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "../../index";
import ControlExample from "../ControlExample.vue";

const switch1 = ref(false);
const switch2 = ref(true);
</script>

<template>
  <div class="page">
    <h1>Switch</h1>
    <p>A switch toggles between two mutually exclusive states -- on and off.</p>

    <ControlExample headerText="Basic Switch">
      <Switch v-model:checked="switch1">{{ switch1 ? "On" : "Off" }}</Switch>
      <Switch v-model:checked="switch2">{{ switch2 ? "On" : "Off" }}</Switch>
      <template #output>
        <span>Switch 1: {{ switch1 }}, Switch 2: {{ switch2 }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Label Positions">
      <Switch labelPosition="after" :checked="true"
        >Label after (default)</Switch
      >
      <Switch labelPosition="before" :checked="true">Label before</Switch>
      <Switch labelPosition="above" :checked="true">Label above</Switch>
    </ControlExample>

    <ControlExample headerText="Disabled Switch">
      <Switch disabled>Disabled off</Switch>
      <Switch disabled :checked="true">Disabled on</Switch>
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
