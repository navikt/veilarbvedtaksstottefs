import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store.ts';
import { useAppStore } from '../../store/app-store.ts';

import { useState } from 'react';

import './klagebehandling.css';
import {
	Alert,
	BodyLong,
	Box,
	Button,
	DatePicker,
	HGrid,
	HStack,
	Heading,
	HelpText,
	List,
	Modal,
	Page,
	Select,
	Stepper,
	TextField,
	useDatepicker,
	VStack
} from '@navikt/ds-react';
import { KlageHeader } from './klage-header-section/klage-header-section.tsx';
import PdfViewer from '../../component/pdf-viewer/pdf-viewer.tsx';
import { lagHentVedtakPdfUrl } from '../../api/veilarbvedtaksstotte/vedtak.ts';
import {
	KlagefristUnntakSvar,
	lagreKlagebehandling,
	lagreKlagebehandlingFormkrav
} from '../../api/veilarbvedtaksstotte/klagebehandling.ts';
import { CheckmarkCircleFillIcon, ChevronLeftIcon, PadlockLockedIcon } from '@navikt/aksel-icons';
import { useViewStore, ViewType } from '../../store/view-store.ts';
import Footer from '../../component/footer/footer.tsx';
import { FormkravSection, Formkrav, FormkravUtkast } from './formkrav-section/formkrav-section.tsx';
import { journalpostIdHarRiktigFormat } from '../../api/utils.ts';

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

		return utforLagring(() => lagreKlagebehandling(klagebehandling));
	};

	const lagreFormkrav = async (formkravData: FormkravUtkast) => {
		return utforLagring(() => lagreKlagebehandlingFormkrav(props.vedtakId, formkravData));
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
		onDateChange: setKlageDato
	});

	const tilbakeTilStart = () => {
		setVisFullfortModal(false);
		setHarForsoktAFullfore(false);
		setAktivtSteg(1);
		setKlageDato(undefined);
		setJournalId('');
		setFormkrav(undefined);
		setFormkravUtkast({});
		setUtfallJournalpostId('');
		setLagringFeilet(false);
	};

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
						<VStack gap="space-16">
							<Box padding={'space-16'}>
								<Stepper activeStep={aktivtSteg} orientation="horizontal">
									<Stepper.Step completed={!!(klageDato && journalId && aktivtSteg > 1)}>
										Start
									</Stepper.Step>
									<Stepper.Step completed={!!formkrav && aktivtSteg > 2}>Formkrav</Stepper.Step>
									<Stepper.Step>Utfall</Stepper.Step>
								</Stepper>
							</Box>

							{aktivtSteg === 1 && (
								<>
									<HStack gap="space-24">
										<DatePicker {...datepickerProps}>
											<DatePicker.Input
												{...inputProps}
												label="Klage innsendt dato"
												description="Format: dd.mm.åååå"
											/>
										</DatePicker>
										<TextField
											label="Gosys journalpostId"
											value={journalId}
											onChange={e => setJournalId(e.target.value)}
											description="Format: 111 222 333"
										/>
									</HStack>
									{kanStarteKlagebehandling && (
										<Button
											loading={lagrerKlage}
											onClick={async () => {
												const lagret = await lagreKlage();
												if (lagret) {
													setAktivtSteg(2);
												}
											}}
										>
											Start klagebehandling
										</Button>
									)}
								</>
							)}

							{lagringFeilet && <Alert variant="error">Klarte ikke å lagre klagebehandlingen.</Alert>}

							{aktivtSteg === 2 && (
								<VStack gap="space-16">
									<FormkravSection onChange={setFormkrav} onDraftChange={setFormkravUtkast} />
									<div className="klagebehandling__formkrav-actions">
										<Button variant="tertiary" onClick={() => changeView(ViewType.HOVEDSIDE)}>
											Avbryt klagebehandling
										</Button>
										<div className="klagebehandling__formkrav-actions-right">
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
										</div>
									</div>
								</VStack>
							)}
							{aktivtSteg === 3 && (
								<VStack gap="space-16">
									{utfallErAvvisning ? (
										<>
											<Select
												disabled
												defaultValue="KLAGEN_AVVISES"
												label={
													<span className="klagebehandling__locked-label">
														<PadlockLockedIcon aria-hidden />
														<span>Utfall av klagebehandlingen</span>
													</span>
												}
											>
												<option value="KLAGEN_AVVISES">Klagen avvises</option>
											</Select>
											<TextField
												disabled
												value={begrunnelseForAvvisningTilBruker}
												label={
													<span className="klagebehandling__locked-label">
														<PadlockLockedIcon aria-hidden />
														<span>
															Begrunnelse for avvisning som skal sendes til bruker
														</span>
													</span>
												}
											/>
											<div>
												<h3 className="klagebehandling__utfall-actions-title">
													Det du må gjøre
												</h3>
												<List size="small" className="klagebehandling__utfall-actions-list">
													<List.Item>
														Skriv brev til personen om hvorfor klagen er avvist, og
														journalfør i Gosys. Se servicerutinen for mer informasjon.
													</List.Item>
													<List.Item>
														Legg inn Gosys journalpostID for brevet til personenog fullfør
														klagebehandlingen.
													</List.Item>
												</List>
											</div>
											<TextField
												className="klagebehandling__utfall-journalpost"
												label={
													<div className="klagebehandling__question-label">
														<span>Gosys JournalpostID</span>
														<HelpText title="Hjelp">Format: 111 222 333</HelpText>
													</div>
												}
												value={utfallJournalpostId}
												onChange={e => {
													setUtfallJournalpostId(e.target.value);
													setHarForsoktAFullfore(false);
												}}
												error={utfallJournalpostIdFeil}
											/>
											<div className="klagebehandling__formkrav-actions">
												<Button variant="tertiary" onClick={() => setAktivtSteg(2)}>
													Gå tilbake
												</Button>
												<div className="klagebehandling__formkrav-actions-right">
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

															const lagret = await lagreFormkrav(formkravUtkast);
															if (lagret) {
																setVisFullfortModal(true);
															}
														}}
													>
														Fullfør klagebehandlingen
													</Button>
												</div>
											</div>
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
			<Modal open={visFullfortModal} onClose={tilbakeTilStart} aria-label="Klagebehandling fullført">
				<Modal.Body className="klagebehandling__fullfort-modal-body">
					<CheckmarkCircleFillIcon aria-hidden className="klagebehandling__fullfort-modal-icon" />
					<Heading level="1" size="medium">
						Klagebehandling fullført
					</Heading>
					<BodyLong>
						Klagebehandlingen er fullført. Du finner de journalførte dokumentene knytte til saken i Gosys.
					</BodyLong>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={tilbakeTilStart}>OK</Button>
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
