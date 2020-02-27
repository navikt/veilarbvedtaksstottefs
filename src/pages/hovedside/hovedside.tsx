import React, { useState } from 'react';
import { TidligereVedtak } from '../../components/tidligere-vedtak/tidligere-vedtak';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import Page from '../page/page';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useFetchStore } from '../../stores/fetch-store';
import { IngenTidligereVedtakPanel } from '../../components/panel/ingen-tidligere-vedtak/ingen-tidligere-vedtak-panel';
import { Knapp } from 'nav-frontend-knapper';
import { IngenGjeldendeVedtakPanel } from '../../components/panel/ingen-gjeldende-vedtak/ingen-gjeldende-vedtak';
import Show from '../../components/show';
import { Vedtak } from '../../rest/data/vedtak';
import './hovedside.less';

export function Hovedside() {
	const { vedtak, arenaVedtak, oppfolgingData } = useFetchStore();
	const underOppfolging = oppfolgingData.data.underOppfolging;

	const utkast = vedtak.data.find(v => v.vedtakStatus === 'UTKAST');
	const gjeldendeVedtak = vedtak.data.find(v => v.gjeldende) || arenaVedtak.data.find(v => v.erGjeldende);

	const tidligereVedtakFraModia = vedtak.data.filter(v => !v.gjeldende && v.vedtakStatus === 'SENDT');
	const tidligereVedtakFraArena = arenaVedtak.data.filter(v => !v.erGjeldende);
	const harTidligereVedtak = tidligereVedtakFraModia.length > 0 || tidligereVedtakFraArena.length > 0;

	return (
		<Page>
			<AlertStripeVedtakIArena />
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
							? <TidligereVedtak modiaHistorikk={tidligereVedtakFraModia} arenaHistorikk={tidligereVedtakFraArena} />
							: <IngenTidligereVedtakPanel />
						}
				</div>
			</div>
		</Page>
	);
}

const HAS_CONFIRMED_TAG = 'HAR_BEKREFTET_SETT_VEDTAK_I_GOSYS_VARSLING';

function AlertStripeVedtakIArena() {
	const [hasClickedConfirm, setHasClickedConfirm] = useState(localStorage.getItem(HAS_CONFIRMED_TAG) === 'true');

	const onConfirmClicked = () => {
		localStorage.setItem(HAS_CONFIRMED_TAG, 'true');
		setHasClickedConfirm(true);
	};

	if (hasClickedConfirm) return null;

	return (
		<AlertStripeInfo className="hovedside__alertstripe">
			Oppfølgingsvedtak som er utført i Arena kan du se i Gosys
			<Knapp className="hovedside__bekreft-knapp" mini={true} onClick={onConfirmClicked}>Forstått</Knapp>
		</AlertStripeInfo>
	);
}
