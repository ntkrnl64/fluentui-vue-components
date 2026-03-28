import type { InjectionKey } from "vue";

export interface AnnounceContextValue {
  announce: (message: string, options?: { polite?: boolean }) => void;
}

export const AnnounceKey: InjectionKey<AnnounceContextValue> =
  Symbol("Announce");
