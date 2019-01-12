import { useEffect, useRef } from "react";
import { useInputValue } from "../utils/useInputValue";

interface TreeElement extends HTMLElement {
  parentNode: TreeElement;
  childNodes: NodeListOf<TreeElement>;
  classList: DOMTokenList;
  nextSibling: TreeElement;
}

interface startReturnValue {
  start: number;
  startingLineNumChange: (e: any) => void;
  startInput: React.RefObject<HTMLInputElement>;
}

interface endReturnValue {
  end: number;
  endingLineNumChange: (e: any) => void;
  endInput: React.RefObject<HTMLInputElement>;
}

const getHoveredLine = ({ target: elm, currentTarget: parent, type }: any) => {
  let isOverLine = false;
  while (elm && elm != parent && !elm.classList.contains("token-line")) {
    elm = elm.parentNode || null;
  }
  if (elm && parent) {
    isOverLine = type == "mouseover" && elm.classList.contains("token-line");
  }
  return isOverLine ? +elm.childNodes[0].dataset.lineNumber : null;
};

export const cleanSelectedLines = (
  parentElm = document.querySelector(".code-content")
) => {
  parentElm!
    .querySelectorAll(".is-selected")
    .forEach(elm => elm.classList.remove("is-selected"));
};

export const useSelectedLines = (
  startingLineNum: number | undefined,
  endingLineNum: number,
  view: string
): [startReturnValue, endReturnValue] => {
  const parentElm = document.querySelector(".code-content");
  const startInput = useRef<HTMLInputElement>(null);
  const endInput = useRef<HTMLInputElement>(null);
  const [start, startingLineNumChange] = useInputValue(
    startingLineNum || endingLineNum
  );
  const [end, endingLineNumChange] = useInputValue(endingLineNum);

  const applyEffect = view == "in-code";
  // listening to mouse move when start input is focused
  useEffect(() => {
    const input = startInput.current;
    if (!applyEffect || !input || !parentElm) {
      return;
    }

    const onMouseOverOrOut = (e: any) => {
      const startVal = +input.value;
      const endVal = +endInput.current!.value;
      const hoveredLine = getHoveredLine(e);
      if (hoveredLine && hoveredLine != startVal && hoveredLine <= endVal) {
        startingLineNumChange({ currentTarget: { value: hoveredLine } });
      }
    };
    const onFocus = () => {
      parentElm.classList.add("js-select-line");
      input.addEventListener("blur", onBlur);
      parentElm.addEventListener("mouseout", onMouseOverOrOut);
      parentElm.addEventListener("mouseover", onMouseOverOrOut);
    };
    const onBlur = () => {
      parentElm.classList.remove("js-select-line");
      input.removeEventListener("blur", onBlur);
      parentElm.removeEventListener("mouseout", onMouseOverOrOut);
      parentElm.removeEventListener("mouseover", onMouseOverOrOut);
    };

    input.addEventListener("focus", onFocus);
    return () => {
      input.removeEventListener("focus", onFocus);
      onBlur();
    };
  }, []);

  // Styles lines between start - end when start field change
  useEffect(
    () => {
      const input = startInput.current;
      if (!applyEffect || !input || !parentElm) {
        return;
      }

      const currentLine = input.validity.valid ? input.value : end;
      let numberElm = parentElm.querySelector(
        `[data-line-number="${currentLine}"]`
      ) as TreeElement;
      if (numberElm && currentLine <= end) {
        cleanSelectedLines(parentElm);
        while (numberElm && Number(numberElm.dataset.lineNumber) <= end) {
          numberElm.parentNode.classList.add("is-selected");
          numberElm = numberElm.parentNode.nextSibling.childNodes[0];
        }
      }
    },
    [start]
  );

  return [
    { start, startingLineNumChange, startInput },
    { end, endingLineNumChange, endInput },
  ];
};
