import { useState } from "react";
import { useEventListener, useIsomorphicLayoutEffect } from "usehooks-ts";

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEventListener("resize", handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
  }, []);

  return windowSize;
}
export const tablet = 768;
export const desktop = 1024;
export default useWindowSize;
