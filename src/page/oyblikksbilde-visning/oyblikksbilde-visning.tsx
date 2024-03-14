import { useEffect } from 'react';
import { Oyblikksbilde } from '../../util/type/oyblikksbilde';
import Card from '../../component/card/card';
import { OrNothing } from '../../util/type/ornothing';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import Page from '../../component/page/page';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import Footer from '../../component/footer/footer';
import { useViewStore, ViewType } from '../../store/view-store';
import Spinner from '../../component/spinner/spinner';
import { logMetrikk } from '../../util/logger';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { Alert, Button } from '@navikt/ds-react';
import './oyblikksbilde-visning.less';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { useDataStore } from '../../store/data-store';
import { Vedtak } from '../../api/veilarbvedtaksstotte';

function finnOyblikksbilde(
	oyblikksbildeType: OyblikksbildeType,
	oyblikksbilder: OrNothing<Oyblikksbilde[]>
): string | null {
	const oyblikksbilde = oyblikksbilder ? oyblikksbilder.find(o => o.oyeblikksbildeType === oyblikksbildeType) : null;
	return oyblikksbilde ? oyblikksbilde.htmlView : null;
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
	const { fattedeVedtak } = useDataStore();
	const vistVedtak = fattedeVedtak.find((v: Vedtak) => v.id === props.vedtakId);

	const visCvVedleggCard =
		vistVedtak !== undefined && vistVedtak.opplysninger.filter(kilde => kilde.includes('CV-en')).length > 0;
	const visRegistreringVedleggCard =
		vistVedtak !== undefined &&
		vistVedtak.opplysninger.filter(kilde => kilde.includes('registrerte deg')).length > 0;
	const visEgenvurderingVedleggCard =
		vistVedtak !== undefined &&
		vistVedtak.opplysninger.filter(kilde => kilde.includes('behov for veiledning')).length > 0;

	const cvOgJobbprofileHtmlView = finnOyblikksbilde(OyblikksbildeType.CV_OG_JOBBPROFIL, props.oyeblikksbilde);
	const registreringsinfoHtmlView = finnOyblikksbilde(OyblikksbildeType.REGISTRERINGSINFO, props.oyeblikksbilde);
	const egenvurderingHtmlView = finnOyblikksbilde(OyblikksbildeType.EGENVURDERING, props.oyeblikksbilde);

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

					{visRegistreringVedleggCard && (
						<VedleggCard
							tittel="Svarene dine fra da du registrerte deg"
							htmlView={registreringsinfoHtmlView}
							journalfortDokumentTitel="Svarene_dine_fra_da_du_registrerte_deg.pdf"
							vedtakId={props.vedtakId}
							oyeblikksbildeType={OyblikksbildeType.REGISTRERINGSINFO}
							harJournalfortOyeblikksbilde={harJournalfortRegistreringOyeblikksbilde}
						/>
					)}
					{visCvVedleggCard && (
						<VedleggCard
							tittel="CV-en/jobbønskene dine på nav.no"
							htmlView={cvOgJobbprofileHtmlView}
							journalfortDokumentTitel="CV_og_jobbonsker.pdf"
							vedtakId={props.vedtakId}
							oyeblikksbildeType={OyblikksbildeType.CV_OG_JOBBPROFIL}
							harJournalfortOyeblikksbilde={harJournalfortCVOyeblikksbilde}
						/>
					)}
					{visEgenvurderingVedleggCard && (
						<VedleggCard
							tittel="Svarene dine om behov for veiledning"
							htmlView={egenvurderingHtmlView}
							journalfortDokumentTitel="Svarene_dine_om_behov_for_veiledning.pdf"
							vedtakId={props.vedtakId}
							oyeblikksbildeType={OyblikksbildeType.EGENVURDERING}
							harJournalfortOyeblikksbilde={harJournalfortEgenvurderingOyeblikksbilde}
						/>
					)}
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
	htmlView,
	journalfortDokumentTitel,
	vedtakId,
	oyeblikksbildeType,
	harJournalfortOyeblikksbilde
}: {
	tittel: string;
	htmlView: string | null;
	journalfortDokumentTitel: string;
	vedtakId: number;
	oyeblikksbildeType: string;
	harJournalfortOyeblikksbilde: boolean;
}) {
	const { changeView } = useViewStore();
	const visOyeblikkbildePdf = (vedtakId: number, oyeblikksbildeType: string) => {
		changeView(ViewType.VEDTAK_OYEBLIKKSBILDE_PDF, { vedtakId: vedtakId, oyeblikksbildeType: oyeblikksbildeType });
		logMetrikk('vis-oyeblikksbilde-vedtak', { oyeblikksbildeType: oyeblikksbildeType });
	};

	return (
		<Card className="vedlegg-card">
			<Systemtittel tag="h2" className="vedlegg-card__header">
				{tittel}
			</Systemtittel>

			<div className="oyblikksbilde-visning__json-visning" dangerouslySetInnerHTML={{ __html: htmlView! }} />

			{harJournalfortOyeblikksbilde && (
				<Button
					size="small"
					variant="tertiary"
					onClick={() => visOyeblikkbildePdf(vedtakId, oyeblikksbildeType)}
					icon={<FilePdfIcon />}
				>
					{journalfortDokumentTitel}
				</Button>
			)}
		</Card>
	);
}
