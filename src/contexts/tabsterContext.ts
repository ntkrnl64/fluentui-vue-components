import type { InjectionKey } from "vue";
import type { Types } from "tabster";
type TabsterCore = Types.TabsterCore;

export const TabsterKey: InjectionKey<TabsterCore> = Symbol("Tabster");
