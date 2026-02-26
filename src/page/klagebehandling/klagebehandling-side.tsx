import { useSkjemaStore } from '../../store/skjema-store';
import { useDataStore } from '../../store/data-store.ts';
import { useAppStore } from '../../store/app-store.ts';

import { useState } from 'react';

import './klagebehandling.css';
import { Button, Detail, HGrid, Stepper, TextField, VStack } from '@navikt/ds-react';
import { KlageHeader } from './klage-header-section/klage-header-section.tsx';

import { DatePicker, useDatepicker } from '@navikt/ds-react';
import PdfViewer from '../../component/pdf-viewer/pdf-viewer.tsx';
import { lagHentVedtakPdfUrl } from '../../api/veilarbvedtaksstotte/vedtak.ts';
import { lagreKlagebehandling } from '../../api/veilarbvedtaksstotte/klagebehandling.ts';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { useViewStore, ViewType } from '../../store/view-store.ts';
import Footer from '../../component/footer/footer.tsx';
import { FormkravSection } from './formkrav-section/formkrav-section.tsx';

const Datovelger = () => {
	const [, setKlageDato] = useState<Date | undefined>();
	const { datepickerProps, inputProps, selectedDay } = useDatepicker({
		fromDate: new Date(new Date().setMonth(new Date().getMonth() - 2)),
		// eslint-disable-next-line no-console
		onDateChange: console.info
	});

	return (
		<DatePicker {...datepickerProps}>
			<DatePicker.Input
				{...inputProps}
				onChange={() => setKlageDato(selectedDay)}
				label="Klage innsendt dato"
				description="Format: dd.mm.åååå"
			/>
		</DatePicker>
	);
};

export function KlagebehandlingSide(props: { vedtakId: number }) {
	const [journalId, setJournalId] = useState('');
	const [aktivtSteg, setAktivtSteg] = useState(1);
	const [formkravFerdig, setFormkravFerdig] = useState(false);

	const fnr = useAppStore().fnr;
	const veilederIdent = useDataStore().innloggetVeileder.ident;
	const gjeldendeVedtak = useDataStore().fattedeVedtak.find(v => v.gjeldende);
	const { sistOppdatert, lagringStatus } = useSkjemaStore();
	const { changeView } = useViewStore();
	const overfoerKlage = () => {
		//		{ fnr, vedtakId: props.vedtakId, klageDato, journalId, begrunnelse }
		const klagebehandling = { fnr, vedtakId: props.vedtakId, veilederIdent };
		lagreKlagebehandling(klagebehandling)
	};
	return (
		<>
			<KlageHeader
				veilederNavn="testklagebehandleren"
				sistOppdatert={sistOppdatert}
				KlageStatus={lagringStatus}
				vedtakId={props.vedtakId}
			/>
			<HGrid columns="40% 60%" gap="4">
				<VStack gap="space-16">
					<Detail>{fnr}</Detail>

					<HGrid columns={3} gap="4">
						<Datovelger />
						<TextField
							label="Gosys journalpostID"
							value={journalId}
							onChange={e => setJournalId(e.target.value)}
							description="Format: 111 222 333"
						/>
					</HGrid>
					<Stepper activeStep={aktivtSteg} orientation="horizontal">
						<Stepper.Step completed={formkravFerdig && aktivtSteg > 1}>Formkrav</Stepper.Step>
						<Stepper.Step>Utfall</Stepper.Step>
					</Stepper>
					{aktivtSteg === 1 && (
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
							<Button variant="secondary" onClick={() => setAktivtSteg(1)}>
								Tilbake
							</Button>
						</VStack>
					)}
					<Button onClick={overfoerKlage} variant="primary">
						Lagre klage
					</Button>
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
