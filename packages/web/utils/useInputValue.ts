import { useState, useCallback } from "react";

export function useInputValue<T>(initialValue: T): [T, (e: any) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const onChange = useCallback(event => {
    // TODO: needs heavy refactoring
    // dealing with numbers and events as one...
    // it works but it is a bad pattern and ugly code

    /*
     * Probably best to use an object in the args
     * arg: {
     *   eventType: string // can be "number" or "MouseEvent"
     *   eventMouse: MouseEvent
     *   eventNumber: Number
     * }
     * Then we can just have a condition to check the eventType
     * and setValue appropriately
     *
     * This would be more complex but it would "save" the type system
     *
     *  */

    let tempValue: any = null;
    if (typeof event == "number") {
      // maybe event.toString.
      // It works without it as the input element must be converting it?
      tempValue = event;
    } else {
      tempValue = event.currentTarget.value;
    }
    // react hooks outside of conditions?
    setValue(tempValue);
  }, []);

  return [value, onChange];
}
