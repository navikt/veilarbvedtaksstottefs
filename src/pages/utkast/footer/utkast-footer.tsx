import React from 'react';
import Footer from '../../../components/footer/footer';
import UtkastInnhold from './utkast-innhold';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { DialogInnhold } from './dialog-innhold';
import './utkast-footer.less';

export function UtkastFooter() {
	const { opplysninger, hovedmal, innsatsgruppe, begrunnelse } = useSkjemaStore();

	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };

	return (
		<Footer className="utkast-footer">
			<div className="utkast-footer__innhold">
				<UtkastInnhold vedtakskjema={vedtakskjema} />
				<DialogInnhold vedtakskjema={vedtakskjema} />
			</div>
		</Footer>
	);
}
