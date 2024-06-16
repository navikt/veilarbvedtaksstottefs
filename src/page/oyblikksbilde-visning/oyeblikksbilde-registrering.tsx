import { Systemtittel } from 'nav-frontend-typografi';
import { Alert, Link } from '@navikt/ds-react';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import {
	hentArbeidssokerRegistretOyblikksbilde,
	hentRegistreringOyblikksbilde
} from '../../api/veilarbvedtaksstotte/vedtak';
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
	profilertTilBeskrivelse,
	sisteStillingLabel,
	tilbakeIArbeidLabel,
	utdanningBestattSvarLabel,
	utdanningGodkjentSvarLabel,
	utdanningSvarLabel
} from './oyblikksbilde-fikser';
import { RegistreringDto } from './dto/RegistreringDto';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { visEnkelVerdi, visFlereVerdi } from './oyeblikksbilde-cv';
import { OpplysningerOmArbeidssokerMedProfilering } from './dto/OpplysningerOmArbeidssoekerMedProfilering';
import { lagHentTekstForSprak, SPORSMAL_TEKSTER, SporsmalId } from '@navikt/arbeidssokerregisteret-utils';

export function OyeblikksbildeRegistrering(props: { vedtakId: number }): JSX.Element {
	const registreringOyeblikksbildeFetcher = useAxiosFetcher(hentRegistreringOyblikksbilde);
	const arbeidssokerRegistretOyeblikksbildeFetcher = useAxiosFetcher(hentArbeidssokerRegistretOyblikksbilde);

	useEffect(() => {
		registreringOyeblikksbildeFetcher.fetch(props.vedtakId);
		arbeidssokerRegistretOyeblikksbildeFetcher.fetch(props.vedtakId);
		logMetrikk('vis-oyblikksbilde-registering');
		// eslint-disable-next-line
	}, [props.vedtakId]);

	if (registreringOyeblikksbildeFetcher.loading || arbeidssokerRegistretOyeblikksbildeFetcher.loading) {
		return <Spinner />;
	} else if (registreringOyeblikksbildeFetcher.error || arbeidssokerRegistretOyeblikksbildeFetcher.error) {
		return (
			<Alert variant="error" className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
	} else if (arbeidssokerRegistretOyeblikksbildeFetcher.data?.data) {
		try {
			return (
				<OyeblikksdataArbeidssokkerInnhold
					data={arbeidssokerRegistretOyeblikksbildeFetcher.data.data}
					erJournalfort={arbeidssokerRegistretOyeblikksbildeFetcher.data.journalfort}
					vedtakId={props.vedtakId}
				/>
			);
		} catch (error) {
			return (
				<Alert variant="error" className="vedtaksstotte-alert">
					{error}
				</Alert>
			);
		}
	} else if (registreringOyeblikksbildeFetcher.data?.data) {
		try {
			return (
				<OyeblikksdataRegistreringInnhold
					data={registreringOyeblikksbildeFetcher.data.data}
					erJournalfort={registreringOyeblikksbildeFetcher.data.journalfort}
					vedtakId={props.vedtakId}
				/>
			);
		} catch (error) {
			return (
				<Alert variant="error" className="vedtaksstotte-alert">
					{error}
				</Alert>
			);
		}
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
							{data?.besvarelse.utdanning &&
								visEnkelVerdi(
									'Hva er din høyeste fullførte utdanning?',
									utdanningSvarLabel(data?.besvarelse.utdanning)
								)}

							{data?.besvarelse.utdanningBestatt &&
								visEnkelVerdi(
									'Er utdanningen din bestått?',
									utdanningBestattSvarLabel(data?.besvarelse.utdanningBestatt)
								)}

							{data?.besvarelse.utdanningGodkjent &&
								visEnkelVerdi(
									'Er utdanningen din godkjent i Norge?',
									utdanningGodkjentSvarLabel(data?.besvarelse.utdanningGodkjent)
								)}

							{data?.besvarelse.helseHinder &&
								visEnkelVerdi(
									'Har du helseproblemer som hindrer deg i å søke eller være i jobb?',
									helseHinderLabel(data?.besvarelse.helseHinder)
								)}

							{data?.besvarelse.andreForhold &&
								visEnkelVerdi(
									'Har du andre problemer med å søke eller være i jobb?',
									andreForholdLabel(data?.besvarelse.andreForhold)
								)}

							{data?.besvarelse.sisteStilling &&
								visEnkelVerdi(
									'Hva er din siste jobb?',
									sisteStillingLabel(data?.besvarelse.sisteStilling)
								)}

							{data?.besvarelse.dinSituasjon &&
								visEnkelVerdi(
									'Hvilken jobbsituasjon passer best?',
									dinSituasjonLabel(data?.besvarelse.dinSituasjon)
								)}

							{data?.besvarelse.fremtidigSituasjon &&
								visEnkelVerdi(
									'Hva tenker du om din fremtidige situasjon?',
									fremtidigSituasjonLabel(data?.besvarelse.fremtidigSituasjon)
								)}

							{data?.besvarelse.tilbakeIArbeid &&
								visEnkelVerdi(
									'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
									tilbakeIArbeidLabel(data?.besvarelse.tilbakeIArbeid)
								)}
						</div>
					</>
				)}

				{data?.teksterForBesvarelse && data?.teksterForBesvarelse.length > 0 && (
					<div className="json-array-wrapper">
						<h3 className="json-key">Tekster for besvarelse</h3>
						<ul className="json-array">
							{data.teksterForBesvarelse.map((besvarelse, i) => (
								<li key={'teksterForBesvarelse-' + i}>
									{besvarelse.sporsmal && visEnkelVerdi('Spørsmål', besvarelse.sporsmal)}
									{besvarelse.sporsmal && visEnkelVerdi('Svar', besvarelse.svar)}
								</li>
							))}
						</ul>
					</div>
				)}

				{data?.sisteStilling && (
					<>
						<h3 className="json-key">Siste stilling</h3>
						<div className="json-obj">
							{data.sisteStilling.label && visEnkelVerdi('Stilling', data.sisteStilling.label)}
						</div>
					</>
				)}

				{data?.profilering && (
					<>
						<h3 className="json-key">Profilering</h3>
						<div className="json-obj">
							{data.profilering.innsatsgruppe &&
								visEnkelVerdi('Innsatsgruppe', innsatsgruppeLabel(data.profilering.innsatsgruppe))}

							{data.profilering.alder && visEnkelVerdi('Alder', data.profilering.alder)}

							{data.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder !== null &&
								visEnkelVerdi(
									'Jobbet sammenhengende seks av tolv siste måneder',
									data.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder ? 'Ja' : 'Nei'
								)}
						</div>
					</>
				)}

				{data?.manueltRegistrertAv && (
					<div className="json-obj">
						{data.manueltRegistrertAv.ident &&
							visEnkelVerdi('Registrert av ident', data.manueltRegistrertAv.ident)}

						{data.manueltRegistrertAv.enhet && visEnkelVerdi('Enhet', data.manueltRegistrertAv.enhet?.navn)}
					</div>
				)}
			</div>
			{props.erJournalfort && (
				<div className="oyeblikk-pdf">
					<Link
						href="#"
						onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.REGISTRERINGSINFO)}
						className="oyeblikksbilde-visning__pdf-lenke"
					>
						<FilePdfIcon className="oyeblikksbilde-visning__pdf-ikon" aria-hidden />
						Svarene_dine_fra_da_du_registrerte_deg.pdf
					</Link>
				</div>
			)}
		</Card>
	);
}

