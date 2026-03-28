import type { InjectionKey } from "vue";
import type { TabsterCore } from "tabster";

export const TabsterKey: InjectionKey<TabsterCore> = Symbol("Tabster");
