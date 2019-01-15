import { useEffect, useState } from "react";

export const useTransitionend = (
  ref: React.RefObject<HTMLDivElement>,
  state: boolean,
  initialState: boolean,
  propertyName: string = "max-height",
  className: string = "is-open"
) => {
  const [isOpen, setIsOpen] = useState(initialState);
  useEffect(
    () => {
      const elm = ref.current!;
      const transitionend = (event: any) => {
        if (event.propertyName != propertyName) {
          return;
        }
        elm && elm.removeEventListener("transitionend", transitionend);
        setIsOpen(val => !val);
      };
      if (elm) {
        elm.addEventListener("transitionend", transitionend);
        elm.classList.toggle(className);
      }
      return () => {
        if (elm) {
          elm.removeEventListener("transitionend", transitionend);
        }
      };
    },
    [state]
  );

  return isOpen;
};
