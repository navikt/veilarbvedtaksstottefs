import React from 'react';
import UtkastInnhold from './utkast-innhold';
import { DialogInnhold } from './dialog-innhold';
import { useSkjemaStore } from '../../../store/skjema-store';
import Footer from '../../../component/footer/footer';
import './utkast-footer.less';

export function UtkastFooter() {
	const { kilder, hovedmal, innsatsgruppe, begrunnelse } = useSkjemaStore();

	const vedtakskjema = { opplysninger: kilder, begrunnelse, innsatsgruppe, hovedmal };

	return (
		<Footer className="utkast-footer">
			<div className="utkast-footer__innhold">
				<UtkastInnhold vedtakskjema={vedtakskjema} />
				<DialogInnhold vedtakskjema={vedtakskjema} />
			</div>
		</Footer>
	);
}
