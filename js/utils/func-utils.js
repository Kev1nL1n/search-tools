export function throttle(fn, interval = 200) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.call(this, ...args);
        }, interval);
    }
}
