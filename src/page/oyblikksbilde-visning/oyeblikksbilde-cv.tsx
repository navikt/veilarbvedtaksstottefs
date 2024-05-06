import { Systemtittel } from 'nav-frontend-typografi';
import { Alert, BodyShort, Link } from '@navikt/ds-react';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { ReactComponent as FilePdfIkon } from './icons/filepdficon.svg';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentCvOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { useEffect } from 'react';
import { CvDto } from './dto/CvDto';
import Spinner from '../../component/spinner/spinner';
import { logMetrikk } from '../../util/logger';
import { useViewStore, ViewType } from '../../store/view-store';
import { fagdokumentTypeLabel, formatDates, formatVarighet, spraakNivoLabel } from './oyblikksbilde-fikser';
import './css/json-viewer.less';

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
				{data?.utdanning && (
					<>
						<h3 className="json-key">Utdanning</h3>
						<ul className="json-array">
							{data.utdanning.map((utdanning, i) => (
								<li key={i}>
									{utdanning.tittel && (
										<div className="json-key-wrapper">
											<span className="json-key">Tittel: </span>
											<span>{utdanning.tittel}</span>
										</div>
									)}

									{utdanning.studiested && (
										<div className="json-key-wrapper">
											<span className="json-key">Sted: </span>
											<span>{utdanning.studiested}</span>
										</div>
									)}

									{utdanning.utdanningsnivaa && (
										<div className="json-key-wrapper">
											<span className="json-key">Utdanningsnivå: </span>
											<span>{utdanning.utdanningsnivaa}</span>
										</div>
									)}

									{utdanning.fraDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Fra dato: </span>
											<span>{formatDates(utdanning.fraDato)}</span>
										</div>
									)}

									{utdanning.tilDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Til dato: </span>
											<span>{formatDates(utdanning.tilDato)}</span>
										</div>
									)}

									{utdanning.beskrivelse && (
										<div className="json-key-wrapper">
											<span className="json-key">Beskrivelse: </span>
											<span>{utdanning.beskrivelse}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}
				{data?.arbeidserfaring && (
					<>
						<h3 className="json-key">Arbeidserfaring</h3>
						<ul className="json-array">
							{data.arbeidserfaring.map((arbeidserfaring, i) => (
								<li key={i}>
									{arbeidserfaring.tittel && (
										<div className="json-key-wrapper">
											<span className="json-key">Tittel: </span>
											<span>{arbeidserfaring.tittel}</span>
										</div>
									)}

									{arbeidserfaring.arbeidsgiver && (
										<div className="json-key-wrapper">
											<span className="json-key">Arbeidsgiver: </span>
											<span>{arbeidserfaring.arbeidsgiver}</span>
										</div>
									)}

									{arbeidserfaring.sted && (
										<div className="json-key-wrapper">
											<span className="json-key">Sted: </span>
											<span>{arbeidserfaring.sted}</span>
										</div>
									)}

									{arbeidserfaring.fraDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Fra dato: </span>
											<span>{formatDates(arbeidserfaring.fraDato)}</span>
										</div>
									)}

									{arbeidserfaring.tilDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Til dato: </span>
											<span>{formatDates(arbeidserfaring.tilDato)}</span>
										</div>
									)}

									{arbeidserfaring.beskrivelse && (
										<div className="json-key-wrapper">
											<span className="json-key">Beskrivelse: </span>
											<span>{arbeidserfaring.beskrivelse}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.fagdokumentasjoner && (
					<>
						<h3 className="json-key">Fagdokumentasjoner</h3>
						<ul className="json-array">
							{data.fagdokumentasjoner.map((fagdokumentasjon, i) => (
								<li key={i}>
									{fagdokumentasjon.tittel && (
										<div className="json-key-wrapper">
											<span className="json-key">Tittel: </span>
											<span>{fagdokumentasjon.tittel}</span>
										</div>
									)}

									{fagdokumentasjon.type && (
										<div className="json-key-wrapper">
											<span className="json-key">Type: </span>
											<span>{fagdokumentTypeLabel(fagdokumentasjon.type)}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.jobbprofil?.kompetanse && (
					<>
						<h3 className="json-key">Kompetanse</h3>
						<ul className="json-array">
							{data.jobbprofil.kompetanse.map((kompetanse, i) => (
								<li key={i}>
									{kompetanse.tittel && (
										<div className="json-key-wrapper">
											<span className="json-key">Tittel: </span>
											<span>{kompetanse.tittel}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.sprak && (
					<>
						<h3 className="json-key">Språk</h3>
						<ul className="json-array">
							{data.sprak.map((sprak, i) => (
								<li key={i}>
									{sprak.sprak && (
										<div className="json-key-wrapper">
											<span className="json-key">Språk: </span>
											<span>{sprak.sprak}</span>
										</div>
									)}

									{sprak.muntligNiva && (
										<div className="json-key-wrapper">
											<span className="json-key">Muntlig: </span>
											<span>{spraakNivoLabel(sprak.muntligNiva)}</span>
										</div>
									)}

									{sprak.skriftligNiva && (
										<div className="json-key-wrapper">
											<span className="json-key">Skriftlig: </span>
											<span>{spraakNivoLabel(sprak.skriftligNiva)}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.kurs && (
					<>
						<h3 className="json-key">Kurs</h3>
						<ul className="json-array">
							{data.kurs.map((kurs, i) => (
								<li key={i}>
									{kurs.tittel && (
										<div className="json-key-wrapper">
											<span className="json-key">Tittel: </span>
											<span>{kurs.tittel}</span>
										</div>
									)}

									{kurs.arrangor && (
										<div className="json-key-wrapper">
											<span className="json-key">Arrangør: </span>
											<span>{kurs.arrangor}</span>
										</div>
									)}

									{kurs.tidspunkt && (
										<div className="json-key-wrapper">
											<span className="json-key">Fullført: </span>
											<span>{formatDates(kurs.tidspunkt)}</span>
										</div>
									)}

									{kurs.varighet && (
										<div className="json-key-wrapper">
											<span className="json-key">Kurslengde: </span>
											<span>
												{kurs.varighet.varighet}
												{formatVarighet(kurs.varighet.varighet, kurs.varighet.tidsenhet)}
											</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.forerkort && (
					<>
						<h3 className="json-key">Førerkort</h3>
						<ul className="json-array">
							{data.forerkort.map((forerkort, i) => (
								<li key={i}>
									{forerkort.klasse && (
										<div className="json-key-wrapper">
											<span className="json-key">Klasse: </span>
											<span>{forerkort.klasse}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.annenErfaring && (
					<>
						<h3 className="json-key">Annen Erfaring</h3>
						<ul className="json-array">
							{data.annenErfaring.map((erfaring, i) => (
								<li key={i}>
									{erfaring.rolle && (
										<div className="json-key-wrapper">
											<span className="json-key">Rolle: </span>
											<span>{erfaring.rolle}</span>
										</div>
									)}

									{erfaring.beskrivelse && (
										<div className="json-key-wrapper">
											<span className="json-key">Beskrivelse: </span>
											<span>{erfaring.beskrivelse}</span>
										</div>
									)}

									{erfaring.fraDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Startdato: </span>
											<span>{formatDates(erfaring.fraDato)}</span>
										</div>
									)}

									{erfaring.tilDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Sluttdato: </span>
											<span>{formatDates(erfaring.tilDato)}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.godkjenninger && (
					<>
						<h3 className="json-key">Godkjenninger</h3>
						<ul className="json-array">
							{data.godkjenninger.map((godkjenning, i) => (
								<li key={i}>
									{godkjenning.tittel && (
										<div className="json-key-wrapper">
											<span className="json-key">Tittel: </span>
											<span>{godkjenning.tittel}</span>
										</div>
									)}

									{godkjenning.utsteder && (
										<div className="json-key-wrapper">
											<span className="json-key">Utsteder: </span>
											<span>{godkjenning.utsteder}</span>
										</div>
									)}

									{godkjenning.gjennomfortDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Fullført: </span>
											<span>{formatDates(godkjenning.gjennomfortDato)}</span>
										</div>
									)}

									{godkjenning.utloperDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Utløper: </span>
											<span>{formatDates(godkjenning.utloperDato)}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}

				{data?.andreGodkjenninger && (
					<>
						<h3 className="json-key">Andre Godkjenninger</h3>
						<ul className="json-array">
							{data.andreGodkjenninger.map((godkjenning, i) => (
								<li key={i}>
									{godkjenning.tittel && (
										<div className="json-key-wrapper">
											<span className="json-key">Tittel: </span>
											<span>{godkjenning.tittel}</span>
										</div>
									)}

									{godkjenning.utsteder && (
										<div className="json-key-wrapper">
											<span className="json-key">Utsteder: </span>
											<span>{godkjenning.utsteder}</span>
										</div>
									)}

									{godkjenning.gjennomfortDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Fullført: </span>
											<span>{formatDates(godkjenning.gjennomfortDato)}</span>
										</div>
									)}

									{godkjenning.utloperDato && (
										<div className="json-key-wrapper">
											<span className="json-key">Utløper: </span>
											<span>{formatDates(godkjenning.utloperDato)}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</>
				)}
			</div>
			{props.erJournalfort && (
				<div className="oyeblikk-pdf">
					<Link onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.CV_OG_JOBBPROFIL)}>
						<div className="oyblikksbilde-visning-pdf-ikon">
							<FilePdfIkon title="a11y-title" height="1em" width="1em" fontSize="1.75rem" />
						</div>
						<BodyShort size="small" className="file_tittel">
							CV_og_jobbønsker.pdf
						</BodyShort>
					</Link>
				</div>
			)}
		</Card>
	);
}
