import { FC, MutableRefObject, RefObject, useEffect, useRef } from "react";

interface Props {
  onIntersection: () => void;
  config?: Omit<IntersectionObserverInit, "root">;
  root?: RefObject<HTMLElement>;
}

const IntersectionObserverComponent: FC<Props> = ({
  onIntersection,
  config = {},
  root,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { rootMargin, threshold } = config;
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.some((entry) => {
          entry.isIntersecting && onIntersection();
        });
      },
      {
        rootMargin,
        threshold,
        root: root?.current,
      }
    );

    io.observe(ref.current!);

    return () => io.disconnect();
  }, [onIntersection, rootMargin, threshold, root]);

  return <div ref={ref} />;
};

export default IntersectionObserverComponent;
