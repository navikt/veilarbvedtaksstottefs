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
import { ReactComponent as FilePdfIkon } from './icons/filepdficon.svg';
import { BodyShort, Link } from '@navikt/ds-react';
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

function harJournalfortOyblikksbilde(
	oyblikksbildeType: OyblikksbildeType,
	oyblikksbilder: OrNothing<Oyblikksbilde[]>
): boolean {
	const oyblikksbilde = oyblikksbilder ? oyblikksbilder.find(o => o.oyeblikksbildeType === oyblikksbildeType) : null;
	return oyblikksbilde ? oyblikksbilde.journalfort : false;
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

	const harJournalfortCVOyeblikksbilde = harJournalfortOyblikksbilde(
		OyblikksbildeType.CV_OG_JOBBPROFIL,
		props.oyeblikksbilde
	);
	const harJournalfortRegistreringOyeblikksbilde = harJournalfortOyblikksbilde(
		OyblikksbildeType.REGISTRERINGSINFO,
		props.oyeblikksbilde
	);
	const harJournalfortEgenvurderingOyeblikksbilde = harJournalfortOyblikksbilde(
		OyblikksbildeType.EGENVURDERING,
		props.oyeblikksbilde
	);

	return (
		<>
			<Page className="oyblikksbilde-visning page--grey">
				<section className="vedlegg">
					<Innholdstittel className="vedlegg__tittel">
						Journalført brukerinformasjon på vedtakstidspunktet
					</Innholdstittel>
					<VedleggCard
						tittel="Svarene dine fra da du registrerte deg"
						json={registreringsinfoJson}
						journalfortDokumentTitel="Svarene_dine_fra_da_du_registrerte_deg.pdf"
						vedtakId={props.vedtakId}
						oyeblikksbildeType={OyblikksbildeType.REGISTRERINGSINFO}
						harJournalfortOyeblikksbilde={harJournalfortRegistreringOyeblikksbilde}
						ingenDataInfo="<b>Ingen registrerte data:</b> Personen har ikke registrert noen svar."
					/>
					<VedleggCard
						tittel="CV-en/jobbønskene dine på nav.no"
						json={cvOgJobbprofileJson}
						journalfortDokumentTitel="CV_og_jobbonsker.pdf"
						vedtakId={props.vedtakId}
						oyeblikksbildeType={OyblikksbildeType.CV_OG_JOBBPROFIL}
						harJournalfortOyeblikksbilde={harJournalfortCVOyeblikksbilde}
						ingenDataInfo="<b>Ingen registrerte data:</b> Personen har ikke registrert CV/jobbønsker."
					/>
					<VedleggCard
						tittel="Svarene dine om behov for veiledning"
						json={egenvurderingJson}
						journalfortDokumentTitel="Svarene_dine_om_behov_for_veiledning.pdf"
						vedtakId={props.vedtakId}
						oyeblikksbildeType={OyblikksbildeType.EGENVURDERING}
						harJournalfortOyeblikksbilde={harJournalfortEgenvurderingOyeblikksbilde}
						ingenDataInfo="<b>Ingen registrerte data:</b> Personen har ikke registrert svar om behov for veiledning."
					/>
				</section>
			</Page>
			<Footer className="oyblikksbilde-visning__footer">
				<Button size="small" onClick={() => changeView(ViewType.VEDTAK, { vedtakId: props.vedtakId })}>
					Tilbake til vedtak
				</Button>
			</Footer>
		</>
	);
}

function VedleggCard({
	tittel,
	json,
	journalfortDokumentTitel,
	vedtakId,
	oyeblikksbildeType,
	harJournalfortOyeblikksbilde,
	ingenDataInfo
}: {
	tittel: string;
	json: string | object | null;
	journalfortDokumentTitel: string;
	vedtakId: number;
	oyeblikksbildeType: string;
	harJournalfortOyeblikksbilde: boolean;
	ingenDataInfo: string;
}) {
	const { changeView } = useViewStore();
	const harIngenData =
		json === null ||
		(typeof json === 'string' && json.indexOf('ingenData') >= 0) ||
		(typeof json === 'object' && json.hasOwnProperty('ingenData'));
	const visOyeblikkbildePdf = (vedtakId: number, oyeblikksbildeType: string) => {
		changeView(ViewType.VEDTAK_OYEBLIKKSBILDE_PDF, { vedtakId: vedtakId, oyeblikksbildeType: oyeblikksbildeType });
		logMetrikk('vis-oyeblikksbilde-vedtak', { oyeblikksbildeType: oyeblikksbildeType });
	};

	return (
		<Card className="vedlegg-card">
			<Systemtittel tag="h2" className="vedlegg-card__header">
				{tittel}
			</Systemtittel>
			{harIngenData && ingenDataInfo}
			{!harIngenData && <JsonViewer json={json} className="oyblikksbilde-visning__json-visning" />}
			{harJournalfortOyeblikksbilde && (
				<div className="oyeblikk-pdf">
					<Link onClick={() => visOyeblikkbildePdf(vedtakId, oyeblikksbildeType)}>
						<div className="oyblikksbilde-visning-pdf-ikon">
							<FilePdfIkon title="a11y-title" height="1em" width="1em" fontSize="1.75rem" />
						</div>
						<BodyShort size="small" className="file_tittel">
							{journalfortDokumentTitel}
						</BodyShort>
					</Link>
				</div>
			)}
		</Card>
	);
}
