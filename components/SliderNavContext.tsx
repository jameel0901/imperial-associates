"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SliderNavContextValue = {
  /** True while the home image slider intersects the viewport — navbar is hidden. */
  sliderInView: boolean;
  setSliderInView: (value: boolean) => void;
};

const SliderNavContext = createContext<SliderNavContextValue | null>(null);

export function SliderNavProvider({ children }: { children: ReactNode }) {
  const [sliderInView, setSliderInViewState] = useState(true);

  const setSliderInView = useCallback((value: boolean) => {
    setSliderInViewState(value);
  }, []);

  const value = useMemo(
    () => ({
      sliderInView,
      setSliderInView,
    }),
    [sliderInView, setSliderInView]
  );

  return <SliderNavContext.Provider value={value}>{children}</SliderNavContext.Provider>;
}

export function useSliderNav() {
  const ctx = useContext(SliderNavContext);
  if (!ctx) {
    throw new Error("useSliderNav must be used within SliderNavProvider");
  }
  return ctx;
}
