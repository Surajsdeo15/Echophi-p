/**
 * JS media-query helpers — values must match --bp-* in src/styles/tokens.css
 */
export const BP = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const MQ = {
  smUp: `(min-width: ${BP.sm}px)`,
  mdUp: `(min-width: ${BP.md}px)`,
  lgUp: `(min-width: ${BP.lg}px)`,
  xlUp: `(min-width: ${BP.xl}px)`,
  belowMd: `(max-width: ${BP.md - 1}px)`,
  belowLg: `(max-width: ${BP.lg - 1}px)`,
} as const;
