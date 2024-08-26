import { PopoverPopupProps } from "../types";

const getPositionWithArrow = ({ placement }: PopoverPopupProps) => {
  switch (placement) {
    case "top":
      return `shadow-[0_0.4rem_1.6rem_rgba(176,188,200,0.5)] after:-translate-x-2/4 after:left-2/4 after:top-full`;
    case "top-start":
      return `shadow-[0_0.4rem_1.6rem_rgba(176,188,200,0.5)] after:left-8 after:top-full`;
    case "top-end":
      return `shadow-[0_0.4rem_1.6rem_rgba(176,188,200,0.5)] after:right-8 after:top-full`;
    case "right":
      return `shadow-[-0.4rem_0_1.6rem_rgba(176,188,200,0.5)] after:-translate-y-2/4 after:rotate-90 after:right-[calc(100%_-_0.3rem)] after:top-2/4`;
    case "right-start":
      return `shadow-[-0.4rem_0_1.6rem_rgba(176,188,200,0.5)] after:rotate-90 after:right-[calc(100%_-_0.3rem)] after:top-8`;
    case "right-end":
      return `shadow-[-0.4rem_0_1.6rem_rgba(176,188,200,0.5)] after:rotate-90 after:right-[calc(100%_-_0.3rem)] after:bottom-8`;
    case "bottom":
      return `shadow-[0_-0.4rem_1.6rem_rgba(176,188,200,0.5)] after:-translate-x-2/4 after:rotate-180 after:left-2/4 after:bottom-full`;
    case "bottom-start":
      return `shadow-[0_-0.4rem_1.6rem_rgba(176,188,200,0.5)] after:rotate-180 after:left-8 after:bottom-full`;
    case "bottom-end":
      return `shadow-[0_-0.4rem_1.6rem_rgba(176,188,200,0.5)] after:rotate-180 after:right-8 after:bottom-full`;
    case "left":
      return `shadow-[0.4rem_0_1.6rem_rgba(176,188,200,0.5)] after:-translate-y-2/4 after:rotate-[270deg] after:left-[calc(100%_-_0.3rem)] after:top-2/4`;
    case "left-start":
      return `shadow-[0.4rem_0_1.6rem_rgba(176,188,200,0.5)] after:rotate-[270deg] after:left-[calc(100%_-_0.3rem)] after:top-8`;
    case "left-end":
      return `shadow-[0.4rem_0_1.6rem_rgba(176,188,200,0.5)] after:rotate-[270deg] after:left-[calc(100%_-_0.3rem)] after:bottom-8`;
  }
};

export const getStyleWithArrow = (bgColor: string) =>
  `px-8 py-6 rounded-[0.8rem] after:content-[''] after:w-0 after:h-0 after:z-10 after:absolute after:border-x-[0.8rem] after:border-x-transparent after:border-solid after:border-t-[${bgColor}] ${getPositionWithArrow}`;
