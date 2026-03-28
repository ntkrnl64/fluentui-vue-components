<script setup lang="ts">
import {
  Text,
  Display,
  LargeTitle,
  Title1,
  Title2,
  Title3,
  Subtitle1,
  Subtitle2,
  Body1,
  Body1Strong,
  Body1Stronger,
  Body2,
  Caption1,
  Caption1Strong,
  Caption1Stronger,
  Caption2,
} from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Text</h1>
    <p>
      Text components provide consistent typography throughout the application.
    </p>

    <ControlExample headerText="Typography Presets">
      <div style="width: 100%; display: flex; flex-direction: column; gap: 8px">
        <Display>Display</Display>
        <LargeTitle>LargeTitle</LargeTitle>
        <Title1>Title1</Title1>
        <Title2>Title2</Title2>
        <Title3>Title3</Title3>
        <Subtitle1>Subtitle1</Subtitle1>
        <Subtitle2>Subtitle2</Subtitle2>
        <Body1>Body1</Body1>
        <Body1Strong>Body1Strong</Body1Strong>
        <Body1Stronger>Body1Stronger</Body1Stronger>
        <Body2>Body2</Body2>
        <Caption1>Caption1</Caption1>
        <Caption1Strong>Caption1Strong</Caption1Strong>
        <Caption1Stronger>Caption1Stronger</Caption1Stronger>
        <Caption2>Caption2</Caption2>
      </div>
    </ControlExample>

    <ControlExample headerText="Text Sizes">
      <div style="display: flex; flex-direction: column; gap: 4px">
        <Text :size="100">Size 100</Text>
        <Text :size="200">Size 200</Text>
        <Text :size="300">Size 300</Text>
        <Text :size="400">Size 400</Text>
        <Text :size="500">Size 500</Text>
        <Text :size="600">Size 600</Text>
        <Text :size="700">Size 700</Text>
        <Text :size="800">Size 800</Text>
        <Text :size="900">Size 900</Text>
        <Text :size="1000">Size 1000</Text>
      </div>
    </ControlExample>

    <ControlExample headerText="Text Weights">
      <Text weight="regular">Regular </Text>
      <Text weight="medium">Medium </Text>
      <Text weight="semibold">Semibold </Text>
      <Text weight="bold">Bold</Text>
    </ControlExample>

    <ControlExample headerText="Text Styling">
      <Text italic>Italic text</Text>
      <Text underline>Underlined text</Text>
      <Text strikethrough>Strikethrough text</Text>
    </ControlExample>

    <ControlExample headerText="Text Truncation">
      <div
        style="
          width: 200px;
          border: 1px dashed var(--colorNeutralStroke2);
          padding: 4px;
        "
      >
        <Text truncate block
          >This is a very long text that should be truncated when it overflows
          the container width.</Text
        >
      </div>
    </ControlExample>

    <ControlExample headerText="Text Alignment">
      <div style="width: 100%; display: flex; flex-direction: column; gap: 4px">
        <Text block align="start">Aligned to start</Text>
        <Text block align="center">Aligned to center</Text>
        <Text block align="end">Aligned to end</Text>
        <Text block align="justify"
          >Justified text spreads evenly across the full width of the
          line.</Text
        >
      </div>
    </ControlExample>

    <ControlExample headerText="Text Font">
      <Text font="base">Base font</Text>
      <Text font="monospace">Monospace font</Text>
      <Text font="numeric">Numeric font: 1234567890</Text>
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
