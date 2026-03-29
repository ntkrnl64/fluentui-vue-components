import type { InjectionKey, Ref, ComputedRef } from "vue";
import type { PositioningShorthand } from "../../composables/usePositioning";

export interface PopoverContext {
  open: Ref<boolean> | ComputedRef<boolean>;
  toggleOpen: () => void;
  setOpen: (value: boolean) => void;
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  arrowRef: Ref<HTMLElement | null>;
  position: ComputedRef<PositioningShorthand>;
  offset: ComputedRef<
    number | { mainAxis?: number; crossAxis?: number } | undefined
  >;
  trapFocus: boolean;
  withArrow: boolean;
  inline: boolean;
  openOnContext: boolean;
  contextMousePosition?: Ref<{ x: number; y: number } | null>;
}

export const PopoverContextKey: InjectionKey<PopoverContext> =
  Symbol("PopoverContext");
