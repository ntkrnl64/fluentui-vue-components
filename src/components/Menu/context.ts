import type { InjectionKey, Ref, ComputedRef } from "vue";
import type { PositioningShorthand } from "../../composables/usePositioning";

export interface MenuContext {
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  position: ComputedRef<PositioningShorthand>;
  hasIcons: Ref<boolean>;
  hasCheckmarks: Ref<boolean>;
  checkedValues: Ref<Record<string, string[]>>;
  onCheckedValueChange: (name: string, value: string) => void;
}

export const MenuContextKey: InjectionKey<MenuContext> = Symbol("MenuContext");
