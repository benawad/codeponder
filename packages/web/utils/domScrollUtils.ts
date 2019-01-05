export function isScrolledIntoView(elm: HTMLElement | null) {
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

export function getScrollY() {
  // IE not supporting window.scrollY
  const doc = document.documentElement;
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
}
