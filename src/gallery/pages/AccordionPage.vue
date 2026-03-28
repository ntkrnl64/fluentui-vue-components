<script setup lang="ts">
import { ref } from "vue";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "../../index";
import ControlExample from "../ControlExample.vue";

const singleOpen = ref<string[]>([]);
const multipleOpen = ref<string[]>(["item-1"]);
</script>

<template>
  <div class="page">
    <h1>Accordion</h1>
    <p>An accordion displays collapsible sections of content.</p>

    <ControlExample headerText="Single Collapsible">
      <div style="width: 100%; max-width: 500px">
        <Accordion v-model:openItems="singleOpen" collapsible>
          <AccordionItem value="item-1">
            <AccordionHeader>First Section</AccordionHeader>
            <AccordionPanel>
              Content for the first section. This is a collapsible panel that
              expands when the header is clicked.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionHeader>Second Section</AccordionHeader>
            <AccordionPanel>
              Content for the second section. Only one section can be open at a
              time.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionHeader>Third Section</AccordionHeader>
            <AccordionPanel>
              Content for the third section. Clicking another section will close
              this one.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <template #output>
        <span>Open items: {{ singleOpen.join(", ") || "(none)" }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Multiple Open">
      <div style="width: 100%; max-width: 500px">
        <Accordion v-model:openItems="multipleOpen" multiple>
          <AccordionItem value="item-1">
            <AccordionHeader>Section A</AccordionHeader>
            <AccordionPanel>
              Multiple sections can be open at once. This one starts open.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionHeader>Section B</AccordionHeader>
            <AccordionPanel>
              Open this alongside Section A -- both can be expanded.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionHeader>Section C</AccordionHeader>
            <AccordionPanel>
              All three sections can be open simultaneously.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <template #output>
        <span>Open items: {{ multipleOpen.join(", ") || "(none)" }}</span>
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
