import React, { useEffect, useState } from 'react';
import UtkastInnhold from './utkast-innhold';
import { DialogInnhold } from './dialog-innhold';
import { useSkjemaStore } from '../../../store/skjema-store';
import Footer from '../../../component/footer/footer';
import './utkast-footer.less';

function calculateScrollBarWidth(): number {
	return document.body.offsetWidth - document.body.clientWidth;
}

function checkIsMaxWidthOrLess(): boolean {
	return document.body.clientWidth <= 1920;
}

export function UtkastFooter() {
	const { kilder, hovedmal, innsatsgruppe, begrunnelse } = useSkjemaStore();

	const [isMaxWidthOrLess, setIsMaxWidthOrLess] = useState(checkIsMaxWidthOrLess);
	const [scrollBarWidth, setScrollBarWidth] = useState(calculateScrollBarWidth());

	const vedtakskjema = { opplysninger: kilder, begrunnelse, innsatsgruppe, hovedmal };

	const footerStyle = isMaxWidthOrLess ? { marginRight: `${scrollBarWidth}px` } : undefined;

	useEffect(() => {
		// Scroll vil ikke fungere lokalt siden vi bruker "height: 100%" på body, men det vil fungere i test/prod
		const handleScrollEvent = () => setScrollBarWidth(calculateScrollBarWidth());
		const handleResizeEvent = () => setIsMaxWidthOrLess(checkIsMaxWidthOrLess());

		window.addEventListener('scroll', handleScrollEvent);
		window.addEventListener('resize', handleResizeEvent);

		return () => {
			window.removeEventListener('scroll', handleScrollEvent);
			window.removeEventListener('resize', handleResizeEvent);
		};
	}, []);

	return (
		<Footer className="utkast-footer">
			<div style={footerStyle} className="utkast-footer__innhold">
				<UtkastInnhold vedtakskjema={vedtakskjema} />
				<DialogInnhold vedtakskjema={vedtakskjema} />
			</div>
		</Footer>
	);
}
