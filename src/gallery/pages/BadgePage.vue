<script setup lang="ts">
import { ref } from "vue";
import { Badge, CounterBadge, PresenceBadge } from "../../index";
import ControlExample from "../ControlExample.vue";

const count = ref(5);
</script>

<template>
  <div class="page">
    <h1>Badge</h1>
    <p>Badges are visual indicators for UI elements.</p>

    <ControlExample headerText="Badge Appearances">
      <Badge appearance="filled">Filled</Badge>
      <Badge appearance="ghost">Ghost</Badge>
      <Badge appearance="outline">Outline</Badge>
      <Badge appearance="tint">Tint</Badge>
    </ControlExample>

    <ControlExample headerText="Badge Colors">
      <Badge color="brand">Brand</Badge>
      <Badge color="danger">Danger</Badge>
      <Badge color="important">Important</Badge>
      <Badge color="informative">Informative</Badge>
      <Badge color="severe">Severe</Badge>
      <Badge color="subtle">Subtle</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
    </ControlExample>

    <ControlExample headerText="Badge Sizes">
      <Badge size="tiny" />
      <Badge size="extra-small" />
      <Badge size="small" />
      <Badge size="medium">M</Badge>
      <Badge size="large">Large</Badge>
      <Badge size="extra-large">XL</Badge>
    </ControlExample>

    <ControlExample headerText="Badge Shapes">
      <Badge shape="circular">1</Badge>
      <Badge shape="rounded">Rounded</Badge>
      <Badge shape="square">Sq</Badge>
    </ControlExample>

    <ControlExample headerText="CounterBadge">
      <CounterBadge :count="count" />
      <CounterBadge :count="150" :overflowCount="99" />
      <CounterBadge :count="0" :showZero="true" />
      <CounterBadge :count="0" />
      <CounterBadge dot />
      <template #options>
        <label>
          Count:
          <input
            type="number"
            v-model.number="count"
            min="0"
            max="200"
            style="width: 60px"
          />
        </label>
      </template>
      <template #output>
        <span>Count: {{ count }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="PresenceBadge">
      <div style="display: flex; align-items: center; gap: 16px">
        <div style="text-align: center">
          <PresenceBadge status="available" /><br /><small>Available</small>
        </div>
        <div style="text-align: center">
          <PresenceBadge status="away" /><br /><small>Away</small>
        </div>
        <div style="text-align: center">
          <PresenceBadge status="busy" /><br /><small>Busy</small>
        </div>
        <div style="text-align: center">
          <PresenceBadge status="do-not-disturb" /><br /><small>DND</small>
        </div>
        <div style="text-align: center">
          <PresenceBadge status="offline" /><br /><small>Offline</small>
        </div>
        <div style="text-align: center">
          <PresenceBadge status="out-of-office" /><br /><small>OOO</small>
        </div>
        <div style="text-align: center">
          <PresenceBadge status="unknown" /><br /><small>Unknown</small>
        </div>
        <div style="text-align: center">
          <PresenceBadge status="blocked" /><br /><small>Blocked</small>
        </div>
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
