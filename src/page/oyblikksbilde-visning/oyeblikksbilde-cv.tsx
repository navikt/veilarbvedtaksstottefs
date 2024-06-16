import { Systemtittel } from 'nav-frontend-typografi';
import { Alert, Link } from '@navikt/ds-react';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentCvOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { useEffect } from 'react';
import { CvDto } from './dto/CvDto';
import Spinner from '../../component/spinner/spinner';
import { logMetrikk } from '../../util/logger';
import { useViewStore, ViewType } from '../../store/view-store';
import { fagdokumentTypeLabel, formatDates, formatVarighet, spraakNivoLabel } from './oyblikksbilde-fikser';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { EMDASH } from '../../util';

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
		return (
			<Alert variant="error" className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
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
				verdi.map((key, index) => <span key={key}>{key ?? EMDASH}</span>)
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
			<Systemtittel tag="h2" className="vedlegg-card__header">
				CV-en/jobbønskene dine på nav.no
			</Systemtittel>
			<div className="innhold">
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
						<h3 className="json-key">Utdanning</h3>
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
						<h3 className="json-key">Arbeidserfaring</h3>
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
						<h3 className="json-key">Fagdokumentasjoner</h3>
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
						<h3 className="json-key">Kompetanse</h3>
						<ul className="json-array">
							<li key={'kompetanse-1'}>
								{visEnkelVerdi('Tittel', data?.jobbprofil?.kompetanse.map(x => x.tittel).join(', '))}
							</li>
						</ul>
					</>
				)}

				{data?.jobbprofil?.onsketYrke && data?.jobbprofil?.onsketYrke.length > 0 && (
					<>
						<h3 className="json-key">Ønsket yrke</h3>
						<ul className="json-array">
							<li key={'onsketYrke-1'}>
								{visEnkelVerdi('Tittel', data?.jobbprofil?.onsketYrke.map(x => x.tittel).join(', '))}
							</li>
						</ul>
					</>
				)}

				{data?.jobbprofil?.onsketArbeidssted && data?.jobbprofil?.onsketArbeidssted.length > 0 && (
					<>
						<h3 className="json-key">Ønsket arbeidssted</h3>
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
						<h3 className="json-key">Ønsket ansettelsesform</h3>
						<ul className="json-array">
							<li key={'onsketAnsettelsesform-1'}>
								{visEnkelVerdi(
									'Tittel',
									data?.jobbprofil?.onsketAnsettelsesform.map(x => x.tittel).join(', ')
								)}
							</li>
						</ul>
					</>
				)}

				{data?.jobbprofil?.onsketArbeidstidsordning &&
					data?.jobbprofil?.onsketArbeidstidsordning.length > 0 && (
						<>
							<h3 className="json-key">Ønsket arbeidstidsordning</h3>
							<ul className="json-array">
								<li key={'onsketArbeidstidsordning-1'}>
									{visEnkelVerdi(
										'Tittel',
										data?.jobbprofil?.onsketArbeidstidsordning.map(x => x.tittel).join(', ')
									)}
								</li>
							</ul>
						</>
					)}

				{data?.jobbprofil?.onsketArbeidsdagordning && data?.jobbprofil?.onsketArbeidsdagordning.length > 0 && (
					<>
						<h3 className="json-key">Ønsket arbeidsdagordning</h3>
						<ul className="json-array">
							<li key={'onsketArbeidsdagordning-1'}>
								{visEnkelVerdi(
									'Tittel',
									data?.jobbprofil?.onsketArbeidsdagordning.map(x => x.tittel).join(', ')
								)}
							</li>
						</ul>
					</>
				)}

				{data?.jobbprofil?.onsketArbeidsskiftordning &&
					data?.jobbprofil?.onsketArbeidsskiftordning.length > 0 && (
						<>
							<h3 className="json-key">Ønsket arbeidsskiftordning</h3>
							<ul className="json-array">
								<li key={'onsketArbeidsskiftordning-1'}>
									{visEnkelVerdi(
										'Tittel',
										data?.jobbprofil?.onsketArbeidsskiftordning.map(x => x.tittel).join(', ')
									)}
								</li>
							</ul>
						</>
					)}

				{data?.jobbprofil?.heltidDeltid && (
					<>
						<h3 className="json-key">Heltid eller deltid</h3>
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
						<h3 className="json-key">Oppstart</h3>
						<ul className="json-array">
							<li key={'oppstart-1'}>{visEnkelVerdi('Oppstart', data.jobbprofil.oppstart)}</li>
						</ul>
					</>
				)}

				{data?.sprak && data?.sprak.length > 0 && (
					<>
						<h3 className="json-key">Språk</h3>
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
						<h3 className="json-key">Kurs</h3>
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
						<h3 className="json-key">Førerkort</h3>
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
						<h3 className="json-key">Annen Erfaring</h3>
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
						<h3 className="json-key">Godkjenninger</h3>
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
						<h3 className="json-key">Andre Godkjenninger</h3>
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
			</div>
			{props.erJournalfort && (
				<div className="oyeblikk-pdf">
					<Link
						href="#"
						onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.CV_OG_JOBBPROFIL)}
						className="oyeblikksbilde-visning__pdf-lenke"
					>
						<FilePdfIcon className="oyeblikksbilde-visning__pdf-ikon" aria-hidden />
						CV_og_jobbønsker.pdf
					</Link>
				</div>
			)}
		</Card>
	);
}
