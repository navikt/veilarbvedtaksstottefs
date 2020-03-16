import React, { useMemo } from 'react';
import { InnsatsgruppeType, Vedtak } from '../../rest/data/vedtak';
import { Element, EtikettLiten } from 'nav-frontend-typografi';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import { sortDates } from '../../utils/date-utils';
import { OnVedtakClicked, VedtakPanel } from '../vedtak-panel/vedtak-panel';
import vedtakBilde from './vedtak.svg';
import { getInnsatsgruppeTekst } from '../../utils/innsatsgruppe';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import './tidligere-vedtak-liste.less';

function mapVedtakTilPanel(vedtak: Vedtak, onClick: OnVedtakClicked<Vedtak>, posisjon: number) {
	const innsatsgruppeTekst = getInnsatsgruppeTekst(vedtak.innsatsgruppe as InnsatsgruppeType);
	return (
		<VedtakPanel<Vedtak>
			onClick={onClick}
			vedtak={vedtak}
			dato={vedtak.sistOppdatert}
			posisjon={posisjon}
			ikon={vedtakBilde}
		>
			<Element className="tidligere-vedtak-panel__innsats--tittel">{innsatsgruppeTekst.tittel}</Element>
			<EtikettLiten className="tidligere-vedtak-panel__innsats--undertekst">{innsatsgruppeTekst.undertekst}</EtikettLiten>
		</VedtakPanel>
	);
}

export function TidligereVedtakListe({ vedtakListe }: { vedtakListe: Vedtak[] }) {
	const { changeView } = useViewStore();

	const tidligereVedtak = useMemo(() => {
		return [...vedtakListe].sort((v1, v2) => sortDates(v1.sistOppdatert, v2.sistOppdatert));
	}, [vedtakListe]);

	function handleTidligereVedtakClicked(vedtakData: Vedtak, idx: number) {
		changeView(ViewType.VEDTAK, { vedtakId: (vedtakData as Vedtak).id });
		frontendlogger.logMetrikk('vis-tidligere-vedtak', { index: idx });
	}

	return (
		<VedtakListe<Vedtak>
			tittel="Tidligere oppfølgingsvedtak i Modia"
			ingenVedtakTekst="Ingen tidligere oppfølgingsvedtak"
			vedtak={tidligereVedtak}
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: Vedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapVedtakTilPanel(vedtak, onClick, posisjon)
			}}
		/>
	);
}

