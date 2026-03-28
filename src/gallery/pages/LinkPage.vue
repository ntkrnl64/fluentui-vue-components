<script setup lang="ts">
import { Link, Body1 } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Link</h1>
    <p>
      A link is a clickable element that navigates to another page or resource.
    </p>

    <ControlExample headerText="Default Link">
      <Link href="#">Default link</Link>
    </ControlExample>

    <ControlExample headerText="Subtle Link">
      <Link href="#" appearance="subtle">Subtle link</Link>
    </ControlExample>

    <ControlExample headerText="Inline Link">
      <Body1>
        This is a paragraph with an
        <Link href="#" inline>inline link</Link> embedded within the text flow.
        Inline links blend with the surrounding text.
      </Body1>
    </ControlExample>

    <ControlExample headerText="Disabled Link">
      <Link href="#" disabled>Disabled default link</Link>
      <Link href="#" disabled appearance="subtle">Disabled subtle link</Link>
    </ControlExample>

    <ControlExample headerText="Link as Button">
      <Link as="button" @click="() => {}">Link rendered as button</Link>
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
