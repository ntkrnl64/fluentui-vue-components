/**
 * Merges multiple callback functions into one that calls all of them.
 */
export function mergeCallbacks<Args extends unknown[]>(
  ...callbacks: (undefined | ((...args: Args) => void))[]
): (...args: Args) => void {
  return (...args: Args) => {
    for (const cb of callbacks) {
      cb?.(...args);
    }
  };
}
