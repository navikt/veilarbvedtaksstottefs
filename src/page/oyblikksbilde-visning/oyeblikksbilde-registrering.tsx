import { Systemtittel } from 'nav-frontend-typografi';
import { Alert, BodyShort, Link } from '@navikt/ds-react';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { ReactComponent as FilePdfIkon } from './icons/filepdficon.svg';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentRegistreringOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { useEffect } from 'react';
import Spinner from '../../component/spinner/spinner';
import { logMetrikk } from '../../util/logger';
import { useViewStore, ViewType } from '../../store/view-store';
import {
	andreForholdLabel,
	dinSituasjonLabel,
	formatDates,
	fremtidigSituasjonLabel,
	helseHinderLabel,
	innsatsgruppeLabel,
	sisteStillingLabel,
	tilbakeIArbeidLabel,
	utdanningBestattSvarLabel,
	utdanningGodkjentSvarLabel,
	utdanningSvarLabel
} from './oyblikksbilde-fikser';
import './css/json-viewer.less';
import { RegistreringDto } from './dto/RegistreringDto';

export function OyeblikksbildeRegistrering(props: { vedtakId: number }): JSX.Element {
	const oyeblikksbildeFetcher = useAxiosFetcher(hentRegistreringOyblikksbilde);

	useEffect(() => {
		oyeblikksbildeFetcher.fetch(props.vedtakId);
		logMetrikk('vis-oyblikksbilde-registering');
		// eslint-disable-next-line
	}, [props.vedtakId]);

	if (oyeblikksbildeFetcher.loading) {
		return <Spinner />;
	} else if (oyeblikksbildeFetcher.error) {
		return (
			<Alert variant="error" className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
	} else if (oyeblikksbildeFetcher.data) {
		return (
			<OyeblikksdataRegistreringInnhold
				data={oyeblikksbildeFetcher.data.data}
				erJournalfort={oyeblikksbildeFetcher.data.journalfort}
				vedtakId={props.vedtakId}
			/>
		);
	} else {
		return <></>;
	}
}

function OyeblikksdataRegistreringInnhold(props: {
	data: RegistreringDto | null;
	erJournalfort: boolean;
	vedtakId: number;
}) {
	const { changeView } = useViewStore();

	const visOyeblikkbildePdf = (vedtakId: number, oyeblikksbildeType: string) => {
		changeView(ViewType.VEDTAK_OYEBLIKKSBILDE_PDF, { vedtakId: vedtakId, oyeblikksbildeType: oyeblikksbildeType });
		logMetrikk('vis-oyeblikksbilde-vedtak', { oyeblikksbildeType: oyeblikksbildeType });
	};

	const data = props.data?.registrering;

	return (
		<Card className="vedlegg-card">
			<Systemtittel tag="h2" className="vedlegg-card__header">
				Svarene dine fra da du registrerte deg
			</Systemtittel>
			<div className="innhold">
				{data == null && (
					<>
						<b>Ingen registrerte data:</b> Personen har ikke registrert noen svar.
					</>
				)}
				{data?.opprettetDato && (
					<>
						<span className="json-key">Opprettet dato: </span>
						{formatDates(data.opprettetDato)}
					</>
				)}
				{data?.besvarelse && (
					<>
						<h3 className="json-key">Besvarelse</h3>
						<div className="json-obj">
							{data?.besvarelse.utdanning && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Hva er din høyeste fullførte utdanning? </span>
										<span>{utdanningSvarLabel(data?.besvarelse.utdanning)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.utdanningBestatt && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Er utdanningen din bestått? </span>
										<span>{utdanningBestattSvarLabel(data?.besvarelse.utdanningBestatt)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.utdanningGodkjent && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Er utdanningen din godkjent i Norge? </span>
										<span>{utdanningGodkjentSvarLabel(data?.besvarelse.utdanningGodkjent)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.helseHinder && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">
											Har du helseproblemer som hindrer deg i å søke eller være i jobb?{' '}
										</span>
										<span>{helseHinderLabel(data?.besvarelse.helseHinder)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.andreForhold && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">
											Har du andre problemer med å søke eller være i jobb?{' '}
										</span>
										<span>{andreForholdLabel(data?.besvarelse.andreForhold)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.sisteStilling && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Hva er din siste jobb? </span>
										<span>{sisteStillingLabel(data?.besvarelse.sisteStilling)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.dinSituasjon && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Hvilken jobbsituasjon passer best? </span>
										<span>{dinSituasjonLabel(data?.besvarelse.dinSituasjon)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.fremtidigSituasjon && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Hva tenker du om din fremtidige situasjon? </span>
										<span>{fremtidigSituasjonLabel(data?.besvarelse.fremtidigSituasjon)}</span>
									</div>
								</>
							)}

							{data?.besvarelse.tilbakeIArbeid && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">
											Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?{' '}
										</span>
										<span>{tilbakeIArbeidLabel(data?.besvarelse.tilbakeIArbeid)}</span>
									</div>
								</>
							)}
						</div>
					</>
				)}

				{data?.teksterForBesvarelse && (
					<>
						<div className="json-array-wrapper">
							<h3 className="json-key">Tekster for besvarelse</h3>
							<ul className="json-array">
								{data.teksterForBesvarelse.map((besvarelse, i) => (
									<>
										<li key={i}>
											<div className="json-key-wrapper">
												<span className="json-key">Spørsmål: </span>
												<span>{besvarelse.sporsmal}</span>
											</div>
											<div className="json-key-wrapper">
												<span className="json-key">Svar: </span>
												<span>{besvarelse.svar}</span>
											</div>
										</li>
									</>
								))}
							</ul>
						</div>
					</>
				)}

				{data?.sisteStilling && (
					<>
						<h3 className="json-key">Siste stilling</h3>
						<div className="json-obj">
							<div className="json-key-wrapper">
								<span className="json-key">Stilling: </span>
								<span>{data.sisteStilling.label}</span>
							</div>
						</div>
					</>
				)}

				{data?.profilering && (
					<>
						<h3 className="json-key">Profilering</h3>
						<div className="json-obj">
							{data.profilering.innsatsgruppe && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Innsatsgruppe: </span>
										<span>{innsatsgruppeLabel(data.profilering.innsatsgruppe)}</span>
									</div>
								</>
							)}

							{data.profilering.alder && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">Alder: </span>
										<span>{data.profilering.alder}</span>
									</div>
								</>
							)}

							{data.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder && (
								<>
									<div className="json-key-wrapper">
										<span className="json-key">
											Jobbet sammenhengende seks av tolv siste måneder:{' '}
										</span>
										<span>{data.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder}</span>
									</div>
								</>
							)}
						</div>
					</>
				)}

				{data?.manueltRegistrertAv && (
					<>
						<div className="json-obj">
							<div className="json-key-wrapper">
								<span className="json-key">Registrert av ident: </span>
								<span>{data.manueltRegistrertAv.ident}</span>
							</div>
							<div className="json-key-wrapper">
								<span className="json-key">Enhet: </span>
								<span>{data.manueltRegistrertAv.enhet}</span>
							</div>
						</div>
					</>
				)}
			</div>
			{props.erJournalfort && (
				<div className="oyeblikk-pdf">
					<Link onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.REGISTRERINGSINFO)}>
						<div className="oyblikksbilde-visning-pdf-ikon">
							<FilePdfIkon title="a11y-title" height="1em" width="1em" fontSize="1.75rem" />
						</div>
						<BodyShort size="small" className="file_tittel">
							Svarene_dine_fra_da_du_registrerte_deg.pdf
						</BodyShort>
					</Link>
				</div>
			)}
		</Card>
	);
}
