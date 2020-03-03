import React from 'react';
import { TidligereVedtakListe } from '../../components/tidligere-vedtak-liste/tidligere-vedtak-liste';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import Page from '../page/page';
import { useFetchStore } from '../../stores/fetch-store';
import { IngenTidligereVedtakPanel } from '../../components/panel/ingen-tidligere-vedtak/ingen-tidligere-vedtak-panel';
import { IngenGjeldendeVedtakPanel } from '../../components/panel/ingen-gjeldende-vedtak/ingen-gjeldende-vedtak';
import Show from '../../components/show';
import { Vedtak } from '../../rest/data/vedtak';
import { hasFailed } from '../../rest/utils';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { VedtakFraArenaListe } from '../../components/vedtak-fra-arena-liste/vedtak-fra-arena-liste';
import './hovedside.less';

export function Hovedside() {
	const { vedtak, arenaVedtak, oppfolgingData } = useFetchStore();

	const underOppfolging = oppfolgingData.data.underOppfolging;
	const vedtakFraArena = arenaVedtak.data ? arenaVedtak.data : [];
	const harVedtakFraArena = vedtakFraArena.length > 0;

	const utkast = vedtak.data.find(v => v.vedtakStatus === 'UTKAST');
	const gjeldendeVedtak = vedtak.data.find(v => v.gjeldende);

	const tidligereVedtak = vedtak.data.filter(v => !v.gjeldende && v.vedtakStatus === 'SENDT');
	const harTidligereVedtak = tidligereVedtak.length > 0;

	return (
		<Page>
			<Show if={hasFailed(arenaVedtak)}>
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
					{harTidligereVedtak
						? <TidligereVedtakListe vedtakListe={tidligereVedtak} />
						: <IngenTidligereVedtakPanel />
					}
					<Show if={harVedtakFraArena}>
						<VedtakFraArenaListe vedtakListe={vedtakFraArena}/>
					</Show>
				</div>
			</div>
		</Page>
	);
}
