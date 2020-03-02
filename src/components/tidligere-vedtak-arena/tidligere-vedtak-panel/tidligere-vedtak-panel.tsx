import React from 'react';
import dayjs from 'dayjs';
import { Element, EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { ArenaVedtak, InnsatsgruppeType, ModiaVedtak } from '../../../rest/data/vedtak';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';
import { HoyreChevron } from 'nav-frontend-chevron';
import { daysFromToday, formatDate, lagVedtakDatoTekst } from '../../../utils/date-utils';
import { OnTidligereVedtakClicked } from '../tidligere-vedtak-arena';
import vedtakBilde from './vedtak.svg';
import arenaVedtakBilde from './arena-vedtak.svg';
import './tidligere-vedtak-panel.less';

interface TidligereArenaVedtakLenkePanel {
	tidligereVedtak: ArenaVedtak;
	posisjon: number;
	onClick: OnTidligereVedtakClicked;
}

export function TidligereArenaVedtakLenkePanel(props: TidligereArenaVedtakLenkePanel) {
	const { dato } = props.tidligereVedtak;
	const elemId = 'tidligere-vedtak-panel' + props.posisjon;

	return (
		<button
			aria-describedby={elemId}
			className="tidligere-vedtak-panel"
			onClick={() => props.onClick(props.tidligereVedtak, props.posisjon)}
		>
			<div className="tidligere-vedtak-panel__innhold--wrapper">
				<div className="tidligere-vedtak-panel__innhold">
					<img src={arenaVedtakBilde} alt="" className="tidligere-vedtak-panel__bilde" />
					<Element id={elemId} className="tidligere-vedtak-panel__innsats--tittel">Oppfølgingsvedtak fra Arena</Element>
				</div>
				<Normaltekst className="tidligere-vedtak-panel__dato">
					{lagVedtakDatoTekst(dato)}
				</Normaltekst>
			</div>
			<HoyreChevron className="tidligere-vedtak-panel__chevron" />
		</button>
	);
}
