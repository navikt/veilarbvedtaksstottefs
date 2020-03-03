import React, { useMemo } from 'react';
import { InnsatsgruppeType, ModiaVedtak } from '../../rest/data/vedtak';
import { Element, EtikettLiten } from 'nav-frontend-typografi';
import { useViewStore, ViewType } from '../../stores/view-store';
import { frontendlogger } from '../../utils/frontend-logger';
import { sortDates } from '../../utils/date-utils';
import { OnVedtakClicked, VedtakPanel } from '../vedtak-panel/vedtak-panel';
import vedtakBilde from './vedtak.svg';
import { getInnsatsgruppeTekst } from '../../utils/innsatsgruppe';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import './tidligere-vedtak.less';

function mapVedtakTilPanel(vedtak: ModiaVedtak, onClick: OnVedtakClicked<ModiaVedtak>, posisjon: number) {
	const innsatsgruppeTekst = getInnsatsgruppeTekst(vedtak.innsatsgruppe as InnsatsgruppeType);
	return (
		<VedtakPanel<ModiaVedtak>
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

export function TidligereVedtak({ modiaHistorikk }: { modiaHistorikk: ModiaVedtak[] }) {
	const { changeView } = useViewStore();

	const tidligereVedtak = useMemo(() => {
		return [...modiaHistorikk].sort((v1, v2) => sortDates(v1.sistOppdatert, v2.sistOppdatert));
	}, [modiaHistorikk]);

	function handleTidligereVedtakClicked(vedtakData: ModiaVedtak, idx: number) {
		changeView(ViewType.VEDTAK, { vedtakId: (vedtakData as ModiaVedtak).id });
		frontendlogger.logMetrikk('vis-tidligere-vedtak', { index: idx });
	}

	return (
		<VedtakListe<ModiaVedtak>
			tittel="Tidligere oppfølgingsvedtak"
			vedtak={tidligereVedtak}
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: ModiaVedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapVedtakTilPanel(vedtak, onClick, posisjon)
			}}
		/>
	);
}

