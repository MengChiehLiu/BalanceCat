import React from "react";
import { useInView, animated } from "@react-spring/web";

import buildInteractionObserverThreshold from "./helper/threshold";

export default function Title({ children }) {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 80,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      rootMargin: "-45% 0px -45% 0px",
      amount: buildInteractionObserverThreshold(),
      // eslint-disable-next-line prettier/prettier
    }
  );

  return (
    <animated.h2 ref={ref} style={springs}>
      {children}
    </animated.h2>
  );
}
