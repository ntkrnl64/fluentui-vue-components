import type { InjectionKey, Ref } from "vue";

export const PortalMountNodeKey: InjectionKey<Ref<string | HTMLElement>> =
  Symbol("PortalMountNode");
