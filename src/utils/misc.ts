/**
 * A "no-operation" function, which does nothing.
 *
 * Explanation: https://www.noop.com.au/noop-meaning/
 *
 * @param args - any arguments passed to the function
 * @returns void (nothing)
 */
export const noop = (...args: any[]): any => void 0;

/**
 * Get random color as string.
 */
export const randomColor = (start = 200, end = 250) => {
  return `hsl(${start + end * Math.random()}, 80%, 90%)`;
};
