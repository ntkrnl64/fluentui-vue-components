<script setup lang="ts">
import { Spinner } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Spinner</h1>
    <p>A spinner indicates that content is loading.</p>

    <ControlExample headerText="Spinner Sizes">
      <Spinner size="tiny" />
      <Spinner size="extra-small" />
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
      <Spinner size="extra-large" />
      <Spinner size="huge" />
    </ControlExample>

    <ControlExample headerText="Spinner Appearances">
      <Spinner appearance="primary" label="Primary" />
      <Spinner appearance="inverted" label="Inverted" />
    </ControlExample>

    <ControlExample headerText="Spinner with Label">
      <Spinner label="Loading data..." />
      <Spinner label="Please wait..." size="large" />
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
