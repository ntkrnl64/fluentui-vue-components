import type { InjectionKey, Ref } from "vue";

export interface TeachingPopoverContext {
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  triggerRef: Ref<HTMLElement | null>;
  contentRef: Ref<HTMLElement | null>;
  contentStyles: Ref<Record<string, string>>;
  currentPage: Ref<number>;
  totalPages: Ref<number>;
  nextPage: () => void;
  prevPage: () => void;
}

export const TeachingPopoverContextKey: InjectionKey<TeachingPopoverContext> =
  Symbol("TeachingPopoverContext");
