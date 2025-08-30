export const key = import.meta.env.VITE_API_KEY;

export const headers = {
  accept: "application/json",
  Authorization: `Bearer ${key}`,
};

export function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}
