import React from 'react';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { InnsatsgruppeType, ModiaVedtak } from '../../../rest/data/vedtak';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';
import { HoyreChevron } from 'nav-frontend-chevron';
import { OnTidligereVedtakClicked } from '../tidligere-vedtak';
import vedtakBilde from './vedtak.svg';
import './tidligere-vedtak-panel.less';
import { lagVedtakDatoTekst } from '../../../utils/date-utils';

interface TidligereVedtakLenkePanel {
	tidligereVedtak: ModiaVedtak;
	posisjon: number;
	onClick: OnTidligereVedtakClicked;
}

export function TidligereVedtakLenkePanel(props: TidligereVedtakLenkePanel) {
	const { innsatsgruppe, sistOppdatert } = props.tidligereVedtak;
	const innsatsgruppeTekst = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);
	const elemId = 'tidligere-vedtak-panel' + props.posisjon;

	return (
		<button
			aria-describedby={elemId}
			className="tidligere-vedtak-panel"
			onClick={() => props.onClick(props.tidligereVedtak, props.posisjon)}
		>
			<div className="tidligere-vedtak-panel__innhold--wrapper">
				<div className="tidligere-vedtak-panel__innhold">
					<img src={vedtakBilde} alt="" className="tidligere-vedtak-panel__bilde" />
					<div id={elemId}>
						<Element className="tidligere-vedtak-panel__innsats--tittel">{innsatsgruppeTekst.tittel}</Element>
						<EtikettLiten className="tidligere-vedtak-panel__innsats--undertekst">{innsatsgruppeTekst.undertekst}</EtikettLiten>
					</div>
				</div>
				<Normaltekst className="tidligere-vedtak-panel__dato">
					{lagVedtakDatoTekst(sistOppdatert)}
				</Normaltekst>
			</div>
			<HoyreChevron className="tidligere-vedtak-panel__chevron" />
		</button>
	);
}
