import type { InjectionKey } from "vue";

export type SkeletonAnimation = "wave" | "pulse";
export type SkeletonAppearance = "opaque" | "translucent";

export interface SkeletonContext {
  animation?: SkeletonAnimation;
  appearance?: SkeletonAppearance;
}

export const SkeletonContextKey: InjectionKey<SkeletonContext> =
  Symbol("SkeletonContext");
