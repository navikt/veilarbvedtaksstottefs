import React from 'react';
import Footer from '../../../components/footer/footer';
import { logger } from '../../../utils/logger';
import UtkastInnhold from './utkast-innhold';
import './utkast-footer.less';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { DialogInnhold } from './dialog-innhold';

export function UtkastFooter() {
	const { opplysninger, hovedmal, innsatsgruppe, begrunnelse } = useSkjemaStore();

	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };

	return (
		<Footer className="utkast-footer">
			<div className="utkast-footer__innhold">
				<UtkastInnhold
					vedtakskjema={vedtakskjema}
					harForsoktForhandsvisning={() => {
						logger.info('TODO');
					}}
				/>
				<DialogInnhold
					vedtakskjema={vedtakskjema}
					harForsoktForhandsvisning={() => {
						logger.info('TODO');
					}}
				/>
			</div>
		</Footer>
	);
}
