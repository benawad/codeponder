export function isScrolledIntoView(
  elm: HTMLElement | null
): {
  isVisible: boolean;
  offsetTop?: number;
  offsetBottom?: number;
} {
  if (!elm) {
    return { isVisible: false };
  }
  const rect = elm.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;

  // Only completely visible elements return true:
  return {
    isVisible: elemTop >= 0 && elemBottom <= window.innerHeight,
    offsetTop: elemTop,
    offsetBottom: elemBottom - window.innerHeight,
  };
}

export function getScrollY(): number {
  // IE not supporting window.scrollY
  const doc = document.documentElement;
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
}

const smoothScroll = (baseY: number, distance: number): void => {
  let start = 0;
  const step = (timestamp: number): void => {
    if (!start) start = timestamp;
    const delta = timestamp - start;
    window.scrollTo(0, baseY + delta);
    if (delta < distance) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

export const scrollToView = (elm: HTMLElement, duration: number): void => {
  let start = 0;
  const baseY = getScrollY();
  const step = (timestamp: number): void => {
    if (!start) start = timestamp;
    const deltaTime = timestamp - start;
    const { offsetBottom = 0 } = isScrolledIntoView(elm);
    if (offsetBottom > 0) {
      const extraOffset = (50 * deltaTime) / duration;
      smoothScroll(baseY, offsetBottom + extraOffset);
    }
    if (deltaTime < duration) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
