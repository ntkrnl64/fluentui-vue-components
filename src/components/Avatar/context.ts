import type { InjectionKey } from "vue";
import type { AvatarSize } from "./Avatar.vue";

export type AvatarGroupLayout = "spread" | "stack" | "pie";

export interface AvatarGroupContext {
  size: AvatarSize;
  layout: AvatarGroupLayout;
}

export const AvatarGroupContextKey: InjectionKey<AvatarGroupContext> =
  Symbol("AvatarGroupContext");
