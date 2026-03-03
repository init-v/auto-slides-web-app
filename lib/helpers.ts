export const formatCounter = (index: number, total: number) => {
  const fmt = (value: number) => value.toString().padStart(2, '0');
  return `${fmt(index + 1)} / ${fmt(total)}`;
};

export const isTypingTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
};

export const debounce = <T extends (...args: never[]) => void>(fn: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};
