import { useEffect, useRef } from 'react';

export function useConst<T>(value: T): T {
	const ref = useRef(value);
	return ref.current;
}

export function useIsAfterFirstRender(): boolean {
	const hasRenderedOnce = useRef(false);

	useEffect(() => {
		if (!hasRenderedOnce.current) {
			hasRenderedOnce.current = true;
		}
	});

	return hasRenderedOnce.current;
}
