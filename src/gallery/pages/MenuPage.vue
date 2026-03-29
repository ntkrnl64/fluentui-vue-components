<script setup lang="ts">
import { ref } from "vue";
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItemCheckbox,
  MenuItemRadio,
  Button,
} from "../../index";
import ControlExample from "../ControlExample.vue";

const checkedItems = ref<Record<string, string[]>>({ edit: [] });
const radioSelection = ref<Record<string, string[]>>({ font: ["arial"] });
</script>

<template>
  <div class="page">
    <h1>Menu</h1>
    <p>A menu displays a list of actions or options for the user.</p>

    <ControlExample headerText="Basic Menu">
      <Menu>
        <MenuTrigger>
          <Button>Open Menu</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>New File</MenuItem>
            <MenuItem>Open File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuDivider />
            <MenuItem>Exit</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </ControlExample>

    <ControlExample headerText="Menu with Groups and Headers">
      <Menu>
        <MenuTrigger>
          <Button appearance="primary">Grouped Menu</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Actions</MenuGroupHeader>
              <MenuItem>+ New</MenuItem>
              <MenuItem>Open</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuGroupHeader>Settings</MenuGroupHeader>
              <MenuItem>Preferences</MenuItem>
              <MenuItem>About</MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    </ControlExample>

    <ControlExample headerText="MenuItemCheckbox">
      <Menu v-model:checkedValues="checkedItems">
        <MenuTrigger>
          <Button>Edit Options</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox name="edit" value="bold">Bold</MenuItemCheckbox>
            <MenuItemCheckbox name="edit" value="italic"
              >Italic</MenuItemCheckbox
            >
            <MenuItemCheckbox name="edit" value="underline"
              >Underline</MenuItemCheckbox
            >
          </MenuList>
        </MenuPopover>
      </Menu>
      <template #output>
        <span>Checked: {{ checkedItems.edit?.join(", ") || "(none)" }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="MenuItemRadio">
      <Menu v-model:checkedValues="radioSelection">
        <MenuTrigger>
          <Button>Font Family</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemRadio name="font" value="arial">Arial</MenuItemRadio>
            <MenuItemRadio name="font" value="calibri">Calibri</MenuItemRadio>
            <MenuItemRadio name="font" value="consolas">Consolas</MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>
      <template #output>
        <span>Font: {{ radioSelection.font?.[0] }}</span>
      </template>
    </ControlExample>

    <ControlExample headerText="Menu with Icons">
      <Menu>
        <MenuTrigger>
          <Button>File Menu</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>
              <template #icon><span>+</span></template>
              New
            </MenuItem>
            <MenuItem>
              <template #icon><span>&#x1F4C2;</span></template>
              Open
            </MenuItem>
            <MenuItem>
              <template #icon><span>&#x1F4BE;</span></template>
              Save
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
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
