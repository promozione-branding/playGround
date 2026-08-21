"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Disable Lenis in admin panel (/admin) or mobile & tablet viewports to prevent scroll trapping
    const isAdminPath = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
    const isMobileViewport = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    if (isAdminPath || isMobileViewport) return;

    let lenisInstance: any;
    let rafId: number;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.5,
        prevent: (node: HTMLElement) => {
          return (
            node.classList?.contains("jodit-wysiwyg") ||
            node.classList?.contains("jodit-workarea") ||
            node.classList?.contains("jodit-container") ||
            node.closest?.(".jodit-container") !== null ||
            node.hasAttribute("data-lenis-prevent")
          );
        },
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
