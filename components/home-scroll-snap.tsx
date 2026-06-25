"use client";

import { useEffect } from "react";

/**
 * Adds the `snap-home` class to <html> only while the homepage is mounted, so the
 * scroll-snap + amped reveal CSS (see globals.css) applies to the homepage only and
 * never leaks into the blog reader, dashboard, or other routes.
 */
export function HomeScrollSnap() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("snap-home");
    return () => root.classList.remove("snap-home");
  }, []);

  return null;
}
