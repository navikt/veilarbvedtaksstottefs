import React, { useEffect, useState } from 'react';
import UtkastInnhold from './utkast-innhold';
import { DialogInnhold } from './dialog-innhold';
import { useSkjemaStore } from '../../../store/skjema-store';
import Footer from '../../../component/footer/footer';
import './utkast-footer.less';

function calculateScrollBarWidth(): number {
	return document.body.offsetWidth - document.body.clientWidth;
}

export function UtkastFooter() {
	const { kilder, hovedmal, innsatsgruppe, begrunnelse } = useSkjemaStore();

	const [scrollBarWidth, setScrollBarWidth] = useState(calculateScrollBarWidth());

	const vedtakskjema = { opplysninger: kilder, begrunnelse, innsatsgruppe, hovedmal };

	useEffect(() => {
		// Dette vil ikke fungere lokalt siden vi bruker "height: 100%" på body, men det vil fungere i test/prod
		const handleEvent = () => setScrollBarWidth(calculateScrollBarWidth());
		window.addEventListener('scroll', handleEvent);
		return () => window.removeEventListener('scroll', handleEvent);
	}, []);

	return (
		<Footer className="utkast-footer">
			<div style={{ marginRight: `${scrollBarWidth}px` }} className="utkast-footer__innhold">
				<UtkastInnhold vedtakskjema={vedtakskjema} />
				<DialogInnhold vedtakskjema={vedtakskjema} />
			</div>
		</Footer>
	);
}
