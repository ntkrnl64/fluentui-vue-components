let counter = 0;

/**
 * Generates a unique ID with an optional prefix.
 * Unlike React's useId, Vue doesn't need SSR-safe IDs from a composable,
 * so this is a simple counter-based approach.
 */
export function useId(prefix = "fui-"): string {
  return `${prefix}${++counter}`;
}
