import { useState } from 'react';
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

function checkIsMaxWidthOrLess(isShowingDialog: boolean | null): boolean {
	// Super hacky, burde gjøre en refaktorering av utkast-siden så man slipper mest mulig styling med JS
	const dialogMaxWidth = document.body.clientWidth <= 1620 ? 1300 : 1920;
	const maxWidth = isShowingDialog ? dialogMaxWidth : 1200;
	return document.body.clientWidth <= maxWidth;
}

export function UtkastFooter() {
	const { showSection } = useDialogSection();
	const { valgteKilder, hovedmal, innsatsgruppe, begrunnelse } = useSkjemaStore();

	const [isMaxWidthOrLess, setIsMaxWidthOrLess] = useState(checkIsMaxWidthOrLess(showSection));
	const [scrollBarWidth, setScrollBarWidth] = useState(calculateScrollBarWidth());

	const footerInnholdClassName = showSection
		? 'utkast-footer__innhold--dialog'
		: 'utkast-footer__innhold--dialog-minified';

	const vedtakskjema = { valgteKilder, begrunnelse, innsatsgruppe, hovedmal };

	const footerStyle = isMaxWidthOrLess ? { marginRight: `${scrollBarWidth}px` } : undefined;

	useEventListener('scroll', () => setScrollBarWidth(calculateScrollBarWidth()), [showSection]);
	useEventListener('resize', () => setIsMaxWidthOrLess(checkIsMaxWidthOrLess(showSection)), [showSection]);

	return (
		<Footer className="utkast-footer">
			<div style={footerStyle} className={cls('utkast-footer__innhold', footerInnholdClassName)}>
				<UtkastInnhold vedtakskjema={vedtakskjema} />
				<DialogInnhold vedtakskjema={vedtakskjema} />
			</div>
		</Footer>
	);
}
