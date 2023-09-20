import { useRef, useEffect } from "react";

export const useObserver = (ref, isLoad, canLoad, cb) => {
    const observer = useRef();
    const delay = 3000;

    useEffect(() => {
        setTimeout(() => {
        if (isLoad) return;
        if (observer.current) observer.current.disconnect();

        const observeCb = (entries, observer) => {
            if (entries[0].isIntersecting && canLoad) {
                cb();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
        };

        observer.current = new IntersectionObserver(observeCb);
        observer.current.observe(ref.current);
    }, delay)
    }, [isLoad]);
};
