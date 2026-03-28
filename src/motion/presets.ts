import type { PresenceMotionDefinition } from "./usePresenceMotion";
import { durations, curves } from "./tokens";

export const fadeMotion: PresenceMotionDefinition = {
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: durations.normal,
    easing: curves.easyEase,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: durations.fast,
    easing: curves.accelerateMid,
  },
};

export const fadeSlowMotion: PresenceMotionDefinition = {
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: durations.slow,
    easing: curves.easyEase,
  },
  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: durations.normal,
    easing: curves.accelerateMid,
  },
};

export const scaleMotion: PresenceMotionDefinition = {
  enter: {
    keyframes: [
      { opacity: 0, transform: "scale(0.85)" },
      { opacity: 1, transform: "scale(1)" },
    ],
    duration: durations.normal,
    easing: curves.decelerateMid,
  },
  exit: {
    keyframes: [
      { opacity: 1, transform: "scale(1)" },
      { opacity: 0, transform: "scale(0.85)" },
    ],
    duration: durations.fast,
    easing: curves.accelerateMid,
  },
};

export const slideMotion = (
  direction: "up" | "down" | "left" | "right" = "down",
): PresenceMotionDefinition => {
  const transforms: Record<string, string> = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
  };
  const from = transforms[direction];

  return {
    enter: {
      keyframes: [
        { opacity: 0, transform: from },
        { opacity: 1, transform: "translate(0)" },
      ],
      duration: durations.normal,
      easing: curves.decelerateMid,
    },
    exit: {
      keyframes: [
        { opacity: 1, transform: "translate(0)" },
        { opacity: 0, transform: from },
      ],
      duration: durations.fast,
      easing: curves.accelerateMid,
    },
  };
};

export const collapseMotion = (
  orientation: "vertical" | "horizontal" = "vertical",
): PresenceMotionDefinition => {
  const prop = orientation === "vertical" ? "height" : "width";

  return {
    enter: {
      keyframes: [
        { [prop]: "0px", opacity: 0, overflow: "hidden" },
        {
          [prop]: "var(--fui-collapse-size, auto)",
          opacity: 1,
          overflow: "hidden",
        },
      ],
      duration: durations.normal,
      easing: curves.easyEaseMax,
    },
    exit: {
      keyframes: [
        {
          [prop]: "var(--fui-collapse-size, auto)",
          opacity: 1,
          overflow: "hidden",
        },
        { [prop]: "0px", opacity: 0, overflow: "hidden" },
      ],
      duration: durations.fast,
      easing: curves.easyEaseMax,
    },
  };
};
