import { useState, useEffect } from "react";
import ga from "../modules/ga";

export default function useTrackPageViews(pathname: string) {
  const [initialPageView, setInitialPageView] = useState(true);

  useEffect(() => {
    if (!initialPageView) {
      ga("send", "pageview", pathname);
    }
    setInitialPageView(false);
  }, [pathname]);
}