function OyeblikksdataArbeidssokkerInnhold(props: {
	data: OpplysningerOmArbeidssokerMedProfilering | null;
	erJournalfort: boolean;
	vedtakId: number;
}) {
	const { changeView } = useViewStore();

	const visOyeblikkbildePdf = (vedtakId: number, oyeblikksbildeType: string) => {
		changeView(ViewType.VEDTAK_OYEBLIKKSBILDE_PDF, { vedtakId: vedtakId, oyeblikksbildeType: oyeblikksbildeType });
		logMetrikk('vis-oyeblikksbilde-vedtak', { oyeblikksbildeType: oyeblikksbildeType });
	};

	const data = props.data;
	const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, 'nb');

	return (
		<Card className="vedlegg-card">
			<Systemtittel tag="h2" className="vedlegg-card__header">
				Svarene dine fra da du registrerte deg
			</Systemtittel>
			<div className="innhold">
				{data == null && (
					<>
						<b>Ingen registrerte data:</b> Brukeren har ikke registrert seg via den nye
						registreringsløsningen.
					</>
				)}
				{data?.arbeidssoekerperiodeStartet && (
					<>
						<span className="json-key">Opprettet dato: </span>
						{formatDates(data.arbeidssoekerperiodeStartet)}
					</>
				)}
				{data?.opplysningerOmArbeidssoeker && (
					<>
						<h3 className="json-key">Besvarelse</h3>
						<div className="json-obj">
							{data?.opplysningerOmArbeidssoeker.utdanning.nus &&
								visEnkelVerdi(
									tekst(SporsmalId.utdanning),
									tekst(data.opplysningerOmArbeidssoeker.utdanning.nus)
								)}

							{data?.opplysningerOmArbeidssoeker.utdanning.bestaatt &&
								visEnkelVerdi(
									tekst(SporsmalId.utdanningBestatt),
									tekst(data.opplysningerOmArbeidssoeker.utdanning.bestaatt)
								)}

							{data?.opplysningerOmArbeidssoeker.utdanning.godkjent &&
								visEnkelVerdi(
									tekst(SporsmalId.utdanningGodkjent),
									tekst(data.opplysningerOmArbeidssoeker.utdanning.godkjent)
								)}

							{data?.opplysningerOmArbeidssoeker.jobbsituasjon &&
								visFlereVerdi(
									tekst(SporsmalId.dinSituasjon),
									data.opplysningerOmArbeidssoeker.jobbsituasjon.map(situasjon =>
										tekst(situasjon.beskrivelse)
									)
								)}

							{data?.opplysningerOmArbeidssoeker.annet.andreForholdHindrerArbeid &&
								visEnkelVerdi(
									tekst(SporsmalId.andreForhold),
									tekst(data.opplysningerOmArbeidssoeker.annet.andreForholdHindrerArbeid)
								)}

							{data?.opplysningerOmArbeidssoeker.helse.helsetilstandHindrerArbeid &&
								visEnkelVerdi(
									tekst(SporsmalId.helseHinder),
									tekst(data.opplysningerOmArbeidssoeker.helse.helsetilstandHindrerArbeid)
								)}
						</div>
					</>
				)}

				{data?.profilering && (
					<>
						<h3 className="json-key">Profilering</h3>
						<div className="json-obj">
							{data.profilering.profilertTil &&
								visEnkelVerdi(
									'Forslag om brukers muligheter og behov (resultat fra profilering)',
									profilertTilBeskrivelse(data.profilering.profilertTil)
								)}

							{data.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder !== null &&
								visEnkelVerdi(
									'Brukeren har vært sammenhengende i jobb minst 6 av de siste 12 måneder',
									data.profilering.jobbetSammenhengendeSeksAvTolvSisteManeder ? 'Ja' : 'Nei'
								)}
						</div>
					</>
				)}

				{data?.opplysningerOmArbeidssoeker?.sendtInnAv.utfoertAv.type === 'VEILEDER' && (
					<div className="json-obj">
						{data?.opplysningerOmArbeidssoeker.sendtInnAv.utfoertAv.id &&
							visEnkelVerdi(
								'Registrert av ident',
								data?.opplysningerOmArbeidssoeker.sendtInnAv.utfoertAv.id
							)}
					</div>
				)}
			</div>
			{props.erJournalfort && (
				<div className="oyeblikk-pdf">
					<Link
						href="#"
						onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.ARBEIDSSOKKERREGISTRET)}
						className="oyeblikksbilde-visning__pdf-lenke"
					>
						<FilePdfIcon className="oyeblikksbilde-visning__pdf-ikon" aria-hidden />
						Svarene_dine_fra_da_du_registrerte_deg.pdf
					</Link>
				</div>
			)}
		</Card>
	);
}
