<script setup lang="ts">
import {
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  MessageBarActions,
  Button,
} from "../../index";
import ControlExample from "../ControlExample.vue";
</script>

<template>
  <div class="page">
    <h1>MessageBar</h1>
    <p>A message bar communicates important information to the user.</p>

    <ControlExample headerText="MessageBar Intents">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 12px"
      >
        <MessageBar intent="info">
          <MessageBarBody>
            <MessageBarTitle>Info</MessageBarTitle>
            This is an informational message.
          </MessageBarBody>
        </MessageBar>
        <MessageBar intent="success">
          <MessageBarBody>
            <MessageBarTitle>Success</MessageBarTitle>
            Operation completed successfully.
          </MessageBarBody>
        </MessageBar>
        <MessageBar intent="warning">
          <MessageBarBody>
            <MessageBarTitle>Warning</MessageBarTitle>
            Please review before proceeding.
          </MessageBarBody>
        </MessageBar>
        <MessageBar intent="error">
          <MessageBarBody>
            <MessageBarTitle>Error</MessageBarTitle>
            Something went wrong. Please try again.
          </MessageBarBody>
        </MessageBar>
      </div>
    </ControlExample>

    <ControlExample headerText="MessageBar with Actions">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 12px"
      >
        <MessageBar intent="warning">
          <MessageBarBody>
            <MessageBarTitle>Update Available</MessageBarTitle>
            A new version is available.
          </MessageBarBody>
          <MessageBarActions>
            <Button size="small" appearance="primary">Update Now</Button>
            <Button size="small">Later</Button>
          </MessageBarActions>
        </MessageBar>
      </div>
    </ControlExample>

    <ControlExample headerText="MessageBar Shapes">
      <div
        style="width: 100%; display: flex; flex-direction: column; gap: 12px"
      >
        <MessageBar shape="rounded" intent="info">
          <MessageBarBody>Rounded shape (default)</MessageBarBody>
        </MessageBar>
        <MessageBar shape="square" intent="info">
          <MessageBarBody>Square shape</MessageBarBody>
        </MessageBar>
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
