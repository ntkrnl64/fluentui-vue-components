<script setup lang="ts">
import { computed } from "vue";
import { useStyles, mergeClasses, makeStyles } from "@ntkrnl64/griffel-vue";
import { tokens } from "@fluentui/react-theme";
import Badge from "./Badge.vue";
import type { BadgeSize } from "./Badge.vue";

export type PresenceStatus =
  | "available"
  | "away"
  | "busy"
  | "do-not-disturb"
  | "offline"
  | "out-of-office"
  | "unknown"
  | "blocked";

export interface PresenceBadgeProps {
  status?: PresenceStatus;
  outOfOffice?: boolean;
  size?: BadgeSize;
}

const props = withDefaults(defineProps<PresenceBadgeProps>(), {
  status: "available",
  outOfOffice: false,
  size: "medium",
});

defineOptions({ inheritAttrs: false });

const usePresenceStyles = makeStyles({
  available: { backgroundColor: tokens.colorPaletteGreenBackground3 },
  away: { backgroundColor: tokens.colorPaletteYellowBackground3 },
  busy: { backgroundColor: tokens.colorPaletteRedBackground3 },
  "do-not-disturb": { backgroundColor: tokens.colorPaletteRedBackground3 },
  offline: { backgroundColor: tokens.colorNeutralForeground3 },
  "out-of-office": { backgroundColor: tokens.colorPaletteBerryBackground3 },
  unknown: { backgroundColor: tokens.colorNeutralForeground3 },
  blocked: { backgroundColor: tokens.colorPaletteRedBackground3 },
});

const styles = useStyles(usePresenceStyles);

const statusLabel = computed(() => {
  const labels: Record<PresenceStatus, string> = {
    available: "Available",
    away: "Away",
    busy: "Busy",
    "do-not-disturb": "Do not disturb",
    offline: "Offline",
    "out-of-office": "Out of office",
    unknown: "Unknown",
    blocked: "Blocked",
  };
  return labels[props.status];
});
</script>

<template>
  <Badge
    :size="size"
    shape="circular"
    appearance="filled"
    :class="mergeClasses('fui-PresenceBadge', styles[status])"
    :aria-label="statusLabel"
    role="img"
    v-bind="$attrs"
  />
</template>
