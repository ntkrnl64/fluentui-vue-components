<script setup lang="ts">
import { Skeleton, SkeletonItem } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Skeleton</h1>
    <p>Skeleton components are placeholders for content that is loading.</p>

    <ControlExample headerText="Wave Animation (default)">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 12px"
      >
        <Skeleton appearance="opaque">
          <SkeletonItem style="width: 100%; height: 16px" />
          <SkeletonItem style="width: 80%; height: 16px" />
          <SkeletonItem style="width: 60%; height: 16px" />
        </Skeleton>
      </div>
    </ControlExample>

    <ControlExample headerText="Translucent Appearance">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 12px"
      >
        <Skeleton appearance="translucent">
          <SkeletonItem style="width: 100%; height: 16px" />
          <SkeletonItem style="width: 75%; height: 16px" />
        </Skeleton>
      </div>
    </ControlExample>

    <ControlExample headerText="Card-like Skeleton">
      <div style="width: 300px">
        <Skeleton>
          <div
            style="
              display: flex;
              gap: 12px;
              align-items: center;
              margin-bottom: 16px;
            "
          >
            <SkeletonItem
              style="width: 48px; height: 48px; border-radius: 50%"
            />
            <div
              style="flex: 1; display: flex; flex-direction: column; gap: 8px"
            >
              <SkeletonItem style="width: 60%; height: 14px" />
              <SkeletonItem style="width: 40%; height: 12px" />
            </div>
          </div>
          <SkeletonItem
            style="
              width: 100%;
              height: 160px;
              border-radius: var(--borderRadiusMedium);
            "
          />
          <div
            style="
              margin-top: 12px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            "
          >
            <SkeletonItem style="width: 100%; height: 14px" />
            <SkeletonItem style="width: 90%; height: 14px" />
            <SkeletonItem style="width: 70%; height: 14px" />
          </div>
        </Skeleton>
      </div>
    </ControlExample>

    <ControlExample headerText="Different Shapes and Sizes">
      <div style="display: flex; gap: 16px; align-items: center">
        <Skeleton>
          <SkeletonItem style="width: 32px; height: 32px; border-radius: 50%" />
        </Skeleton>
        <Skeleton>
          <SkeletonItem style="width: 48px; height: 48px; border-radius: 50%" />
        </Skeleton>
        <Skeleton>
          <SkeletonItem style="width: 64px; height: 64px; border-radius: 50%" />
        </Skeleton>
        <Skeleton>
          <SkeletonItem style="width: 120px; height: 20px" />
        </Skeleton>
        <Skeleton>
          <SkeletonItem
            style="
              width: 80px;
              height: 36px;
              border-radius: var(--borderRadiusMedium);
            "
          />
        </Skeleton>
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
