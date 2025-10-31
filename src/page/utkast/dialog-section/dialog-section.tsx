import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { hentMeldinger, sendDialog } from '../../../api/veilarbvedtaksstotte/meldinger';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { sortDatesAsc } from '../../../util/date-utils';
import { hentId, scrollToBottom } from '../../../util';
import { MeldingListe } from './melding-liste/melding-liste';
import { useDialogSection } from '../../../store/dialog-section-store';
import { Button, Loader, Textarea } from '@navikt/ds-react';
import './dialog-section.less';

const MESSAGE_MAX_LENGTH = 1000;
export const MELDINGER_ID = 'veilarbvedtaksstottefs-melding-liste';

export function DialogSection() {
	const { harLastetMeldinger, harNyeMeldinger } = useDialogSection();
	const { showModal } = useModalStore();
	const { meldinger, setMeldinger, innloggetVeileder, utkast } = useDataStore();

	const [melding, setMelding] = useState<string>('');
	const [senderMelding, setSenderMelding] = useState(false);
	const skrivefeltRef = useRef<HTMLTextAreaElement | null>(null);

	const kanSendeMelding = !senderMelding && melding.trim().length > 0 && melding.length <= MESSAGE_MAX_LENGTH;

	const sorterteMeldinger = useMemo(() => {
		return [...meldinger].sort((d1, d2) => sortDatesAsc(d1.opprettet, d2.opprettet));
	}, [meldinger]);

	useEffect(() => {
		const meldingListeElem = document.getElementById(MELDINGER_ID);
		scrollToBottom(meldingListeElem);
	}, [harNyeMeldinger]);

	function sendMelding() {
		setSenderMelding(true);

		sendDialog(hentId(utkast), melding)
			.then(() => hentMeldinger(hentId(utkast)))
			.then(response => {
				if (response.data) {
					setMeldinger(response.data);

					const meldingListeElem = document.getElementById(MELDINGER_ID);
					scrollToBottom(meldingListeElem);
				}
				setMelding('');
				if (skrivefeltRef.current) {
					skrivefeltRef.current.focus();
				}
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_UTSENDING_AV_DIALOG_MELDING);
			})
			.finally(() => setSenderMelding(false));
	}

	function handleOnMeldingChanged(e: ChangeEvent<HTMLTextAreaElement>) {
		if (!senderMelding) {
			setMelding(e.target.value);
		}
	}

	return (
		<div className="dialog-section-innhold">
			<div className="dialog-section-innhold__meldinger melding-liste" id={MELDINGER_ID}>
				{harLastetMeldinger ? (
					<MeldingListe meldinger={sorterteMeldinger} innloggetVeilederIdent={innloggetVeileder.ident} />
				) : (
					<Loader size="2xlarge" className="dialog-section-innhold__spinner" />
				)}
			</div>
			<Textarea
				size="small"
				label="Skrivefelt for å sende melding til beslutter/ansvarlig veileder"
				value={melding}
				minRows={2}
				maxRows={12}
				maxLength={MESSAGE_MAX_LENGTH}
				onChange={handleOnMeldingChanged}
				hideLabel
				ref={skrivefeltRef}
			/>
			<Button
				size="small"
				loading={senderMelding}
				className="dialog-section-innhold__send-knapp"
				onClick={sendMelding}
				disabled={!kanSendeMelding || senderMelding}
			>
				Send
			</Button>
		</div>
	);
}
