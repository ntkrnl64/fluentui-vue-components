<script setup lang="ts">
import { ref } from "vue";
import {
  InlineDrawer,
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  Body1,
} from "../../index";
import ControlExample from "../ControlExample.vue";

const inlineOpen = ref(false);
const overlayOpen = ref(false);
const overlayEndOpen = ref(false);
</script>

<template>
  <div class="page">
    <h1>Drawer</h1>
    <p>
      A drawer provides a surface for supplementary content anchored to the edge
      of the screen.
    </p>

    <ControlExample headerText="InlineDrawer">
      <div
        style="
          width: 100%;
          display: flex;
          border: 1px solid var(--colorNeutralStroke2);
          border-radius: var(--borderRadiusMedium);
          min-height: 300px;
          overflow: hidden;
        "
      >
        <InlineDrawer :open="inlineOpen" position="start" size="small">
          <DrawerHeader>
            <DrawerHeaderTitle>Inline Drawer</DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>
            <Body1
              >This is an inline drawer. It pushes the content to make
              room.</Body1
            >
            <br />
            <Button size="small" @click="inlineOpen = false">Close</Button>
          </DrawerBody>
        </InlineDrawer>
        <div style="flex: 1; padding: 16px">
          <Button @click="inlineOpen = !inlineOpen">
            {{ inlineOpen ? "Close" : "Open" }} Inline Drawer
          </Button>
          <Body1 block style="margin-top: 12px"
            >Main content area. The drawer pushes this content aside when
            open.</Body1
          >
        </div>
      </div>
    </ControlExample>

    <ControlExample headerText="OverlayDrawer - Start">
      <Button appearance="primary" @click="overlayOpen = true"
        >Open Overlay Drawer (Start)</Button
      >
      <OverlayDrawer
        :open="overlayOpen"
        position="start"
        @update:open="overlayOpen = $event"
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Overlay Drawer</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <Body1
            >This is an overlay drawer. It covers the content with a
            backdrop.</Body1
          >
          <br /><br />
          <Button @click="overlayOpen = false">Close</Button>
        </DrawerBody>
      </OverlayDrawer>
    </ControlExample>

    <ControlExample headerText="OverlayDrawer - End">
      <Button @click="overlayEndOpen = true">Open Overlay Drawer (End)</Button>
      <OverlayDrawer
        :open="overlayEndOpen"
        position="end"
        @update:open="overlayEndOpen = $event"
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Right Side Drawer</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <Body1>This drawer opens from the end (right side).</Body1>
          <br /><br />
          <Button @click="overlayEndOpen = false">Close</Button>
        </DrawerBody>
      </OverlayDrawer>
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
