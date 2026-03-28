# fluentui-vue-components

Complete Vue 3 port of [@fluentui/react-components](https://react.fluentui.dev/) (Fluent UI v9).

200+ components, Griffel CSS-in-JS styling, Microsoft design tokens, and a WinUI Gallery-style demo app.

## Overview

This project migrates the entire `@fluentui/react-components` library from React to Vue 3, preserving every component, the same design token system, and Griffel-based atomic CSS styling.

### What's Included

| Category | Components |
|----------|-----------|
| **Basic Input** | Button, CompoundButton, MenuButton, SplitButton, ToggleButton, Checkbox, Input, Textarea, Radio/RadioGroup, Rating, Select, Combobox, Dropdown, Listbox, Slider, SpinButton, Switch, SearchBox |
| **Data Display** | Avatar, AvatarGroup, Badge, CounterBadge, PresenceBadge, Image, Persona, Skeleton, Tag, InteractionTag, TagGroup |
| **Layout** | Card, Divider, Field, Accordion, Tabs |
| **Navigation** | Breadcrumb, Nav, NavDrawer, Tree, List, Toolbar, Overflow |
| **Overlays** | Dialog, Popover, Menu, Tooltip, Drawer, Toast, TeachingPopover |
| **Status** | Spinner, ProgressBar, MessageBar, InfoButton, InfoLabel |
| **Text** | Text + 17 typography presets (Body1, Caption1, Display, Title1, etc.), Label, Link |
| **Specialized** | Table, DataGrid, Carousel, SwatchPicker, ColorPicker, TagPicker |

### Companion Packages

| Package | Description |
|---------|-------------|
| [griffel-vue](../griffel-vue) | Vue 3 adapter for @griffel/core CSS-in-JS |
| [fluentui-vue-icons](../fluentui-vue-icons) | 20,000+ Fluent UI System Icons as Vue components |

## Getting Started

```bash
bun install
bun run dev
```

Open http://localhost:5173 to see the WinUI Gallery-style demo app.

## Usage

```vue
<script setup>
import { FluentProvider, webLightTheme, Button, Input } from 'fluentui-vue-components'
</script>

<template>
  <FluentProvider :theme="webLightTheme">
    <Button appearance="primary">Click me</Button>
    <Input placeholder="Type here..." />
  </FluentProvider>
</template>
```

### Theme Switching

```vue
<script setup>
import { ref, computed } from 'vue'
import { FluentProvider, webLightTheme, webDarkTheme, Button } from 'fluentui-vue-components'

const isDark = ref(false)
const theme = computed(() => isDark.value ? webDarkTheme : webLightTheme)
</script>

<template>
  <FluentProvider :theme="theme">
    <Button @click="isDark = !isDark">Toggle Theme</Button>
    <slot />
  </FluentProvider>
</template>
```

### Available Themes

- `webLightTheme` / `webDarkTheme`
- `teamsLightTheme` / `teamsDarkTheme`
- `teamsHighContrastTheme`
- Custom themes via `createLightTheme()` / `createDarkTheme()`

## Architecture

### Styling

Uses `@griffel/core` (via `griffel-vue`) for atomic CSS-in-JS. Components define styles with `makeStyles()` / `makeResetStyles()` and resolve them with `useStyles()` / `useResetStyles()` composables.

### Theming

`FluentProvider` injects theme tokens as CSS custom properties via `provide()`. All 600+ design tokens from `@fluentui/react-theme` are supported. Teleported content (Dialog, Menu, Toast, etc.) inherits theme from `<body>`.

### Positioning

Popover, Menu, Tooltip, Combobox, and TagPicker use `@floating-ui/vue` for positioning.

### Focus Management

Tabster integration for arrow key navigation, focus trapping (Dialog, Drawer), and focus indicators.

## Project Structure

```
src/
  index.ts              # Barrel exports (200+ components)
  theme/                # FluentProvider, createCSSRuleFromTheme, theme re-exports
  contexts/             # Vue InjectionKeys
  composables/          # useTheme, useId, usePositioning, useFocusVisible, etc.
  motion/               # Animation presets (fade, scale, slide, collapse)
  utils/                # getNativeProps, mergeCallbacks, clamp
  components/           # 51 component directories, 206 Vue files
  gallery/              # WinUI Gallery demo app (30 pages)
```

## Third-Party Notices

See [THIRD_PARTY_LICENSES](./THIRD_PARTY_LICENSES).

## License

GPL-3.0 -- see [LICENSE](./LICENSE).
