import { useEffect, useState } from "react";

const useActiveSection = (sectionIds) => {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el) => el !== null);

        if (!sections.length) {
            return;
        }

        const handleIntersection = (entries) => {
            const visibleSections = entries.filter(entry => entry.isIntersecting);
            if (visibleSections.length) {
                const topSection = visibleSections.reduce((prev, current) =>
                    prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
                );
                setActiveSection(topSection.target.id);
            }
        };

        const observerOptions = (id) => ({
            root: null,
            rootMargin: "0px",
            threshold: id === "project" ? 0.3 : 1.0,
        });

        const observers = sections.map((section) => {
            const observer = new IntersectionObserver(handleIntersection, observerOptions(section.id));
            observer.observe(section);
            return observer;
        });

        return () => {
            observers.forEach((observer, index) => observer.unobserve(sections[index]));
        };
    }, [sectionIds]);

    useEffect(() => {
    }, [activeSection]);

    return activeSection;
};

export default useActiveSection;