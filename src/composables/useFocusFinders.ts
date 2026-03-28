import { FOCUSABLE_SELECTOR } from "tabster";

const FALLBACK_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const selector = FOCUSABLE_SELECTOR ?? FALLBACK_SELECTOR;

/**
 * Provides utilities to find focusable elements within a container.
 */
export function useFocusFinders() {
  function findFirstFocusable(container: HTMLElement): HTMLElement | null {
    return container.querySelector<HTMLElement>(selector);
  }

  function findLastFocusable(container: HTMLElement): HTMLElement | null {
    const all = container.querySelectorAll<HTMLElement>(selector);
    return all[all.length - 1] ?? null;
  }

  function findAllFocusable(container: HTMLElement): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(selector));
  }

  return { findFirstFocusable, findLastFocusable, findAllFocusable };
}
