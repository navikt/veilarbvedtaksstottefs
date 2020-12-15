import React from 'react';
import Footer from '../../../components/footer/footer';
import UtkastInnhold from './utkast-innhold';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { DialogInnhold } from './dialog-innhold';
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
