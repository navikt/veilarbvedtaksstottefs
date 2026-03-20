import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store.ts';
import { useAppStore } from '../../store/app-store.ts';
import { isAxiosError } from 'axios';

import { useState } from 'react';

import {
	Alert,
	BodyLong,
	Box,
	Button,
	CopyButton,
	DatePicker,
	HGrid,
	HStack,
	Heading,
	HelpText,
	List,
	Modal,
	Page,
	Select,
	Textarea,
	TextField,
	useDatepicker,
	VStack
} from '@navikt/ds-react';
import { KlageHeader } from './klage-header-section/klage-header-section.tsx';
import PdfViewer from '../../component/pdf-viewer/pdf-viewer.tsx';
import { lagHentVedtakPdfUrl } from '../../api/veilarbvedtaksstotte/vedtak.ts';
import {
	KlagefristUnntakSvar,
	fullforAvvisningKlagebehandling,
	lagreKlagebehandling,
	lagreKlagebehandlingFormkrav
} from '../../api/veilarbvedtaksstotte/klagebehandling.ts';
import { CheckmarkCircleIcon, ChevronLeftIcon } from '@navikt/aksel-icons';
import { useViewStore, ViewType } from '../../store/view-store.ts';
import Footer from '../../component/footer/footer.tsx';
import { FormkravSection, Formkrav, FormkravUtkast } from './formkrav-section/formkrav-section.tsx';
import { journalpostIdHarRiktigFormat } from '../../api/utils.ts';

const FEILKODE_FRA_STATUS: Record<number, string> = {
	400: 'KLAGEDATO_ER_FREM_I_TID',
	403: 'PÅKLAGET_VEDTAK_TILHØRER_IKKE_BRUKER',
	404: 'PÅKLAGET_VEDTAK_IKKE_FUNNET',
	409: 'ULOVLIG_NÅVÆRENDE_KLAGEBEHANDLING_TILSTAND',
	500: 'UKJENT_FEIL'
};

const fullforFeilkodeTilMelding: Record<string, string> = {
	KLAGEDATO_ER_FREM_I_TID: 'Klagen kan ikke fullføres fordi klagedato er frem i tid.',
	PÅKLAGET_VEDTAK_TILHØRER_IKKE_BRUKER: 'Du har ikke tilgang til å fullføre klagebehandlingen for dette vedtaket.',
	PAAKLAGET_VEDTAK_TILHORER_IKKE_BRUKER: 'Du har ikke tilgang til å fullføre klagebehandlingen for dette vedtaket.',
	PÅKLAGET_VEDTAK_IKKE_FUNNET: 'Fant ikke det påklagede vedtaket.',
	PAAKLAGET_VEDTAK_IKKE_FUNNET: 'Fant ikke det påklagede vedtaket.',
	ULOVLIG_NÅVÆRENDE_KLAGEBEHANDLING_TILSTAND: 'Klagebehandlingen kan ikke fullføres i nåværende tilstand.',
	ULOVLIG_NAAVAERENDE_KLAGEBEHANDLING_TILSTAND: 'Klagebehandlingen kan ikke fullføres i nåværende tilstand.',
	UKJENT_FEIL: 'Det oppstod en ukjent feil ved fullføring av klagebehandlingen.'
};

function hentStatusFraFeil(error: unknown): number | undefined {
	if (!isAxiosError(error)) {
		return undefined;
	}

	const requestStatus = (error.request as { status?: number } | undefined)?.status;

	return error.response?.status ?? error.status ?? requestStatus;
}

function hentMeldingFraFullforFeil(error: unknown): string {
	const statuskode = hentStatusFraFeil(error) ?? 500;
	const feilkode = FEILKODE_FRA_STATUS[statuskode] ?? 'UKJENT_FEIL';
	const melding = fullforFeilkodeTilMelding[feilkode] ?? fullforFeilkodeTilMelding.UKJENT_FEIL;

	return `${melding} Feilkode: ${statuskode}.`;
}

