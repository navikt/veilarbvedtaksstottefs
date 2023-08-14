import { useEffect } from 'react';
import JsonViewer from '../../component/json-viewer/json-viewer';
import { Oyblikksbilde } from '../../util/type/oyblikksbilde';
import Card from '../../component/card/card';
import { OrNothing } from '../../util/type/ornothing';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Page from '../../component/page/page';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import Footer from '../../component/footer/footer';
import { useViewStore, ViewType } from '../../store/view-store';
import Spinner from '../../component/spinner/spinner';
import { fiksCvOgJobbprofil, fiksEgenvurderingJson, fiksRegistreringsinfoJson } from './oyblikksbilde-fikser';
import { logMetrikk } from '../../util/logger';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { useAppStore } from '../../store/app-store';
import { Alert, Button } from '@navikt/ds-react';
import './oyblikksbilde-visning.less';

function finnOyblikksbilde(
	oyblikksbildeType: OyblikksbildeType,
	oyblikksbilder: OrNothing<Oyblikksbilde[]>
): string | null {
	const oyblikksbilde = oyblikksbilder ? oyblikksbilder.find(o => o.oyeblikksbildeType === oyblikksbildeType) : null;
	return oyblikksbilde ? oyblikksbilde.json : null;
}

export function OyblikksbildeVisning(props: { vedtakId: number }) {
	const oyeblikksbildeFetcher = useAxiosFetcher(hentOyblikksbilde);

	useEffect(() => {
		oyeblikksbildeFetcher.fetch(props.vedtakId);

		logMetrikk('vis-oyblikksbilde');
		// eslint-disable-next-line
	}, [props.vedtakId]);

	if (oyeblikksbildeFetcher.loading) {
		return <Spinner />;
	} else if (oyeblikksbildeFetcher.error) {
		return (
			<Alert variant="error" className="vedtaksstotte-alert">
				Noe gikk galt, prøv igjen
			</Alert>
		);
	}

	return <Oyeblikksbilde vedtakId={props.vedtakId} oyeblikksbilde={oyeblikksbildeFetcher.data} />;
}

function Oyeblikksbilde(props: { vedtakId: number; oyeblikksbilde: OrNothing<Oyblikksbilde[]> }) {
	const { changeView } = useViewStore();
	const { fnr, enhetId } = useAppStore();

	const cvOgJobbprofileJson = fiksCvOgJobbprofil(
		finnOyblikksbilde(OyblikksbildeType.CV_OG_JOBBPROFIL, props.oyeblikksbilde)
	);

	const registreringsinfoJson = fiksRegistreringsinfoJson(
		finnOyblikksbilde(OyblikksbildeType.REGISTRERINGSINFO, props.oyeblikksbilde)
	);

	const egenvurderingJson = fiksEgenvurderingJson(
		finnOyblikksbilde(OyblikksbildeType.EGENVURDERING, props.oyeblikksbilde),
		fnr,
		enhetId
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
				<Button onClick={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}>
					Tilbake til vedtak
				</Button>
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
