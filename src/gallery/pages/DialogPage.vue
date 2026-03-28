<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "../../index";
import ControlExample from "../ControlExample.vue";

const modalOpen = ref(false);
const alertOpen = ref(false);
const nonModalOpen = ref(false);
</script>

<template>
  <div class="page">
    <h1>Dialog</h1>
    <p>
      A dialog is an overlay that requires user interaction before returning to
      the main content.
    </p>

    <ControlExample headerText="Modal Dialog">
      <Dialog v-model:open="modalOpen" modalType="modal">
        <DialogTrigger>
          <Button appearance="primary">Open Modal Dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Modal Dialog Title</DialogTitle>
            <DialogContent>
              This is a modal dialog. It blocks interaction with the rest of the
              page. You must take an action to dismiss it.
            </DialogContent>
            <DialogActions>
              <Button appearance="primary" @click="modalOpen = false"
                >OK</Button
              >
              <Button @click="modalOpen = false">Cancel</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </ControlExample>

    <ControlExample headerText="Alert Dialog">
      <Dialog v-model:open="alertOpen" modalType="alert">
        <DialogTrigger>
          <Button appearance="primary">Open Alert Dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Alert</DialogTitle>
            <DialogContent>
              This is an alert dialog. It cannot be dismissed by pressing Escape
              or clicking the backdrop. You must use the action buttons.
            </DialogContent>
            <DialogActions>
              <Button appearance="primary" @click="alertOpen = false"
                >Acknowledge</Button
              >
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </ControlExample>

    <ControlExample headerText="Non-Modal Dialog">
      <Dialog v-model:open="nonModalOpen" modalType="non-modal">
        <DialogTrigger>
          <Button>Open Non-Modal Dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Non-Modal Dialog</DialogTitle>
            <DialogContent>
              This is a non-modal dialog. You can still interact with the page
              behind it.
            </DialogContent>
            <DialogActions>
              <Button @click="nonModalOpen = false">Close</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
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
