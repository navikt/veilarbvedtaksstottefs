import React, { useEffect } from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import JsonViewer from '../../component/json-viewer/json-viewer';
import { Oyblikksbilde } from '../../util/type/oyblikksbilde';
import Card from '../../component/card/card';
import { OrNothing } from '../../util/type/ornothing';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Page from '../../component/page/page';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import Footer from '../../component/footer/footer';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useFetchOyblikksbilde } from '../../api/api';
import { useViewStore, ViewType } from '../../store/view-store';
import Spinner from '../../component/spinner/spinner';
import './oyblikksbilde-visning.less';
import { fiksCvOgJobbprofil, fiksEgenvurderingJson, fiksRegistreringsinfoJson } from './oyblikksbilde-fikser';
import { logMetrikk } from '../../util/logger';

function finnOyblikksbilde(
	oyblikksbildeType: OyblikksbildeType,
	oyblikksbilder: OrNothing<Oyblikksbilde[]>
): string | null {
	const oyblikksbilde = oyblikksbilder ? oyblikksbilder.find(o => o.oyeblikksbildeType === oyblikksbildeType) : null;
	return oyblikksbilde ? oyblikksbilde.json : null;
}

export function OyblikksbildeVisning(props: { vedtakId: number }) {
	const oyeblikksbildePromise = useFetchOyblikksbilde(props.vedtakId);

	useEffect(() => {
		logMetrikk('vis-oyblikksbilde');
		// eslint-disable-next-line
	}, [props.vedtakId]);

	if (oyeblikksbildePromise.isLoading) {
		return <Spinner />;
	} else if (oyeblikksbildePromise.error) {
		return <AlertStripeFeil className="vedtaksstotte-alert">Noe gikk galt, prøv igjen</AlertStripeFeil>;
	}

	return <Oyeblikksbilde vedtakId={props.vedtakId} oyeblikksbilde={oyeblikksbildePromise.data} />;
}

function Oyeblikksbilde(props: { vedtakId: number; oyeblikksbilde: OrNothing<Oyblikksbilde[]> }) {
	const { changeView } = useViewStore();

	const cvOgJobbprofileJson = fiksCvOgJobbprofil(
		finnOyblikksbilde(OyblikksbildeType.CV_OG_JOBBPROFIL, props.oyeblikksbilde)
	);

	const registreringsinfoJson = fiksRegistreringsinfoJson(
		finnOyblikksbilde(OyblikksbildeType.REGISTRERINGSINFO, props.oyeblikksbilde)
	);

	const egenvurderingJson = fiksEgenvurderingJson(
		finnOyblikksbilde(OyblikksbildeType.EGENVURDERING, props.oyeblikksbilde)
	);

	return (
		<>
			<Page className="oyblikksbilde-visning page--grey">
				<section className="vedlegg">
					<Innholdstittel className="vedlegg__tittel">Brukerinformasjon på vedtakstidspunktet</Innholdstittel>
					<VedleggCard tittel="CV og Jobbprofil" json={cvOgJobbprofileJson} />
					<VedleggCard tittel="Registrering" json={registreringsinfoJson} />
					<VedleggCard tittel="Egenvurdering" json={egenvurderingJson} />
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
