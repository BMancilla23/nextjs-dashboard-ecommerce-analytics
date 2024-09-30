"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const NprogressBarProvider = () => {
  return (
    <ProgressBar
      height="4px"
      color="#7C3AED"
      options={{
        showSpinner: false,
      }}
      shallowRouting
    />
  );
};
