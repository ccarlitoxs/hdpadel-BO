import { useState, useEffect, useMemo } from "react";

import { MEDIA_CONFIG } from "./media";

import type { FormFactor } from "./media";

function useResponsiveManager(): FormFactor {
  const [formFactor, setFormFactor] = useState<FormFactor>("desktop");

  useEffect(() => {
    const listener = (): void => {
      const w = document.documentElement.clientWidth;

      for (const [formFactor, [minWidth, maxWidth]] of Object.entries(
        MEDIA_CONFIG
      )) {
        if (w >= minWidth && w <= maxWidth) {
          setFormFactor(formFactor as FormFactor);
        }
      }
    };

    window.addEventListener("resize", listener);

    listener();

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return formFactor;
}

export function useResponsiveMap() {
  const responsive = useResponsiveManager();

  const responsiveMap = useMemo(
    () => ({
      isTablet: responsive === "tablet",
      isDesktop: responsive === "desktop",
      isPhone: responsive === "phone",
    }),
    [responsive]
  );

  return responsiveMap;
}
export default useResponsiveManager;
