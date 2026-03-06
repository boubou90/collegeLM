declare module 'aos' {
  export interface AosOptions {
    duration?: number;
    once?: boolean;
    offset?: number;
    easing?: string;
    delay?: number;
    anchor?: string;
    anchorPlacement?: string;
  }

  export function init(options?: AosOptions): void;
  export function refresh(): void;
  export function refreshHard(): void;
}
