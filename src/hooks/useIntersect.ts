import { useEffect, useRef } from "react";

export const useIntersect = (
  onIntersect: () => void,
  options: IntersectionObserverInit = { threshold: 1.0 }
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [onIntersect, options]);

  return ref;
};
