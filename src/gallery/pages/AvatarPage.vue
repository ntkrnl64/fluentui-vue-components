<script setup lang="ts">
import { Avatar, AvatarGroup, AvatarGroupItem } from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>Avatar</h1>
    <p>
      An avatar represents a person or entity with an image, initials, or icon.
    </p>

    <ControlExample headerText="Avatar with Initials">
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Alex Johnson" />
    </ControlExample>

    <ControlExample headerText="Avatar Sizes">
      <Avatar name="AB" :size="20" />
      <Avatar name="AB" :size="24" />
      <Avatar name="AB" :size="28" />
      <Avatar name="AB" :size="32" />
      <Avatar name="AB" :size="36" />
      <Avatar name="AB" :size="40" />
      <Avatar name="AB" :size="48" />
      <Avatar name="AB" :size="56" />
      <Avatar name="AB" :size="64" />
      <Avatar name="AB" :size="72" />
      <Avatar name="AB" :size="96" />
      <Avatar name="AB" :size="120" />
    </ControlExample>

    <ControlExample headerText="Avatar Shapes">
      <Avatar name="Rounded" shape="circular" :size="48" />
      <Avatar name="Square" shape="square" :size="48" />
    </ControlExample>

    <ControlExample headerText="Avatar Colors">
      <Avatar name="Brand" color="brand" :size="40" />
      <Avatar name="Colorful" color="colorful" :size="40" />
      <Avatar name="DA" color="dark-red" :size="40" />
      <Avatar name="FO" color="forest" :size="40" />
      <Avatar name="NV" color="navy" :size="40" />
    </ControlExample>

    <ControlExample headerText="AvatarGroup - Stack Layout">
      <AvatarGroup layout="stack">
        <AvatarGroupItem name="Alice" />
        <AvatarGroupItem name="Bob" />
        <AvatarGroupItem name="Charlie" />
        <AvatarGroupItem name="Diana" />
        <AvatarGroupItem name="Eve" />
      </AvatarGroup>
    </ControlExample>

    <ControlExample headerText="AvatarGroup - Spread Layout">
      <AvatarGroup layout="spread">
        <AvatarGroupItem name="Frank" />
        <AvatarGroupItem name="Grace" />
        <AvatarGroupItem name="Hank" />
      </AvatarGroup>
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
