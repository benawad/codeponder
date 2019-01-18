import { useCallback, useEffect, useRef, useState } from "react";
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
    const name = elm.classList[0];
    if (name && name.match(/CommentBoxContainer/)) {
      break;
    }
    elm = elm.parentNode || null;
  }
  if (elm && parent) {
    isOverLine = type == "mouseover" && elm.classList.contains("token-line");
  }
  return isOverLine ? +elm.childNodes[0].dataset.lineNumber : null;
};

export const cleanSelectedLines = (
  lineNum: number,
  parentElm = document.querySelector(".code-content")
) => {
  parentElm!
    .querySelectorAll(`.is-selected-${lineNum}`)
    .forEach(elm => elm.classList.remove(`is-selected-${lineNum}`));
};

export const useSelectedLines = (
  startingLineNum: number = 0,
  endingLineNum: number = 0,
  view: string
): [startReturnValue, endReturnValue] => {
  const parentElm = document.querySelector(".code-content");
  const startInput = useRef<HTMLInputElement>(null);
  const endInput = useRef<HTMLInputElement>(null);
  const [start, startingLineNumChange] = useState(
    startingLineNum || endingLineNum
  );
  const [end, endingLineNumChange] = useInputValue(endingLineNum);

  const applyEffect = view == "code-view";

  const updateStart = useCallback((val: any) => {
    if (typeof val != "number") {
      const input = val.currentTarget || val.target;
      val = input.validity.valid ? input.value : end;
    }
    startingLineNumChange(prev => {
      updateSelectedLines(+prev, +val);
      return val;
    });
  }, []);

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
        updateStart(hoveredLine);
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
    updateSelectedLines(end + 1, end);
    return () => {
      input.removeEventListener("focus", onFocus);
      onBlur();
    };
  }, []);

  // Styles lines between start - end when start field change
  const updateSelectedLines = useCallback((prev: number, current: number) => {
    if (!applyEffect || !parentElm || current > end) {
      return;
    }

    const first = Math.min(prev, current);
    const last = Math.max(prev, current);
    let numberElm = parentElm.querySelector(
      `[data-line-number="${first}"]`
    ) as TreeElement;
    if (numberElm) {
      while (numberElm && Number(numberElm.dataset.lineNumber) < last) {
        numberElm.parentNode.classList.toggle(
          `is-selected-${end}`,
          current <= prev
        );
        numberElm = numberElm.parentNode.nextSibling.childNodes[0];
      }
    }
  }, []);

  return [
    { start, startingLineNumChange: updateStart, startInput },
    { end, endingLineNumChange, endInput },
  ];
};
