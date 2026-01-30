/**
 * Centralized route configuration
 * This ensures consistent NAIC route detection across the application
 */

/**
 * Determines if a given path is a NAIC route
 * @param path - The pathname to check
 * @returns true if the path is a NAIC route
 */
export const isNaicRoute = (path: string): boolean => {
  return path.startsWith('/naic');
};
