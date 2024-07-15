import { useMemo } from 'react';
import { Element, Undertekst } from 'nav-frontend-typografi';
import { useViewStore, ViewType } from '../../store/view-store';
import { sortDatesDesc } from '../../util/date-utils';
import { OnVedtakClicked, VedtakPanel } from '../vedtak-panel/vedtak-panel';
import vedtakBilde from './vedtak.svg';
import { getInnsatsgruppeTekst } from '../../util/innsatsgruppe';
import { VedtakListe } from '../vedtak-liste/vedtak-liste';
import { logMetrikk } from '../../util/logger';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import './tidligere-vedtak-liste.css';

function mapVedtakTilPanel(vedtak: Vedtak, onClick: OnVedtakClicked<Vedtak>, posisjon: number) {
	const innsatsgruppeTekst = getInnsatsgruppeTekst(vedtak.innsatsgruppe);
	return (
		<VedtakPanel<Vedtak>
			name="tidligere-vedtak"
			onClick={onClick}
			vedtak={vedtak}
			dato={vedtak.vedtakFattet}
			posisjon={posisjon}
			ikon={vedtakBilde}
		>
			<Element className="tidligere-vedtak-panel__innsats--tittel">{innsatsgruppeTekst.tittel}</Element>
			<Undertekst className="tidligere-vedtak-panel__innsats--undertekst">
				{innsatsgruppeTekst.undertekst}
			</Undertekst>
		</VedtakPanel>
	);
}

export function TidligereVedtakListe({ vedtakListe }: { vedtakListe: Vedtak[] }) {
	const { changeView } = useViewStore();

	const tidligereVedtak = useMemo(() => {
		return [...vedtakListe].sort((v1, v2) => sortDatesDesc(v1.vedtakFattet, v2.vedtakFattet));
	}, [vedtakListe]);

	function handleTidligereVedtakClicked(vedtakData: Vedtak, idx: number) {
		changeView(ViewType.VEDTAK, { vedtakId: (vedtakData as Vedtak).id });
		logMetrikk('vis-tidligere-vedtak', { index: idx });
	}

	return (
		<VedtakListe<Vedtak>
			tittel="Tidligere oppfølgingsvedtak i Modia"
			ingenVedtakTekst="Ingen tidligere oppfølgingsvedtak"
			vedtak={tidligereVedtak}
			vedtakMapper={(vedtak, posisjon) => {
				const onClick = (v: Vedtak, idx: number) => handleTidligereVedtakClicked(vedtak, idx);
				return mapVedtakTilPanel(vedtak, onClick, posisjon);
			}}
		/>
	);
}
