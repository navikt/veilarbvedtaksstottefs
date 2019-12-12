import React from 'react';
import { TidligereVedtak } from '../../components/tidligere-vedtak/tidligere-vedtak';
import { UtkastPanel } from '../../components/panel/utkast/utkast-panel';
import { VedtakData } from '../../rest/data/vedtak';
import { GjeldendeVedtakPanel } from '../../components/panel/gjeldende-vedtak/gjeldende-vedtak-panel';
import { NyttVedtakPanel } from '../../components/panel/nytt-vedtak/nytt-vedtak-panel';
import Page from '../page/page';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { OrNothing } from '../../utils/types/ornothing';
import { VEDTAK_I_GOSYS_TOGGLE } from '../../rest/data/features';
import { useFetchStore } from '../../stores/fetch-store';
import { IngenTidligereVedtakPanel } from '../../components/panel/ingen-tidligere-vedtak/ingen-tidligere-vedtak-panel';
import './hovedside.less';

export function Hovedside() {
	const { vedtak, features } = useFetchStore();
	const gjeldendeVedtak = vedtak.data.find((v: VedtakData) => v.gjeldende);
	const tidligereVedtak = vedtak.data.filter((v: VedtakData) => !v.gjeldende && v.vedtakStatus === 'SENDT');
	const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');
	const visAlertrstripefeatureToggle = features.data[VEDTAK_I_GOSYS_TOGGLE];
	const harTidligereVedtak= tidligereVedtak.length > 0;

	return (
		<Page>
			<AlertStripeVedtakIArena
				gjeldendeVedtak={gjeldendeVedtak}
				tidligereVedtak={tidligereVedtak}
				visAlertrstripefeatureToggle={visAlertrstripefeatureToggle}
			/>
			<div className="hovedside">
				<div className="hovedside__vedtak-paneler">
					<UtkastPanel utkast={utkast} />
					<GjeldendeVedtakPanel gjeldendeVedtak={gjeldendeVedtak} />
					<NyttVedtakPanel utkast={utkast} />
				</div>
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

function AlertStripeVedtakIArena(props: {
	visAlertrstripefeatureToggle: boolean;
	gjeldendeVedtak: OrNothing<VedtakData>;
	tidligereVedtak: VedtakData[];
}) {
	if (props.visAlertrstripefeatureToggle && (!props.gjeldendeVedtak && props.tidligereVedtak.length === 0)) {
		return (
			<AlertStripeInfo className="blokk-xs">
				Oppfølgingsvedtak utført i Arena kan ses i Gosys.
			</AlertStripeInfo>
		);
	}
	return null;
}
