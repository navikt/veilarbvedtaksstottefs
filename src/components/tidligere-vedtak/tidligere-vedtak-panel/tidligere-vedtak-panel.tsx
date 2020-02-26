import React from 'react';
import dayjs from 'dayjs';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { InnsatsgruppeType, VedtakData } from '../../../rest/data/vedtak';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';
import { HoyreChevron } from 'nav-frontend-chevron';
import vedtakBilde from './vedtak.svg';
import { daysFromToday, formatDate } from '../../../utils/date-utils';
import { OnTidligereVedtakClicked } from '../tidligere-vedtak';
import { ArenaVedtakData } from '../../../rest/data/arena-vedtak';
import './tidligere-vedtak-panel.less';

interface TidligereArenaVedtakLenkePanel {
	tidligereVedtak: ArenaVedtakData;
	posisjon: number;
	onClick: OnTidligereVedtakClicked;
}

interface TidligereVedtakLenkePanel {
	tidligereVedtak: VedtakData;
	posisjon: number;
	onClick: OnTidligereVedtakClicked;
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

export function TidligereArenaVedtakLenkePanel(props: TidligereArenaVedtakLenkePanel) {
	const { datoOpprettet, journalfortAvNavn } = props.tidligereVedtak;
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
						<Element className="tidligere-vedtak-panel__innsats--tittel">Vedtak fra Arena</Element>
						<EtikettLiten className="tidligere-vedtak-panel__innsats--undertekst">Fattet av: {journalfortAvNavn}</EtikettLiten>
					</div>
				</div>
				<Normaltekst className="tidligere-vedtak-panel__dato">
					{lagVedtakDatoTekst(datoOpprettet)}
				</Normaltekst>
			</div>
			<HoyreChevron className="tidligere-vedtak-panel__chevron" />
		</button>
	);
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
