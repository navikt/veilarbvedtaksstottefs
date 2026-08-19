import { useEffect, useRef, useState } from 'react';

export function useIsAfterFirstRender(): boolean {
	const [isAfterFirstRender, setIsAfterFirstRender] = useState(false);

	useEffect(() => {
		// setState her er tilsiktet - hooken skal nettopp signalisere at et render nummer to har skjedd
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setIsAfterFirstRender(true);
	}, []);

	return isAfterFirstRender;
}

export function useEventListener(name: string, listener: EventListener) {
	const listenerRef = useRef(listener);

	useEffect(() => {
		listenerRef.current = listener;
	});

	useEffect(() => {
		const handler: EventListener = event => listenerRef.current(event);
		window.addEventListener(name, handler);
		return () => window.removeEventListener(name, handler);
	}, [name]);
}
