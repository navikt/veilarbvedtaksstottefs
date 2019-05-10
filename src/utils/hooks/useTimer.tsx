import React, { useEffect, useRef, DependencyList } from 'react';

export function useTimer(handler: () => void, timeout: number, deps: DependencyList) {
    const timer = useRef<number | undefined>();
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (!timer.current) {
                timer.current = window.setTimeout(handler, timeout);
            }
            return () => {
                clearTimeout(timer.current);
                timer.current = undefined;
            };
        }
    }, deps);

}