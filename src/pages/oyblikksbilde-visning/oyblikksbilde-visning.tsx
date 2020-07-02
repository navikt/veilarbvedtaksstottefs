import React, { useEffect, useState } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import JsonViewer from '../../components/json-viewer/json-viewer';
import { Oyblikksbilde } from '../../utils/types/oyblikksbilde';
import Card from '../../components/card/card';
import { OrNothing } from '../../utils/types/ornothing';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Page from '../../components/page/page';
import OyblikksbildeType from '../../utils/types/oyblikksbilde-type';
import { frontendlogger } from '../../utils/frontend-logger';
import Footer from '../../components/footer/footer';
import { Hovedknapp } from 'nav-frontend-knapper';
import { fetchOyblikksbilde } from '../../rest/api';
import { FetchResponse } from '../../rest/utils';
import { useViewStore, ViewType } from '../../stores/view-store';
import Spinner from '../../components/spinner/spinner';
import './oyblikksbilde-visning.less';
import { fiksCvOgJobbprofil, fiksEgenvurderingJson, fiksRegistreringsinfoJson } from './oyblikksbilde-fikser';

function finnOyblikksbilde(oyblikksbildeType: OyblikksbildeType, oyblikksbilder: OrNothing<Oyblikksbilde[]>): string | null {
	const oyblikksbilde = oyblikksbilder ? oyblikksbilder.find(o => o.oyeblikksbildeType === oyblikksbildeType) : null;
	return oyblikksbilde ? oyblikksbilde.json : null;
}

export function OyblikksbildeVisning(props: { vedtakId: number }) {
	const { changeView } = useViewStore();
    const [oyblikksbilder, setOyeblikksbilder] = useState<FetchResponse<Oyblikksbilde[]> | null>();

	useEffect(() => {
		frontendlogger.logMetrikk('vis-oyblikksbilde');
		fetchOyblikksbilde(props.vedtakId).then(setOyeblikksbilder)
	}, [props.vedtakId]);

	if (!oyblikksbilder) {
		return <Spinner />;
	} else if (oyblikksbilder.error) {
		return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
	}

	const cvOgJobbprofileJson = fiksCvOgJobbprofil(
		finnOyblikksbilde(OyblikksbildeType.CV_OG_JOBBPROFIL, oyblikksbilder.data)
	);

	const registreringsinfoJson = fiksRegistreringsinfoJson(
		finnOyblikksbilde(OyblikksbildeType.REGISTRERINGSINFO, oyblikksbilder.data)
	);

	const egenvurderingJson = fiksEgenvurderingJson(
		finnOyblikksbilde(OyblikksbildeType.EGENVURDERING, oyblikksbilder.data)
	);

	return (
		<>
			<Page className="oyblikksbilde-visning page--grey">
				<section className="vedlegg">
					<Innholdstittel className="vedlegg__tittel">Brukerinformasjon på vedtakstidspunktet</Innholdstittel>
					<VedleggCard
						tittel="CV og Jobbprofil"
						json={cvOgJobbprofileJson}
					/>
					<VedleggCard
						tittel="Registrering"
						json={registreringsinfoJson}
					/>
					<VedleggCard
						tittel="Egenvurdering"
						json={egenvurderingJson}
					/>
				</section>
			</Page>
			<Footer className="oyblikksbilde-visning__footer">
				<div className="oyblikksbilde-visning__aksjoner">
					<Hovedknapp mini={true} onClick={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}>
						Tilbake til vedtak
					</Hovedknapp>
				</div>
			</Footer>
		</>
	);
}

function VedleggCard({ tittel, json }: { tittel: string; json: string | object | null }) {
	return (
		<Card className="vedlegg-card">
			<Systemtittel tag="h2" className="vedlegg-card__header">
				{tittel}
			</Systemtittel>
			<JsonViewer json={json} className="oyblikksbilde-visning__json-visning" />
		</Card>
	);
}
