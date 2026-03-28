<script setup lang="ts">
import { ref } from "vue";
import { TabList, Tab } from "../../index";
import ControlExample from "../ControlExample.vue";

const selectedTab = ref("tab1");
const verticalTab = ref("v1");
</script>

<template>
  <div class="page">
    <h1>TabList</h1>
    <p>A tablist enables navigation between related sections of content.</p>

    <ControlExample headerText="Horizontal Tabs">
      <div style="width: 100%">
        <TabList v-model:selectedValue="selectedTab">
          <Tab value="tab1">First Tab</Tab>
          <Tab value="tab2">Second Tab</Tab>
          <Tab value="tab3">Third Tab</Tab>
        </TabList>
        <div
          style="
            padding: 16px;
            border: 1px solid var(--colorNeutralStroke2);
            border-top: none;
            border-radius: 0 0 var(--borderRadiusMedium)
              var(--borderRadiusMedium);
          "
        >
          <p v-if="selectedTab === 'tab1'">Content for the first tab.</p>
          <p v-else-if="selectedTab === 'tab2'">Content for the second tab.</p>
          <p v-else>Content for the third tab.</p>
        </div>
      </div>
      <template #output>
        <span>Selected: {{ selectedTab }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Vertical Tabs">
      <div style="display: flex; width: 100%">
        <TabList v-model:selectedValue="verticalTab" vertical>
          <Tab value="v1">Tab A</Tab>
          <Tab value="v2">Tab B</Tab>
          <Tab value="v3">Tab C</Tab>
        </TabList>
        <div
          style="
            padding: 16px;
            flex: 1;
            border: 1px solid var(--colorNeutralStroke2);
            border-radius: 0 var(--borderRadiusMedium) var(--borderRadiusMedium)
              0;
          "
        >
          <p v-if="verticalTab === 'v1'">Panel A content</p>
          <p v-else-if="verticalTab === 'v2'">Panel B content</p>
          <p v-else>Panel C content</p>
        </div>
      </div>
    </ControlExample>

    <ControlExample headerText="Tab Sizes">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 16px"
      >
        <TabList size="small">
          <Tab value="s1">Small 1</Tab>
          <Tab value="s2">Small 2</Tab>
          <Tab value="s3">Small 3</Tab>
        </TabList>
        <TabList size="medium">
          <Tab value="m1">Medium 1</Tab>
          <Tab value="m2">Medium 2</Tab>
          <Tab value="m3">Medium 3</Tab>
        </TabList>
        <TabList size="large">
          <Tab value="l1">Large 1</Tab>
          <Tab value="l2">Large 2</Tab>
          <Tab value="l3">Large 3</Tab>
        </TabList>
      </div>
    </ControlExample>

    <ControlExample headerText="Tab Appearances">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 16px"
      >
        <TabList appearance="transparent">
          <Tab value="t1">Transparent 1</Tab>
          <Tab value="t2">Transparent 2</Tab>
        </TabList>
        <TabList appearance="subtle">
          <Tab value="s1">Subtle 1</Tab>
          <Tab value="s2">Subtle 2</Tab>
        </TabList>
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
