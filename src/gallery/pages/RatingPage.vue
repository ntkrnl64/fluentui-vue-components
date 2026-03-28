<script setup lang="ts">
import { ref } from "vue";
import { Rating, RatingDisplay } from "../../index";
import ControlExample from "../ControlExample.vue";

const ratingValue = ref(3);
const brandRating = ref(4);
</script>

<template>
  <div class="page">
    <h1>Rating</h1>
    <p>Rating allows users to provide a star-based rating.</p>

    <ControlExample headerText="Interactive Rating">
      <Rating v-model="ratingValue" />
      <template #output>
        <span>Rating: {{ ratingValue }} / 5</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Rating Sizes">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <Rating size="small" :modelValue="3" />
        <Rating size="medium" :modelValue="3" />
        <Rating size="large" :modelValue="3" />
        <Rating size="extra-large" :modelValue="3" />
      </div>
    </ControlExample>

    <ControlExample headerText="Rating Colors">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <Rating color="marigold" v-model="brandRating" />
        <Rating color="brand" :modelValue="4" />
        <Rating color="neutral" :modelValue="4" />
      </div>
    </ControlExample>

    <ControlExample headerText="Read-Only Rating">
      <Rating readOnly :modelValue="4" />
    </ControlExample>

    <ControlExample headerText="Disabled Rating">
      <Rating disabled :modelValue="2" />
    </ControlExample>

    <ControlExample headerText="RatingDisplay">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <RatingDisplay :value="3.5" />
        <RatingDisplay :value="4.2" :count="128" />
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
