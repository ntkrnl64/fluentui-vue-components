<script setup lang="ts">
import { Tooltip, Button } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Tooltip</h1>
    <p>A tooltip displays brief helper text near its trigger element.</p>

    <ControlExample headerText="Normal Appearance">
      <Tooltip content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </ControlExample>

    <ControlExample headerText="Inverted Appearance">
      <Tooltip content="Inverted tooltip" appearance="inverted">
        <Button>Hover for inverted</Button>
      </Tooltip>
    </ControlExample>

    <ControlExample headerText="Tooltip Positions">
      <Tooltip content="Tooltip above" position="above">
        <Button>Above</Button>
      </Tooltip>
      <Tooltip content="Tooltip below" position="below">
        <Button>Below</Button>
      </Tooltip>
      <Tooltip content="Tooltip before" position="before">
        <Button>Before</Button>
      </Tooltip>
      <Tooltip content="Tooltip after" position="after">
        <Button>After</Button>
      </Tooltip>
    </ControlExample>

    <ControlExample headerText="Tooltip with Arrow">
      <Tooltip content="I have an arrow!" withArrow>
        <Button appearance="primary">With Arrow</Button>
      </Tooltip>
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
