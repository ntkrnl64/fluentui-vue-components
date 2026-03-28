import type { InjectionKey, Ref } from "vue";

export interface DialogContext {
  open: Ref<boolean>;
  setOpen: (value: boolean) => void;
  modalType: "modal" | "non-modal" | "alert";
  dialogId: string;
  titleId: string;
}

export const DialogContextKey: InjectionKey<DialogContext> =
  Symbol("DialogContext");
