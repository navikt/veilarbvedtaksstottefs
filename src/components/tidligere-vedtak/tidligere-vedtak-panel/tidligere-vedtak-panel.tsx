import React from 'react';
import dayjs from 'dayjs';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { InnsatsgruppeType, VedtakData } from '../../../rest/data/vedtak';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';
import { HoyreChevron } from 'nav-frontend-chevron';
import vedtakBilde from './vedtak.svg';
import { daysFromToday, formatDate } from '../../../utils/date-utils';
import './tidligere-vedtak-panel.less';

interface TidligereVedtakLenkePanel {
	tidligereVedtak: VedtakData;
	posisjon: number;
	onClick: (vedtakId: number, posisjon: number) => void;
}

function lagVedtakDatoTekst(dateStr: string): string {
	const date = dayjs(dateStr).toDate();
	const days = daysFromToday(date);

	if (days <= 0) {
		return 'i dag';
	} else if (days < 30) {
		return `${days} dager siden`;
	}

	return formatDate(date);
}

export function TidligereVedtakLenkePanel(props: TidligereVedtakLenkePanel) {
	const { innsatsgruppe, id, sistOppdatert } = props.tidligereVedtak;
	const innsatsgruppeTekst = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);
	const elemId = 'tidligere-vedtak-panel' + props.posisjon;

	return (
		<button
			aria-describedby={elemId}
			className="tidligere-vedtak-panel"
			onClick={() => props.onClick(id, props.posisjon)}
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
