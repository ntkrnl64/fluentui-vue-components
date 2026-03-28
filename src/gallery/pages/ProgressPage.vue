<script setup lang="ts">
import { ref } from "vue";
import { ProgressBar } from "../../index";
import ControlExample from "../ControlExample.vue";

const progress = ref(0.6);
</script>

<template>
  <div class="page">
    <h1>ProgressBar</h1>
    <p>A progress bar indicates the status of a long-running operation.</p>

    <ControlExample headerText="Determinate Progress">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 12px"
      >
        <ProgressBar :value="0.25" />
        <ProgressBar :value="0.5" />
        <ProgressBar :value="0.75" />
        <ProgressBar :value="1" />
      </div>
    </ControlExample>

    <ControlExample headerText="Interactive Progress">
      <div style="width: 100%">
        <ProgressBar :value="progress" />
      </div>
      <template #options>
        <label>
          Value:
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            v-model.number="progress"
          />
          {{ Math.round(progress * 100) }}%
        </label>
      </template>
    </ControlExample>

    <ControlExample headerText="Indeterminate Progress">
      <div style="width: 100%">
        <ProgressBar />
      </div>
    </ControlExample>

    <ControlExample headerText="Thickness">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 12px"
      >
        <ProgressBar :value="0.5" thickness="medium" />
        <ProgressBar :value="0.5" thickness="large" />
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
