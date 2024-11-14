import { useEffect } from 'react';
import Spinner from '../../component/spinner/spinner';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import {
	hentArbeidssokerRegistretOyblikksbilde,
	hentRegistreringOyblikksbilde
} from '../../api/veilarbvedtaksstotte/vedtak';
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
} from './oyeblikksbilde-fikser';
import { RegistreringDto } from './dto/RegistreringDto';
import { visEnkelVerdi, visFlereVerdi } from './oyeblikksbilde-cv';
import { OpplysningerOmArbeidssokerMedProfilering } from './dto/OpplysningerOmArbeidssoekerMedProfilering';
import { lagHentTekstForSprak, SPORSMAL_TEKSTER, SporsmalId } from '@navikt/arbeidssokerregisteret-utils';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading } from '@navikt/ds-react';

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
			<Alert variant="error">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
	} else if (arbeidssokerRegistretOyeblikksbildeFetcher.data?.data) {
		try {
			return (
				<OyeblikksdataArbeidssokerInnhold
					data={arbeidssokerRegistretOyeblikksbildeFetcher.data.data}
					erJournalfort={arbeidssokerRegistretOyeblikksbildeFetcher.data.journalfort}
					vedtakId={props.vedtakId}
				/>
			);
		} catch (error) {
			return <Alert variant="error">{error}</Alert>;
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
			return <Alert variant="error">{error}</Alert>;
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
			<Heading size="medium" level="2" spacing>
				Svarene dine fra da du registrerte deg
			</Heading>
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
							visEnkelVerdi('Hva er din siste jobb?', sisteStillingLabel(data?.besvarelse.sisteStilling))}

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
			{props.erJournalfort && (
				<Button
					variant="tertiary"
					icon={<FilePdfIcon />}
					onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.REGISTRERINGSINFO)}
				>
					Svarene_dine_fra_da_du_registrerte_deg.pdf
				</Button>
			)}
		</Card>
	);
}

function OyeblikksdataArbeidssokerInnhold(props: {
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
			<Heading size="medium" level="2" spacing>
				Det du fortalte oss da du ble registrert som arbeidssøker
			</Heading>
			{(data == null || (data.opplysningerOmArbeidssoeker == null && data.profilering == null)) && (
				<>
					<b>Ingen registrerte data:</b> Personen har ikke registrert seg i Arbeidssøkerregisteret og har ikke
					en aktiv arbeidssøkerperiode.
				</>
			)}
			{data?.arbeidssoekerperiodeStartet &&
				visEnkelVerdi('Registrert', formatDates(data.arbeidssoekerperiodeStartet))}

			{data?.opplysningerOmArbeidssoeker?.sendtInnAv &&
				visEnkelVerdi('Sist oppdatert', formatDates(data.opplysningerOmArbeidssoeker.sendtInnAv.tidspunkt))}

			{data?.opplysningerOmArbeidssoeker?.sendtInnAv.utfoertAv.type === 'VEILEDER' &&
				data?.opplysningerOmArbeidssoeker.sendtInnAv.utfoertAv.id &&
				visEnkelVerdi('Sist oppdatert av', data?.opplysningerOmArbeidssoeker.sendtInnAv.utfoertAv.id)}
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
			{props.erJournalfort && (
				<Button
					variant="tertiary"
					icon={<FilePdfIcon />}
					onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.ARBEIDSSOKERREGISTRET)}
				>
					Det_du_fortalte_oss_da_du_ble_registrert_som_arbeidssoker.pdf
				</Button>
			)}
		</Card>
	);
}
