import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import JsonViewer from '../../components/json-viewer/json-viewer';
import { Oyblikksbilde } from '../../utils/types/oyblikksbilde';
import Card from '../../components/card/card';
import { OrNothing } from '../../utils/types/ornothing';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Page from '../page/page';
import OyblikksbildeType from '../../utils/types/oyblikksbilde-type';
import { frontendlogger } from '../../utils/frontend-logger';
import Footer from '../../components/footer/footer';
import { Hovedknapp } from 'nav-frontend-knapper';
import useFetch from '../../rest/use-fetch';
import { HentOyblikksbildeFetchParams, lagHentOyblikksbildeFetchInfo } from '../../rest/api';
import { hasFailed, isNotStarted, isNotStartedOrPending } from '../../rest/utils';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import Spinner from '../../components/spinner/spinner';
import './oyblikksbilde-visning.less';

function finnOyblikksbilde(oyblikksbildeType: OyblikksbildeType, oyblikksbilder: OrNothing<Oyblikksbilde[]>): string | null {
	const oyblikksbilde = oyblikksbilder ? oyblikksbilder.find(o => o.oyblikksbildeType === oyblikksbildeType) : null;
	return oyblikksbilde ? oyblikksbilde.json : null;
}

export function OyblikksbildeVisning(props: { vedtakId: number }) {
	const { fnr } = useAppStore();
	const { changeView } = useViewStore();
	const oyblikksbilder = useFetch<Oyblikksbilde[], HentOyblikksbildeFetchParams>(lagHentOyblikksbildeFetchInfo);

	useEffect(() => {
		frontendlogger.logMetrikk('vis-oyblikksbilde');
		if (isNotStarted(oyblikksbilder)) {
			oyblikksbilder.fetch({ fnr, vedtakId: props.vedtakId });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isNotStartedOrPending(oyblikksbilder)) {
		return <Spinner />;
	} else if (hasFailed(oyblikksbilder)) {
		return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
	}

	return (
		<Page className="oyblikksbilde-visning page--grey">
			<section className="vedlegg">
				<Innholdstittel className="vedlegg__tittel">Brukerinformasjon på vedtakstidspunktet</Innholdstittel>
				<VedleggCard
					tittel="CV og Jobbprofil"
					json={finnOyblikksbilde(OyblikksbildeType.CV_OG_JOBBPROFIL, oyblikksbilder.data)}
				/>
				<VedleggCard
					tittel="Registrering"
					json={finnOyblikksbilde(OyblikksbildeType.REGISTRERINGSINFO, oyblikksbilder.data)}
				/>
				<VedleggCard
					tittel="Egenvurdering"
					json={finnOyblikksbilde(OyblikksbildeType.EGENVURDERING, oyblikksbilder.data)}
				/>
			</section>
			<Footer className="oyblikksbilde-visning__footer">
				<div className="oyblikksbilde-visning__aksjoner">
					<Hovedknapp mini={true} onClick={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}>
						Tilbake til vedtak
					</Hovedknapp>
				</div>
			</Footer>
		</Page>
	);
}

function VedleggCard({ tittel, json }: { tittel: string; json: string | null }) {
	return (
		<Card className="vedlegg-card">
			<Systemtittel tag="h2" className="vedlegg-card__header">
				{tittel}
			</Systemtittel>
			<JsonViewer json={json} className="oyblikksbilde-visning__json-visning" />
		</Card>
	);
}
