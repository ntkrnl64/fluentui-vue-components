<script setup lang="ts">
import { Popover, PopoverTrigger, PopoverSurface, Button } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Popover</h1>
    <p>
      A popover displays rich content in a temporary surface anchored to a
      trigger.
    </p>

    <ControlExample headerText="Basic Popover">
      <Popover>
        <PopoverTrigger>
          <Button>Show Popover</Button>
        </PopoverTrigger>
        <PopoverSurface>
          <div style="padding: 8px; max-width: 300px">
            <h3 style="margin: 0 0 8px">Popover Title</h3>
            <p style="margin: 0">
              This is the popover content. It can contain any rich content.
            </p>
          </div>
        </PopoverSurface>
      </Popover>
    </ControlExample>

    <ControlExample headerText="Popover Positions">
      <Popover position="above">
        <PopoverTrigger>
          <Button>Above</Button>
        </PopoverTrigger>
        <PopoverSurface>Content above the trigger</PopoverSurface>
      </Popover>
      <Popover position="below">
        <PopoverTrigger>
          <Button>Below</Button>
        </PopoverTrigger>
        <PopoverSurface>Content below the trigger</PopoverSurface>
      </Popover>
      <Popover position="before">
        <PopoverTrigger>
          <Button>Before</Button>
        </PopoverTrigger>
        <PopoverSurface>Content before the trigger</PopoverSurface>
      </Popover>
      <Popover position="after">
        <PopoverTrigger>
          <Button>After</Button>
        </PopoverTrigger>
        <PopoverSurface>Content after the trigger</PopoverSurface>
      </Popover>
    </ControlExample>

    <ControlExample headerText="Popover with Arrow">
      <Popover withArrow>
        <PopoverTrigger>
          <Button appearance="primary">With Arrow</Button>
        </PopoverTrigger>
        <PopoverSurface>
          <div style="padding: 8px">
            This popover has an arrow pointing to the trigger.
          </div>
        </PopoverSurface>
      </Popover>
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
