<script setup lang="ts">
import { ref } from "vue";
import {
  Card,
  CardHeader,
  CardPreview,
  CardFooter,
  Button,
  Body1,
  Caption1,
} from "../../index";
import ControlExample from "../ControlExample.vue";

const clickCount = ref(0);
</script>

<template>
  <div class="page">
    <h1>Card</h1>
    <p>A card is a container for displaying related content and actions.</p>

    <ControlExample headerText="Card with Header, Preview, and Footer">
      <Card style="width: 360px">
        <CardHeader>
          <template #header><Body1>Card Title</Body1></template>
          <template #description
            ><Caption1>Card description goes here</Caption1></template
          >
        </CardHeader>
        <CardPreview>
          <div
            style="
              height: 120px;
              background: var(--colorBrandBackground2);
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--colorBrandForeground2);
            "
          >
            Preview Content
          </div>
        </CardPreview>
        <CardFooter>
          <Button size="small">Action 1</Button>
          <Button size="small">Action 2</Button>
        </CardFooter>
      </Card>
    </ControlExample>

    <ControlExample headerText="Card Appearances">
      <Card appearance="filled" style="width: 200px; padding: 16px">
        <Body1>Filled</Body1>
        <Caption1>Default card appearance</Caption1>
      </Card>
      <Card appearance="filled-alternative" style="width: 200px; padding: 16px">
        <Body1>Filled Alternative</Body1>
        <Caption1>Alternative background</Caption1>
      </Card>
      <Card appearance="outline" style="width: 200px; padding: 16px">
        <Body1>Outline</Body1>
        <Caption1>Bordered card</Caption1>
      </Card>
      <Card appearance="subtle" style="width: 200px; padding: 16px">
        <Body1>Subtle</Body1>
        <Caption1>Minimal card</Caption1>
      </Card>
    </ControlExample>

    <ControlExample headerText="Interactive Card">
      <Card
        interactive
        style="width: 300px; padding: 16px"
        @click="clickCount++"
      >
        <Body1>Click this card</Body1>
        <Caption1>Interactive cards respond to hover and click</Caption1>
      </Card>
      <template #output>
        <span>Click count: {{ clickCount }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Card Sizes">
      <Card size="small" style="width: 200px; padding: 12px">
        <Caption1>Small card</Caption1>
      </Card>
      <Card size="medium" style="width: 200px; padding: 16px">
        <Caption1>Medium card</Caption1>
      </Card>
      <Card size="large" style="width: 200px; padding: 20px">
        <Caption1>Large card</Caption1>
      </Card>
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
