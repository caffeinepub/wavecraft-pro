/**
 * Truncates a principal ID for display in the UI
 */
export function truncatePrincipal(principal: string): string {
  if (principal.length <= 12) {
    return principal;
  }
  return `${principal.slice(0, 6)}...${principal.slice(-4)}`;
}

/**
 * Formats BPM value for display
 */
export function formatBPM(bpm: bigint | number): string {
  return `${bpm.toString()} BPM`;
}
