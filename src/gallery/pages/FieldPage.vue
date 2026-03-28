<script setup lang="ts">
import { ref } from "vue";
import { Field, Input, Textarea, Select } from "../../index";
import ControlExample from "../ControlExample.vue";

const name = ref("");
const bio = ref("");
const role = ref("");
</script>

<template>
  <div class="page">
    <h1>Field</h1>
    <p>A field adds a label, validation message, and hint to form controls.</p>

    <ControlExample headerText="Field with Input">
      <div
        style="
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        "
      >
        <Field label="Full Name">
          <Input v-model="name" placeholder="Enter your name" />
        </Field>
        <Field label="Email" required>
          <Input type="email" placeholder="email@example.com" />
        </Field>
      </div>
    </ControlExample>

    <ControlExample headerText="Field with Textarea">
      <div style="width: 100%; max-width: 400px">
        <Field label="Biography" hint="Tell us about yourself">
          <Textarea
            v-model="bio"
            placeholder="Write something..."
            resize="vertical"
          />
        </Field>
      </div>
    </ControlExample>

    <ControlExample headerText="Field with Select">
      <div style="width: 100%; max-width: 400px">
        <Field label="Role">
          <Select v-model="role">
            <option value="">Choose a role...</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </Select>
        </Field>
      </div>
    </ControlExample>

    <ControlExample headerText="Validation States">
      <div
        style="
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        "
      >
        <Field
          label="Success"
          validationState="success"
          validationMessage="Looks good!"
        >
          <Input modelValue="Valid input" />
        </Field>
        <Field
          label="Warning"
          validationState="warning"
          validationMessage="This might cause issues."
        >
          <Input modelValue="Questionable input" />
        </Field>
        <Field
          label="Error"
          validationState="error"
          validationMessage="This field is required."
        >
          <Input modelValue="" placeholder="Required field" />
        </Field>
      </div>
    </ControlExample>

    <ControlExample headerText="Field Sizes">
      <div
        style="
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        "
      >
        <Field label="Small" size="small">
          <Input size="small" placeholder="Small field" />
        </Field>
        <Field label="Medium" size="medium">
          <Input size="medium" placeholder="Medium field" />
        </Field>
        <Field label="Large" size="large">
          <Input size="large" placeholder="Large field" />
        </Field>
      </div>
    </ControlExample>

    <ControlExample headerText="Horizontal Orientation">
      <div
        style="
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        "
      >
        <Field label="Username" orientation="horizontal">
          <Input placeholder="Enter username" />
        </Field>
        <Field label="Password" orientation="horizontal">
          <Input type="password" placeholder="Enter password" />
        </Field>
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