export function KlagebehandlingSide(props: { vedtakId: number }) {
	const [klageDato, setKlageDato] = useState<Date | undefined>();
	const [journalId, setJournalId] = useState('');
	const [aktivtSteg, setAktivtSteg] = useState(1);
	const [formkrav, setFormkrav] = useState<Formkrav | undefined>();
	const [formkravUtkast, setFormkravUtkast] = useState<FormkravUtkast>({});
	const [utfallJournalpostId, setUtfallJournalpostId] = useState('');
	const [visFullfortModal, setVisFullfortModal] = useState(false);
	const [harForsoktAFullfore, setHarForsoktAFullfore] = useState(false);
	const [lagrerKlage, setLagrerKlage] = useState(false);
	const [lagringFeilet, setLagringFeilet] = useState(false);
	const [fullforingFeilmelding, setFullforingFeilmelding] = useState<string>();
	const [startKlageFeilmelding, setStartKlageFeilmelding] = useState<string>();

	const fnr = useAppStore().fnr;
	const veilederIdent = useDataStore().innloggetVeileder.ident;
	const gjeldendeVedtak = useDataStore().fattedeVedtak.find(v => v.gjeldende);
	const { sistOppdatert, lagringStatus } = useSkjemaStore();
	const { changeView } = useViewStore();

	const utforLagring = async (lagreFn: () => Promise<unknown>) => {
		setLagrerKlage(true);
		setLagringFeilet(false);

		try {
			await lagreFn();
			return true;
		} catch {
			setLagringFeilet(true);
			return false;
		} finally {
			setLagrerKlage(false);
		}
	};

	const lagreKlage = async () => {
		if (!klageDato) {
			return false;
		}

		const klagebehandling = {
			vedtakId: props.vedtakId,
			fnr,
			veilederIdent,
			klagedato: klageDato,
			klageJournalpostid: journalId
		};

		setLagrerKlage(true);
		setLagringFeilet(false);
		setStartKlageFeilmelding(undefined);

		try {
			await lagreKlagebehandling(klagebehandling);
			return true;
		} catch (error) {
			if (hentStatusFraFeil(error) === 409) {
				setStartKlageFeilmelding('Klage innsendt dato er for tidlig.');
			} else {
				setLagringFeilet(true);
			}

			return false;
		} finally {
			setLagrerKlage(false);
		}
	};

	const lagreFormkrav = async (formkravData: FormkravUtkast) => {
		return utforLagring(() => lagreKlagebehandlingFormkrav(props.vedtakId, formkravData));
	};

	const fullforAvvisning = async () => {
		setLagrerKlage(true);
		setLagringFeilet(false);
		setFullforingFeilmelding(undefined);

		try {
			await fullforAvvisningKlagebehandling(utfallJournalpostId.replace(/\s/g, ''), props.vedtakId);
			return true;
		} catch (error) {
			setFullforingFeilmelding(hentMeldingFraFullforFeil(error));
			return false;
		} finally {
			setLagrerKlage(false);
		}
	};

	const klagefristUnntakErOppfylt =
		formkrav?.klagefristOverstyres === KlagefristUnntakSvar.JA_KLAGER_KAN_IKKE_LASTES ||
		formkrav?.klagefristOverstyres === KlagefristUnntakSvar.JA_SAERLIGE_GRUNNER;

	const utfallErAvvisning =
		!!formkrav &&
		(!(formkrav.klagefristOverholdt || klagefristUnntakErOppfylt) ||
			!formkrav.klagerPartISaken ||
			!formkrav.klagePaaKonkreteElementer ||
			!formkrav.erKlagenSignert);

	const begrunnelseForAvvisningTilBruker = formkrav?.avvisningsAarsak || formkravUtkast.avvisningsAarsak || '';
	const kanFullforeAvvistKlage = journalpostIdHarRiktigFormat(utfallJournalpostId);
	const utfallJournalpostIdFeil =
		harForsoktAFullfore && !kanFullforeAvvistKlage ? 'Må være på formatet 111 222 333' : undefined;

	const kanStarteKlagebehandling = !!(klageDato && journalpostIdHarRiktigFormat(journalId));

	const { datepickerProps, inputProps } = useDatepicker({
		fromDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
		onDateChange: nyDato => {
			setKlageDato(nyDato);
			setStartKlageFeilmelding(undefined);
			setLagringFeilet(false);
		}
	});

	const avsluttKlagebehandling = () => {
		setVisFullfortModal(false);
		setHarForsoktAFullfore(false);
		setAktivtSteg(1);
		setKlageDato(undefined);
		setJournalId('');
		setFormkrav(undefined);
		setFormkravUtkast({});
		setUtfallJournalpostId('');
		setLagringFeilet(false);
		setFullforingFeilmelding(undefined);
		setStartKlageFeilmelding(undefined);
		changeView(ViewType.HOVEDSIDE);
	};

	const stegTittel =
		aktivtSteg === 1
			? 'Start klagebehandling'
			: aktivtSteg === 2
				? 'Frist og formkrav'
				: 'Resultat av klagebehandlingen';

	return (
		<>
			<Page>
				<KlageHeader
					veilederNavn={veilederIdent}
					sistOppdatert={sistOppdatert}
					KlageStatus={lagringStatus}
					vedtakId={props.vedtakId}
				/>

				<HGrid columns={2} gap="space-16">
					<Box padding="space-16">
						<VStack gap="space-32">
							{aktivtSteg === 1 ? (
								<HStack as="div" align="center" gap="space-2">
									<Heading level="1" size="large">
										{stegTittel}
									</Heading>
									<HelpText title="Hjelp">
										Legg inn klage mottatt-dato og Gosys journalpostID for å starte
										klagebehandlingen.
									</HelpText>
								</HStack>
							) : (
								<Heading level="1" size="large">
									{stegTittel}
								</Heading>
							)}

							{aktivtSteg === 1 && (
								<>
									<VStack gap="space-32">
										<DatePicker {...datepickerProps}>
											<DatePicker.Input
												{...inputProps}
												label={
													<HStack as="span" align="center" gap="space-2">
														<span>Klage mottatt</span>
														<HelpText title="Hjelp">
															Datoen klagen er mottatt av Nav. Klagen kan mottas på flere
															måter. Se servicerutinen for mer informasjon.
														</HelpText>
													</HStack>
												}
												description="Format: dd.mm.åååå"
											/>
										</DatePicker>
										<TextField
											label={
												<HStack as="span" align="center" gap="space-2">
													<span>Gosys journalpostID</span>
													<HelpText title="Hjelp">
														Gå til journalposten for den journalførte klagen i Gosys. Der
														finner du et felt med en 11-sifret journalpostID.
													</HelpText>
												</HStack>
											}
											value={journalId}
											onChange={e => {
												setJournalId(e.target.value);
												setStartKlageFeilmelding(undefined);
												setLagringFeilet(false);
											}}
											description="Format: 111 222 333 (9 siffer)"
											style={{ maxWidth: '14rem' }}
										/>
									</VStack>
									{startKlageFeilmelding && <Alert variant="error">{startKlageFeilmelding}</Alert>}
									<Button
										loading={lagrerKlage}
										disabled={!kanStarteKlagebehandling}
										style={{ width: '14rem' }}
										onClick={async () => {
											const lagret = await lagreKlage();
											if (lagret) {
												setAktivtSteg(2);
											}
										}}
									>
										Start klagebehandling
									</Button>
								</>
							)}

							{lagringFeilet && <Alert variant="error">Klarte ikke å lagre klagebehandlingen.</Alert>}

							{aktivtSteg === 2 && (
								<VStack gap="space-32">
									<FormkravSection onChange={setFormkrav} onDraftChange={setFormkravUtkast} />
									<HStack justify="space-between" align="center" width="100%">
										<Button variant="tertiary" onClick={() => changeView(ViewType.HOVEDSIDE)}>
											Avbryt klagebehandling
										</Button>
										<HStack gap="space-6" justify="end">
											<Button
												variant="secondary"
												loading={lagrerKlage}
												onClick={async () => {
													await lagreFormkrav(formkravUtkast);
												}}
											>
												Lagre
											</Button>
											<Button
												loading={lagrerKlage}
												onClick={async () => {
													if (!formkrav) {
														return;
													}

													const lagret = await lagreFormkrav(formkrav);
													if (lagret) {
														setAktivtSteg(3);
													}
												}}
												disabled={!formkrav}
											>
												Lagre og gå videre
											</Button>
										</HStack>
									</HStack>
								</VStack>
							)}
							{aktivtSteg === 3 && (
								<VStack gap="space-32">
									{utfallErAvvisning ? (
										<>
											<Box width="100%" maxWidth="25%" minWidth="14rem">
												<Select
													readOnly
													defaultValue="KLAGEN_AVVISES"
													label={
														<HStack as="span" align="center" gap="space-2">
															<span>Resultat</span>
														</HStack>
													}
												>
													<option value="KLAGEN_AVVISES">Klagen avvises</option>
												</Select>
											</Box>
											<Box width="100%" maxWidth="85%" minWidth="18rem">
												<HStack align="end" gap="space-4" style={{ flexWrap: 'wrap' }}>
													<Box width="100%" style={{ flex: 1 }}>
														<Textarea
															readOnly
															size="small"
															resize
															value={begrunnelseForAvvisningTilBruker}
															label={
																<HStack as="span" align="center" gap="space-2">
																	<span>
																		Begrunnelse for avvisning som skal sendes til
																		bruker
																	</span>
																</HStack>
															}
														/>
													</Box>
													<CopyButton
														copyText={begrunnelseForAvvisningTilBruker}
														text="Kopier tekst"
														size="small"
														iconPosition="right"
														disabled={!begrunnelseForAvvisningTilBruker}
													/>
												</HStack>
											</Box>
											<VStack gap="space-2">
												<Heading level="3" size="small">
													Det du må gjøre
												</Heading>
												<List size="small">
													<List.Item>
														Skriv brev til personen om hvorfor klagen er avvist, og
														journalfør i Gosys. Se servicerutinen for mer informasjon.
													</List.Item>
													<List.Item>
														Legg inn Gosys journalpostID for brevet til personenog fullfør
														klagebehandlingen.
													</List.Item>
												</List>
											</VStack>
											<Box width="100%" maxWidth="20rem">
												<TextField
													label={
														<HStack as="div" align="center" gap="space-2">
															<span>Gosys JournalpostID</span>
															<HelpText title="Hjelp">Format: 111 222 333</HelpText>
														</HStack>
													}
													value={utfallJournalpostId}
													onChange={e => {
														setUtfallJournalpostId(e.target.value);
														setHarForsoktAFullfore(false);
														setFullforingFeilmelding(undefined);
													}}
													error={utfallJournalpostIdFeil}
												/>
											</Box>
											{fullforingFeilmelding && (
												<Alert variant="info" size="small">
													{fullforingFeilmelding}
												</Alert>
											)}
											<HStack justify="space-between" align="center" width="100%">
												<Button variant="tertiary" onClick={() => setAktivtSteg(2)}>
													Gå tilbake
												</Button>
												<HStack gap="space-6" justify="end">
													<Button
														variant="secondary"
														loading={lagrerKlage}
														onClick={async () => {
															await lagreFormkrav(formkravUtkast);
														}}
													>
														Lagre
													</Button>
													<Button
														loading={lagrerKlage}
														onClick={async () => {
															setHarForsoktAFullfore(true);

															if (!kanFullforeAvvistKlage) {
																return;
															}

															const fullfort = await fullforAvvisning();
															if (fullfort) {
																setVisFullfortModal(true);
															}
														}}
													>
														Fullfør klagebehandlingen
													</Button>
												</HStack>
											</HStack>
										</>
									) : (
										<>Her kommer innhold for utfall (medhold eller klageinstans)</>
									)}
								</VStack>
							)}
						</VStack>
					</Box>

					{gjeldendeVedtak && (
						<PdfViewer
							url={lagHentVedtakPdfUrl(gjeldendeVedtak.id)}
							title="Visning av vedtaksbrev"
							onStatusUpdate={() => {}}
						/>
					)}
				</HGrid>
			</Page>
			<Modal open={visFullfortModal} onClose={avsluttKlagebehandling} aria-label="Klagebehandling fullført">
				<Modal.Body>
					<VStack align="center" gap="space-4">
						<CheckmarkCircleIcon
							aria-hidden
							width="2rem"
							height="2rem"
							style={{ color: 'var(--a-icon-success)' }}
						/>
						<Heading level="1" size="medium">
							Klagebehandling fullført
						</Heading>
						<BodyLong style={{ textAlign: 'center' }}>
							Klagebehandlingen er fullført. Du finner de journalførte dokumentene knytte til saken i
							Gosys.
						</BodyLong>
					</VStack>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={avsluttKlagebehandling}>OK</Button>
				</Modal.Footer>
			</Modal>
			<Footer className="vedtakskjema-visning__aksjoner">
				<Button
					size="small"
					variant="tertiary"
					icon={<ChevronLeftIcon />}
					onClick={() => changeView(ViewType.HOVEDSIDE)}
				>
					Tilbake
				</Button>
			</Footer>
		</>
	);
}
