import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AlertStripeSuksess } from 'nav-frontend-alertstriper';
import './varsel-controller.less';
import { useEventListener } from '../../utils/hooks';

export function VarselController() {
	const theRef = useRef<HTMLDivElement | null>(null);
	const [viser, setViser] = useState(true);
	const [paSiden, setPaSiden] = useState(true);
	const [skalVise, setSkalVise] = useState(false);
	const [offsetTop, setOffsetTop] = useState<number | null>(null);

	useEffect(() => {
		if (theRef.current && !offsetTop) {
			setOffsetTop(theRef.current.offsetTop);
		}
	}, [theRef]);


	useEventListener('scroll', event => {
		if (theRef.current && offsetTop) {
			if (window.scrollY > offsetTop) {
				setPaSiden(false);
			} else {
				setPaSiden(true);
			}
		}
	}, [offsetTop]);

	const vis = useCallback(
		() => setTimeout(() => {
			setSkalVise(true);
		}, 300),
		[]
	);

	const taBort = useCallback(
		() => setTimeout(() => {
			setViser(false);
		}, 700),
		[]
	);

	const skjul = useCallback(
		() => setTimeout(() => {
			setSkalVise(false);
			taBort();
		}, 2000),
		[]
	);

	const className = () => {
		if (skalVise) {
			return 'vis-varsel';
		} else  {
			return 'skjul-varsel';
		}
		return undefined;
	};

	const containerClassName = () => {
		return 'toast' + (paSiden ? '' : ' av-siden');
	};

	useEffect(() => {
		vis()
		skjul();
	}, []);

	if (!viser) {
		return null;
	}
	return (
		<div ref={theRef} className={containerClassName()}>
			<AlertStripeSuksess className={className()}>Varsel</AlertStripeSuksess>
		</div>
	);
}
