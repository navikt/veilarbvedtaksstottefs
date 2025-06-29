import { TidligereVedtakListe } from '../../component/tidligere-vedtak-liste/tidligere-vedtak-liste';
import { UtkastPanel } from '../../component/panel/utkast/utkast-panel';
import { GjeldendeVedtakPanel } from '../../component/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../component/panel/nytt-vedtak/nytt-vedtak-panel';
import Page from '../../component/page/page';
import { IngenTidligereVedtakPanel } from '../../component/panel/ingen-tidligere-vedtak/ingen-tidligere-vedtak-panel';
import { IngenGjeldendeVedtakPanel } from '../../component/panel/ingen-gjeldende-vedtak/ingen-gjeldende-vedtak';
import Show from '../../component/show';
import { VedtakFraArenaListe } from '../../component/vedtak-fra-arena-liste/vedtak-fra-arena-liste';
import { useDataStore } from '../../store/data-store';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { KanIkkeDistribueresAlert } from '../utkast/kan-ikke-distribueres-alert';
import './hovedside.css';

export function Hovedside() {
	const { fattedeVedtak, utkast, arenaVedtak, oppfolgingData } = useDataStore();

	const underOppfolging = oppfolgingData.underOppfolging;
	const vedtakFraArena = arenaVedtak || [];

	const tidligereVedtak = fattedeVedtak.filter(v => !v.gjeldende);
	const gjeldendeVedtak = fattedeVedtak.find(v => v.gjeldende);

	const harTidligereVedtak = vedtakFraArena.length > 0 || tidligereVedtak.length > 0;

	return (
		<Page>
			{!!utkast && <KanIkkeDistribueresAlert kanDistribueres={utkast.kanDistribueres} />}
			<div className="hovedside">
				<div className="hovedside__vedtak-paneler">
					<Show if={!underOppfolging}>
						<IngenGjeldendeVedtakPanel />
					</Show>
					<Show if={underOppfolging}>
						<UtkastPanel utkast={utkast} />
						<Show if={gjeldendeVedtak != null}>
							<GjeldendeVedtakPanel gjeldendeVedtak={gjeldendeVedtak as Vedtak} />
						</Show>
						<NyttVedtakPanel utkast={utkast} />
					</Show>
				</div>
				<div className="hovedside__tidligere-vedtak-panel">
					<Show if={!harTidligereVedtak}>
						<IngenTidligereVedtakPanel />
					</Show>
					<Show if={harTidligereVedtak}>
						<TidligereVedtakListe vedtakListe={tidligereVedtak} />
						<VedtakFraArenaListe vedtakListe={vedtakFraArena} />
					</Show>
				</div>
			</div>
		</Page>
	);
}
