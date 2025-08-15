import { useEffect, type JSX } from 'react';
import { Button, Heading } from '@navikt/ds-react';
import { FilePdfIcon } from '@navikt/aksel-icons';
import Spinner from '../../component/spinner/spinner';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentCvOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { CvDto } from './dto/CvDto';
import { logMetrikk } from '../../util/logger';
import { useViewStore, ViewType } from '../../store/view-store';
import {
	ansettelsestypeLabel,
	fagdokumentTypeLabel,
	formatDates,
	formatVarighet,
	onsketArbeidsskiftordningLabel,
	onsketArbeidstidsordningLabel,
	oppstartLabel,
	spraakNivoLabel
} from './oyeblikksbilde-fikser';
import { EMDASH } from '../../util';
import { IkkeKontaktMedBaksystemFeilmelding } from '../../component/feilmelding/ikke-kontakt-med-baksystem-feilmelding';

export function OyeblikksbildeCv(props: { vedtakId: number }): JSX.Element {
	const oyeblikksbildeFetcher = useAxiosFetcher(hentCvOyblikksbilde);

	useEffect(() => {
		oyeblikksbildeFetcher.fetch(props.vedtakId);
		logMetrikk('vis-oyblikksbilde-cv');
		// eslint-disable-next-line
	}, [props.vedtakId]);

	if (oyeblikksbildeFetcher.loading) {
		return <Spinner />;
	} else if (oyeblikksbildeFetcher.error) {
		return <IkkeKontaktMedBaksystemFeilmelding />;
	} else if (oyeblikksbildeFetcher.data) {
		return (
			<OyeblikksdataCvInnhold
				data={oyeblikksbildeFetcher.data.data}
				erJournalfort={oyeblikksbildeFetcher.data.journalfort}
				vedtakId={props.vedtakId}
			/>
		);
	} else {
		return <></>;
	}
}

export const visEnkelVerdi = (tittel: string, verdi: string | undefined) => {
	return (
		<div className="json-key-wrapper">
			<span className="json-key">{tittel}: </span>
			<span>{verdi}</span>
		</div>
	);
};

export const visFlereVerdi = (tittel: string, verdi: string[] | undefined) => {
	return (
		<div className="json-key-wrapper">
			<span className="json-key">{tittel}: </span>
			{verdi !== undefined && verdi.length > 0 ? (
				verdi.map(key => <span key={key}>{key ?? EMDASH}</span>)
			) : (
				<span>{EMDASH}</span>
			)}
		</div>
	);
};

