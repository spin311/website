import { useEffect, useState } from "react";

function useIsMobile(breakpoint = 767) {
  const [isMobile, setisMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);
  return isMobile;
}

export default useIsMobile;
