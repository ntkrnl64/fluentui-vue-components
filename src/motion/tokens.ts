/** Duration tokens in milliseconds */
export const durations = {
  ultraFast: 50,
  faster: 100,
  fast: 150,
  normal: 200,
  gentle: 250,
  slow: 300,
  slower: 400,
  ultraSlow: 500,
} as const;

/** Easing curve tokens */
export const curves = {
  accelerateMax: "cubic-bezier(1, 0, 1, 1)",
  accelerateMid: "cubic-bezier(0.7, 0, 1, 0.5)",
  accelerateMin: "cubic-bezier(0.8, 0, 1, 1)",
  decelerateMax: "cubic-bezier(0, 0, 0, 1)",
  decelerateMid: "cubic-bezier(0.1, 0.9, 0.2, 1)",
  decelerateMin: "cubic-bezier(0.33, 0, 0.1, 1)",
  easyEaseMax: "cubic-bezier(0.8, 0, 0.1, 1)",
  easyEase: "cubic-bezier(0.33, 0, 0.67, 1)",
  linear: "cubic-bezier(0, 0, 1, 1)",
} as const;

export type Duration = keyof typeof durations;
export type Curve = keyof typeof curves;
