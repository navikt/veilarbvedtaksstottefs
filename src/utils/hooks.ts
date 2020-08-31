import { useCallback, useEffect, useRef } from 'react';

export function useIsAfterFirstRender(): boolean {
	const hasRenderedOnce = useRef(false);

	useEffect(() => {
		if (!hasRenderedOnce.current) {
			hasRenderedOnce.current = true;
		}
	});

	return hasRenderedOnce.current;
}

export function useEventListener(name: string, listener: EventListener) {
	const callback: any = useCallback(listener, []);
	useEffect(() => {
		window.addEventListener(name, callback);
		return () => window.removeEventListener(name, callback);
	}, [callback, name]);
}