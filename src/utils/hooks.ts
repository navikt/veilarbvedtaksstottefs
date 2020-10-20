import { DependencyList, useCallback, useEffect, useRef } from 'react';

export function useIsAfterFirstRender(): boolean {
	const hasRenderedOnce = useRef(false);

	useEffect(() => {
		if (!hasRenderedOnce.current) {
			hasRenderedOnce.current = true;
		}
	});

	return hasRenderedOnce.current;
}

export function useEventListener(name: string, listener: EventListener, deps?: DependencyList) {
	const callback: any = useCallback(listener, (deps ? deps : []));
	useEffect(() => {
		window.addEventListener(name, callback);
		return () => window.removeEventListener(name, callback);
	}, [callback, name]);
}
