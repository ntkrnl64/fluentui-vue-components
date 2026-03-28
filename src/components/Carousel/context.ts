import type { InjectionKey, Ref } from "vue";

export interface CarouselContext {
  activeIndex: Ref<number>;
  totalItems: Ref<number>;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  registerItem: () => number;
}

export const CarouselContextKey: InjectionKey<CarouselContext> =
  Symbol("CarouselContext");
