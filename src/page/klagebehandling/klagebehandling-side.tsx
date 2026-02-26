import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store.ts';
import { useAppStore } from '../../store/app-store.ts';

import { useState } from 'react';

import './klagebehandling.css';
import { Button, HGrid, Stepper, TextField, VStack } from '@navikt/ds-react';
import { KlageHeader } from './klage-header-section/klage-header-section.tsx';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import PdfViewer from '../../component/pdf-viewer/pdf-viewer.tsx';
import { lagHentVedtakPdfUrl } from '../../api/veilarbvedtaksstotte/vedtak.ts';
import { lagreKlagebehandling } from '../../api/veilarbvedtaksstotte/klagebehandling.ts';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { useViewStore, ViewType } from '../../store/view-store.ts';
import Footer from '../../component/footer/footer.tsx';
import { FormkravSection } from './formkrav-section/formkrav-section.tsx';
import { journalpostIdHarRiktigFormat } from '../../api/utils.ts';

export function KlagebehandlingSide(props: { vedtakId: number }) {

	const [klageDato, setKlageDato] = useState<Date | undefined>();
	const [journalId, setJournalId] = useState('');
	const [aktivtSteg, setAktivtSteg] = useState(1);
	const [formkravFerdig, setFormkravFerdig] = useState(false);

	const fnr = useAppStore().fnr;
	const veilederIdent = useDataStore().innloggetVeileder.ident;
	const gjeldendeVedtak = useDataStore().fattedeVedtak.find(v => v.gjeldende);
	const { sistOppdatert, lagringStatus } = useSkjemaStore();
	const { changeView } = useViewStore();
	const lagreKlage = () => {
		const klagebehandling = { vedtakId: props.vedtakId, fnr, veilederIdent, klagedato: klageDato!, klageJournalpostid: journalId };
		lagreKlagebehandling(klagebehandling)
	};
	const { datepickerProps, inputProps } = useDatepicker({
		fromDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
		onDateChange: setKlageDato
	});
	return (
		<>
			<KlageHeader
				veilederNavn={veilederIdent}
				sistOppdatert={sistOppdatert}
				KlageStatus={lagringStatus}
				vedtakId={props.vedtakId}
			/>
			<HGrid columns="40% 60%" gap="4">
				<VStack gap="space-16">
					<Stepper activeStep={aktivtSteg} orientation="horizontal">
						<Stepper.Step completed={!!(klageDato && journalId && aktivtSteg > 1)}>Start</Stepper.Step>
						<Stepper.Step completed={formkravFerdig && aktivtSteg > 2}>Formkrav</Stepper.Step>
						<Stepper.Step>Utfall</Stepper.Step>
					</Stepper>

					<HGrid columns={3} gap="4">
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
					</HGrid>
					{klageDato && journalpostIdHarRiktigFormat(journalId) && (
						<Button
							onClick={() => {
								lagreKlage();
								setAktivtSteg(2);
							}}
						>
							Start klagebehandling
						</Button>
					)}

					{aktivtSteg === 2 && (
						<VStack gap="4">
							<FormkravSection onChange={setFormkravFerdig} />
							<Button onClick={() => setAktivtSteg(2)} disabled={!formkravFerdig}>
								Neste
							</Button>
						</VStack>
					)}
					{aktivtSteg === 2 && (
						<VStack gap="4">
							Her kommer innhold for utfall (medhold eller klageinstans)
						</VStack>
					)}
				</VStack>

				{gjeldendeVedtak && (
					<PdfViewer
						url={lagHentVedtakPdfUrl(gjeldendeVedtak.id)}
						title="Visning av vedtaksbrev"
						onStatusUpdate={() => {}}
					/>
				)}
			</HGrid>
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
