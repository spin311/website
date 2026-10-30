import { useLayoutEffect, useState } from "react";

// A section becomes active once its top edge scrolls above this fraction of the viewport.
const ACTIVATION_LINE_RATIO = 0.4;
// Slack for sub-pixel scroll positions when checking whether the page is scrolled to the bottom.
const BOTTOM_TOLERANCE_PX = 2;

// Sections must be in page order. Unlike an intersection threshold, this works for
// sections taller than the viewport, and the last section still wins at the bottom of
// the page even when it is too short to reach the activation line.
const findActiveSection = (sections: HTMLElement[]) => {
  const { scrollHeight } = document.documentElement;
  const isScrollable = scrollHeight > window.innerHeight + BOTTOM_TOLERANCE_PX;
  const isAtBottom =
    window.innerHeight + window.scrollY >= scrollHeight - BOTTOM_TOLERANCE_PX;
  if (isScrollable && isAtBottom) {
    return sections[sections.length - 1].id;
  }

  const activationLine = window.innerHeight * ACTIVATION_LINE_RATIO;
  const passedSections = sections.filter(
    (section) => section.getBoundingClientRect().top <= activationLine,
  );
  return (passedSections[passedSections.length - 1] ?? sections[0]).id;
};

const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState("");
  // Callers build a new array on every render, so key the effect on its contents.
  const idsKey = sectionIds.join(",");

  // Layout effect so the first paint already shows the active section.
  useLayoutEffect(() => {
    const sections = idsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) {
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      setActiveSection(findActiveSection(sections));
    };
    const scheduleUpdate = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    // Late images and fetched project data move sections without firing a scroll event.
    const layoutObserver = new ResizeObserver(scheduleUpdate);

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    layoutObserver.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      layoutObserver.disconnect();
    };
  }, [idsKey]);

  return activeSection;
};

export default useActiveSection;
