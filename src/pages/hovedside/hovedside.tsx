import React from 'react';
import { TidligereVedtakListe } from '../../components/tidligere-vedtak-liste/tidligere-vedtak-liste';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import Page from '../page/page';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { IngenTidligereVedtakPanel } from '../../components/panel/ingen-tidligere-vedtak/ingen-tidligere-vedtak-panel';
import { IngenGjeldendeVedtakPanel } from '../../components/panel/ingen-gjeldende-vedtak/ingen-gjeldende-vedtak';
import Show from '../../components/show';
import { Vedtak } from '../../rest/data/vedtak';
import { hasFailed } from '../../rest/utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { VedtakFraArenaListe } from '../../components/vedtak-fra-arena-liste/vedtak-fra-arena-liste';
import './hovedside.less';
import { useDataStore } from '../../stores/data-store';

export function Hovedside() {
	const { arenaVedtakFetcher } = useDataFetcherStore();
	const { vedtak, arenaVedtak, oppfolgingData } = useDataStore();

	const underOppfolging = oppfolgingData.underOppfolging;
	const vedtakFraArena = arenaVedtak || [];

	const utkast = vedtak.find(v => v.vedtakStatus === 'UTKAST');
	const tidligereVedtak = vedtak.filter(v => !v.gjeldende && v.vedtakStatus === 'SENDT');
	const gjeldendeVedtak = vedtak.find(v => v.gjeldende);

	const harTidligereVedtak = vedtakFraArena.length > 0 || tidligereVedtak.length > 0;

	return (
		<Page>
			<Show if={hasFailed(arenaVedtakFetcher)}>
				<AlertStripeFeil className="hovedside__feil-arena-vedtak">
					Klarte ikke å hente oppfølgingsvedtak fra Arena
				</AlertStripeFeil>
			</Show>
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
						<VedtakFraArenaListe vedtakListe={vedtakFraArena}/>
					</Show>
				</div>
			</div>
		</Page>
	);
}
