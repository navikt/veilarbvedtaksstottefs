import React, { useState } from 'react';
import cls from 'classnames';
import UtkastInnhold from './utkast-innhold';
import { DialogInnhold } from './dialog-innhold';
import { useSkjemaStore } from '../../../store/skjema-store';
import Footer from '../../../component/footer/footer';
import './utkast-footer.less';
import { useDialogSection } from '../../../store/dialog-section-store';
import { useEventListener } from '../../../util/hooks';

function calculateScrollBarWidth(): number {
	return document.body.offsetWidth - document.body.clientWidth;
}

function checkIsMaxWidthOrLess(): boolean {
	return document.body.clientWidth <= 1920;
}

export function UtkastFooter() {
	const { showSection } = useDialogSection();
	const { kilder, hovedmal, innsatsgruppe, begrunnelse } = useSkjemaStore();

	const [isMaxWidthOrLess, setIsMaxWidthOrLess] = useState(checkIsMaxWidthOrLess);
	const [scrollBarWidth, setScrollBarWidth] = useState(calculateScrollBarWidth());

	const footerInnholdClassName = showSection ? 'utkast-footer__innhold--dialog' : 'utkast-footer__innhold--no-dialog';

	const vedtakskjema = { opplysninger: kilder, begrunnelse, innsatsgruppe, hovedmal };

	const footerStyle = isMaxWidthOrLess ? { marginRight: `${scrollBarWidth}px` } : undefined;

	useEventListener('scroll', () => setScrollBarWidth(calculateScrollBarWidth()));
	useEventListener('resize', () => setIsMaxWidthOrLess(checkIsMaxWidthOrLess()));

	return (
		<Footer className="utkast-footer">
			<div style={footerStyle} className={cls('utkast-footer__innhold', footerInnholdClassName)}>
				<UtkastInnhold vedtakskjema={vedtakskjema} />
				<DialogInnhold vedtakskjema={vedtakskjema} />
			</div>
		</Footer>
	);
}
