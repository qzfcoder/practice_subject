function debounce(fn, delay, immediate) {
  let timer;
  let isFlag = false;
  return function (...args) {
    if (immediate && !isFlag) {
      fn.apply(this, args);
      isFlag = true;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      isFlag = true;
    }, delay);
  };
}
