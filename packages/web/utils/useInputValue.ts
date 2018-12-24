import { useState, useCallback } from "react";

export function useInputValue<T>(initialValue: T): [T, (e: any) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = useCallback(event => {
    // TODO: needs heavy refactoring
    // dealing with numbers and events as one...
    // it works but it is a bad pattern and ugly code
    if (typeof event == "number") {
      // maybe event.toString.
      // It works without it as the input must be converting it?
      setValue(event);
    } else {
      setValue(event.currentTarget.value);
    }
  }, []);

  return [value, onChange];
}
