/**
 * This callback type is called `clb` and is displayed as a global symbol.
 *
 * @callback callback
 * @param {Object} options
 * @param {number} [options.progress] Target scrolling progress (value between 0 and 1)
 * @param {HTMLElement} [options.el] Target of the scrolling progress
 * @param {Event} [options.event] Scroll event
 *
 */

/**
 * @param {Object} [options]
 * @param {callback} [options.clb] Callback called on each progress change
 * @param {IntersectionObserverEntry} [options.entry] Intersection Observer entry
 * @param {Event} [event] Scroll event
 */
const handleScroll = ({ clb, entry }, event) => {
  const { target } = entry;
  const { top, height } = target.getBoundingClientRect();

  const progress = Math.abs(1 - (top + height) / (window.innerHeight + height));

  clb({ progress, el: target, event });
};

/**
 * @param {Function} clb Element which class will be toggled.
 * @param {IntersectionObserverEntry[]} entries Element which class will be toggled.
 */
const IntersectionCallback = (clb, entries) => {
  entries.forEach((entry) => {
    const bindedFunction = handleScroll.bind(null, { clb, entry });
    const { isIntersecting, target } = entry;

    if (isIntersecting) {
      window.addEventListener("scroll", bindedFunction, false);

      target.removeListener = bindedFunction;

      return;
    }

    return window.removeEventListener("scroll", target.removeListener, false);
  });
};

/**
 * @param {HTMLElement} el Target of the scrolling progress
 * @param {Function} clb Function called on each progress change
 * @returns {IntersectionObserver}
 */
const showScrollProgress = (el, clb) => {
  const bindedCallback = IntersectionCallback.bind(null, clb);

  const observer = new IntersectionObserver(bindedCallback);

  observer.observe(el);

  return observer;
};
export default showScrollProgress;
