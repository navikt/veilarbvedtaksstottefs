import React, { useState } from 'react';
import { TidligereVedtak } from '../../components/tidligere-vedtak/tidligere-vedtak';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { VedtakData } from '../../rest/data/vedtak';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import Page from '../page/page';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { useFetchStore } from '../../stores/fetch-store';
import { IngenTidligereVedtakPanel } from '../../components/panel/ingen-tidligere-vedtak/ingen-tidligere-vedtak-panel';
import { Knapp } from 'nav-frontend-knapper';
import './hovedside.less';
import { IngenGjeldendeVedtakPanel } from '../../components/panel/ingen-gjeldende-vedtak/ingen-gjeldende-vedtak';

export function Hovedside() {
	const { vedtak } = useFetchStore();
	const { oppfolgingData } = useFetchStore();
	const underOppfolging = oppfolgingData.data.underOppfolging;
	const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
	const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
	const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
	const harTidligereVedtak= tidligereVedtak.length > 0;

	return (
		<Page>
			<AlertStripeVedtakIArena />
			<div className="hovedside">
				{!underOppfolging ?
					<div className="hovedside__vedtak-paneler">
						<IngenGjeldendeVedtakPanel />
					</div>
				:
					<div className="hovedside__vedtak-paneler">
						<UtkastPanel utkast={utkast} />
						<GjeldendeVedtakPanel gjeldendeVedtak={gjeldendeVedtak} />
						<NyttVedtakPanel utkast={utkast} />
					</div>
				}
					<div className="hovedside__tidligere-vedtak-panel">
						{harTidligereVedtak
							? <TidligereVedtak vedtakHistorikk={tidligereVedtak} />
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
