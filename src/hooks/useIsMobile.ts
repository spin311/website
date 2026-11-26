import { useCallback, useSyncExternalStore } from "react";

function subscribeToResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
  };
}

/** The server and the hydrating client both see a desktop width; React then re-renders. */
function getServerSnapshot() {
  return false;
}

function useIsMobile(breakpoint = 767) {
  const getSnapshot = useCallback(
    () => window.innerWidth <= breakpoint,
    [breakpoint],
  );
  return useSyncExternalStore(
    subscribeToResize,
    getSnapshot,
    getServerSnapshot,
  );
}

export default useIsMobile;
