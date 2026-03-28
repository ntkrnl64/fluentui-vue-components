<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  headerText: string;
  codeSnippet?: string;
}>();

const showCode = ref(false);
</script>

<template>
  <div class="control-example">
    <div class="control-example__header">
      <span class="control-example__title">{{ headerText }}</span>
    </div>
    <div class="control-example__body">
      <div class="control-example__demo">
        <slot />
      </div>
      <div v-if="$slots.options" class="control-example__options">
        <span class="control-example__options-title">Options</span>
        <slot name="options" />
      </div>
    </div>
    <div v-if="$slots.output" class="control-example__output">
      <span class="control-example__output-label">Output:</span>
      <slot name="output" />
    </div>
    <div v-if="codeSnippet" class="control-example__code-toggle">
      <button class="control-example__code-btn" @click="showCode = !showCode">
        {{ showCode ? "Hide" : "Show" }} Code
      </button>
    </div>
    <div v-if="showCode && codeSnippet" class="control-example__code">
      <pre><code>{{ codeSnippet }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.control-example {
  background: var(--colorNeutralBackground1);
  border: 1px solid var(--colorNeutralStroke2);
  border-radius: var(--borderRadiusXLarge);
  margin-bottom: 16px;
  overflow: hidden;
}
.control-example__header {
  padding: 16px 24px 0;
}
.control-example__title {
  font-size: var(--fontSizeBase400);
  font-weight: var(--fontWeightSemibold);
  color: var(--colorNeutralForeground1);
}
.control-example__body {
  display: flex;
  gap: 24px;
  padding: 20px 24px;
  align-items: flex-start;
}
.control-example__demo {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.control-example__options {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: var(--colorNeutralBackground3);
  border-radius: var(--borderRadiusMedium);
}
.control-example__options-title {
  font-size: var(--fontSizeBase200);
  font-weight: var(--fontWeightSemibold);
  color: var(--colorNeutralForeground2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.control-example__output {
  padding: 12px 24px;
  border-top: 1px solid var(--colorNeutralStroke2);
  font-size: var(--fontSizeBase200);
  color: var(--colorNeutralForeground2);
  display: flex;
  align-items: center;
  gap: 8px;
}
.control-example__output-label {
  font-weight: var(--fontWeightSemibold);
}
.control-example__code-toggle {
  padding: 0 24px 8px;
  border-top: 1px solid var(--colorNeutralStroke2);
  padding-top: 8px;
}
.control-example__code-btn {
  background: none;
  border: none;
  color: var(--colorBrandForegroundLink);
  cursor: pointer;
  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase200);
  padding: 4px 0;
}
.control-example__code-btn:hover {
  text-decoration: underline;
}
.control-example__code {
  padding: 0 24px 16px;
}
.control-example__code pre {
  background: var(--colorNeutralBackground3);
  border-radius: var(--borderRadiusMedium);
  padding: 16px;
  overflow-x: auto;
  margin: 0;
  font-family: var(--fontFamilyMonospace);
  font-size: var(--fontSizeBase200);
  color: var(--colorNeutralForeground1);
}
@media (max-width: 768px) {
  .control-example__body {
    flex-direction: column;
  }
  .control-example__options {
    min-width: unset;
    width: 100%;
  }
}
</style>