function OyeblikksdataCvInnhold(props: { data: CvDto | null; erJournalfort: boolean; vedtakId: number }) {
	const { changeView } = useViewStore();

	const visOyeblikkbildePdf = (vedtakId: number, oyeblikksbildeType: string) => {
		changeView(ViewType.VEDTAK_OYEBLIKKSBILDE_PDF, { vedtakId: vedtakId, oyeblikksbildeType: oyeblikksbildeType });
		logMetrikk('vis-oyeblikksbilde-vedtak', { oyeblikksbildeType: oyeblikksbildeType });
	};

	const data = props.data;

	return (
		<Card className="vedlegg-card">
			<Heading size="medium" level="2" spacing>
				CV-en/jobbønskene dine på nav.no
			</Heading>
			{(data == null || data.sistEndret == null) && (
				<>
					<b>Ingen registrerte data:</b> Personen har ikke registrert CV/jobbønsker.
				</>
			)}
			{data?.sistEndret && (
				<>
					<span className="json-key">Sist oppdatert: </span>
					{formatDates(data.sistEndret)}
				</>
			)}
			{data?.sammendrag && (
				<>
					<br />
					<span className="json-key">Sammendrag: </span>
					{data.sammendrag}
				</>
			)}
			{data?.utdanning && data.utdanning.length > 0 && (
				<>
					<Heading level="3" size="small">
						Utdanning
					</Heading>
					<ul className="json-array">
						{data.utdanning.map((utdanning, i) => (
							<li key={'utdanning-' + i}>
								{utdanning.tittel && visEnkelVerdi('Tittel', utdanning.tittel)}

								{utdanning.studiested && visEnkelVerdi('Sted', utdanning.studiested)}

								{utdanning.utdanningsnivaa &&
									visEnkelVerdi('Utdanningsnivå', utdanning.utdanningsnivaa)}

								{utdanning.fraDato && visEnkelVerdi('Fra dato', formatDates(utdanning.fraDato))}

								{utdanning.tilDato && visEnkelVerdi('Til dato', formatDates(utdanning.tilDato))}

								{utdanning.beskrivelse && visEnkelVerdi('Beskrivelse', utdanning.beskrivelse)}
							</li>
						))}
					</ul>
				</>
			)}
			{data?.arbeidserfaring && data?.arbeidserfaring.length > 0 && (
				<>
					<Heading level="3" size="small">
						Arbeidserfaring
					</Heading>
					<ul className="json-array">
						{data.arbeidserfaring.map((arbeidserfaring, i) => (
							<li key={'arbeidserfaring-' + i}>
								{arbeidserfaring.tittel && visEnkelVerdi('Tittel', arbeidserfaring.tittel)}

								{arbeidserfaring.arbeidsgiver &&
									visEnkelVerdi('Arbeidsgiver', arbeidserfaring.arbeidsgiver)}

								{arbeidserfaring.sted && visEnkelVerdi('Sted', arbeidserfaring.sted)}

								{arbeidserfaring.fraDato &&
									visEnkelVerdi('Fra dato', formatDates(arbeidserfaring.fraDato))}

								{arbeidserfaring.tilDato &&
									visEnkelVerdi('Til dato', formatDates(arbeidserfaring.tilDato))}

								{arbeidserfaring.beskrivelse &&
									visEnkelVerdi('Beskrivelse', arbeidserfaring.beskrivelse)}
							</li>
						))}
					</ul>
				</>
			)}

			{data?.fagdokumentasjoner && data?.fagdokumentasjoner.length > 0 && (
				<>
					<Heading level="3" size="small">
						Fagdokumentasjoner
					</Heading>
					<ul className="json-array">
						{data.fagdokumentasjoner.map((fagdokumentasjon, i) => (
							<li key={'fagdokumentasjoner-' + i}>
								{fagdokumentasjon.tittel && visEnkelVerdi('Tittel', fagdokumentasjon.tittel)}

								{fagdokumentasjon.type &&
									visEnkelVerdi('Type', fagdokumentTypeLabel(fagdokumentasjon.type))}
							</li>
						))}
					</ul>
				</>
			)}

			{data?.jobbprofil?.kompetanse && data?.jobbprofil?.kompetanse.length > 0 && (
				<>
					<Heading level="3" size="small">
						Kompetanse
					</Heading>
					<ul className="json-array">
						<li key={'kompetanse-1'}>
							{visEnkelVerdi('Tittel', data?.jobbprofil?.kompetanse.map(x => x.tittel).join(', '))}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.onsketYrke && data?.jobbprofil?.onsketYrke.length > 0 && (
				<>
					<Heading level="3" size="small">
						Ønsket yrke
					</Heading>
					<ul className="json-array">
						<li key={'onsketYrke-1'}>
							{visEnkelVerdi('Tittel', data?.jobbprofil?.onsketYrke.map(x => x.tittel).join(', '))}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.onsketArbeidssted && data?.jobbprofil?.onsketArbeidssted.length > 0 && (
				<>
					<Heading level="3" size="small">
						Ønsket arbeidssted
					</Heading>
					<ul className="json-array">
						<li key={'onsketArbeidssted-1'}>
							{visEnkelVerdi(
								'Stedsnavn',
								data?.jobbprofil?.onsketArbeidssted.map(x => x.stedsnavn).join(', ')
							)}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.onsketAnsettelsesform && data?.jobbprofil?.onsketAnsettelsesform.length > 0 && (
				<>
					<Heading level="3" size="small">
						Ønsket ansettelsesform
					</Heading>
					<ul className="json-array">
						<li key={'onsketAnsettelsesform-1'}>
							{visEnkelVerdi(
								'Tittel',
								data?.jobbprofil?.onsketAnsettelsesform
									.map(x => ansettelsestypeLabel(x.tittel))
									.join(', ')
							)}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.onsketArbeidstidsordning && data?.jobbprofil?.onsketArbeidstidsordning.length > 0 && (
				<>
					<Heading level="3" size="small">
						Ønsket arbeidstidsordning
					</Heading>
					<ul className="json-array">
						<li key={'onsketArbeidstidsordning-1'}>
							{visEnkelVerdi(
								'Tittel',
								data?.jobbprofil?.onsketArbeidstidsordning
									.map(x => onsketArbeidstidsordningLabel(x.tittel))
									.join(', ')
							)}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.onsketArbeidsdagordning && data?.jobbprofil?.onsketArbeidsdagordning.length > 0 && (
				<>
					<Heading level="3" size="small">
						Ønsket arbeidsdagordning
					</Heading>
					<ul className="json-array">
						<li key={'onsketArbeidsdagordning-1'}>
							{visEnkelVerdi(
								'Tittel',
								data?.jobbprofil?.onsketArbeidsdagordning
									.map(x => onsketArbeidstidsordningLabel(x.tittel))
									.join(', ')
							)}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.onsketArbeidsskiftordning && data?.jobbprofil?.onsketArbeidsskiftordning.length > 0 && (
				<>
					<Heading level="3" size="small">
						Ønsket arbeidsskiftordning
					</Heading>
					<ul className="json-array">
						<li key={'onsketArbeidsskiftordning-1'}>
							{visEnkelVerdi(
								'Tittel',
								data?.jobbprofil?.onsketArbeidsskiftordning
									.map(x => onsketArbeidsskiftordningLabel(x.tittel))
									.join(', ')
							)}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.heltidDeltid && (
				<>
					<Heading level="3" size="small">
						Heltid eller deltid
					</Heading>
					<ul className="json-array">
						<li key={'heltidDeltid-1'}>
							{data?.jobbprofil?.heltidDeltid.heltid && visEnkelVerdi('Heltid', 'Ja')}
							{data?.jobbprofil?.heltidDeltid.deltid && visEnkelVerdi('Deltid', 'Ja')}
						</li>
					</ul>
				</>
			)}

			{data?.jobbprofil?.oppstart && (
				<>
					<Heading level="3" size="small">
						Oppstart
					</Heading>
					<ul className="json-array">
						<li key={'oppstart-1'}>{visEnkelVerdi('Oppstart', oppstartLabel(data.jobbprofil.oppstart))}</li>
					</ul>
				</>
			)}

			{data?.sprak && data?.sprak.length > 0 && (
				<>
					<Heading level="3" size="small">
						Språk
					</Heading>
					<ul className="json-array">
						{data.sprak.map((sprak, i) => (
							<li key={'sprak-' + i}>
								{sprak.sprak && visEnkelVerdi('Språk', sprak.sprak)}

								{sprak.muntligNiva && visEnkelVerdi('Muntlig', spraakNivoLabel(sprak.muntligNiva))}

								{sprak.skriftligNiva &&
									visEnkelVerdi('Skriftlig', spraakNivoLabel(sprak.skriftligNiva))}
							</li>
						))}
					</ul>
				</>
			)}

			{data?.kurs && data?.kurs.length > 0 && (
				<>
					<Heading level="3" size="small">
						Kurs
					</Heading>
					<ul className="json-array">
						{data.kurs.map((kurs, i) => (
							<li key={'kurs-' + i}>
								{kurs.tittel && visEnkelVerdi('Tittel', kurs.tittel)}

								{kurs.arrangor && visEnkelVerdi('Arrangør', kurs.arrangor)}

								{kurs.tidspunkt && visEnkelVerdi('Fullført', formatDates(kurs.tidspunkt))}

								{kurs.varighet &&
									visEnkelVerdi(
										'Kurslengde',
										kurs.varighet.varighet +
											' ' +
											formatVarighet(kurs.varighet.varighet, kurs.varighet.tidsenhet)
									)}
							</li>
						))}
					</ul>
				</>
			)}

			{data?.forerkort && data?.forerkort.length > 0 && (
				<>
					<Heading level="3" size="small">
						Førerkort
					</Heading>
					<ul className="json-array">
						{data.forerkort.map((forerkort, i) => (
							<li key={'forerkort-' + i}>
								{forerkort.klasse && visEnkelVerdi('Klasse', forerkort.klasse)}
							</li>
						))}
					</ul>
				</>
			)}

			{data?.annenErfaring && data?.annenErfaring.length > 0 && (
				<>
					<Heading level="3" size="small">
						Annen erfaring
					</Heading>
					<ul className="json-array">
						{data.annenErfaring.map((erfaring, i) => (
							<li key={'annenErfaring-' + i}>
								{erfaring.rolle && visEnkelVerdi('Rolle', erfaring.rolle)}

								{erfaring.beskrivelse && visEnkelVerdi('Beskrivelse', erfaring.beskrivelse)}

								{erfaring.fraDato && visEnkelVerdi('Startdato', formatDates(erfaring.fraDato))}

								{erfaring.tilDato && visEnkelVerdi('Sluttdato', formatDates(erfaring.tilDato))}
							</li>
						))}
					</ul>
				</>
			)}

			{data?.godkjenninger && data?.godkjenninger.length > 0 && (
				<>
					<Heading level="3" size="small">
						Godkjenninger
					</Heading>
					<ul className="json-array">
						{data.godkjenninger.map((godkjenning, i) => (
							<li key={'godkjenninger-' + i}>
								{godkjenning.tittel && visEnkelVerdi('Tittel', godkjenning.tittel)}

								{godkjenning.utsteder && visEnkelVerdi('Utsteder', godkjenning.utsteder)}

								{godkjenning.gjennomfortDato &&
									visEnkelVerdi('Fullført', formatDates(godkjenning.gjennomfortDato))}

								{godkjenning.utloperDato &&
									visEnkelVerdi('Utløper', formatDates(godkjenning.utloperDato))}
							</li>
						))}
					</ul>
				</>
			)}

			{data?.andreGodkjenninger && data?.andreGodkjenninger.length > 0 && (
				<>
					<Heading level="3" size="small">
						Andre godkjenninger
					</Heading>
					<ul className="json-array">
						{data.andreGodkjenninger.map((godkjenning, i) => (
							<li key={'andreGodkjenninger-' + i}>
								{godkjenning.tittel && visEnkelVerdi('Tittel', godkjenning.tittel)}

								{godkjenning.utsteder && visEnkelVerdi('Utsteder', godkjenning.utsteder)}

								{godkjenning.gjennomfortDato &&
									visEnkelVerdi('Fullført', formatDates(godkjenning.gjennomfortDato))}

								{godkjenning.utloperDato &&
									visEnkelVerdi('Utløper', formatDates(godkjenning.utloperDato))}
							</li>
						))}
					</ul>
				</>
			)}
			{props.erJournalfort && (
				<Button
					variant="tertiary"
					icon={<FilePdfIcon />}
					onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.CV_OG_JOBBPROFIL)}
				>
					CV_og_jobbønsker.pdf
				</Button>
			)}
		</Card>
	);
}
