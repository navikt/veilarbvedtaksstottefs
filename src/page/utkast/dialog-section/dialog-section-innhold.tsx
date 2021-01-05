import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import './dialog-section.less';
import { hentMeldinger, sendDialog } from '../../../api/veilarbvedtaksstotte/meldinger';
import { ModalType, useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { sortDatesAsc } from '../../../util/date-utils';
import { hentId } from '../../../util';
import { SKRU_AV_POLLING_DIALOG } from '../../../api/veilarbpersonflatefs';
import { MeldingListe } from './melding-liste/melding-liste';
import Spinner from '../../../component/spinner/spinner';

let midlertidigMelding = '';

const TEN_SECONDS = 10000;
const MESSAGE_MAX_LENGTH = 1000;

export function DialogSectionInnhold() {
	const { showModal } = useModalStore();
	const { meldinger, setMeldinger, innloggetVeileder, utkast, features } = useDataStore();

	const [harLastetMeldinger, setHarLastetMeldinger] = useState(false);
	const intervalRef = useRef<number>();

	const [melding, setMelding] = useState(midlertidigMelding);
	const [senderMelding, setSenderMelding] = useState(false);
	const skrivefeltRef = useRef<HTMLInputElement | null>(null);

	const kanSendeMelding = !senderMelding && melding.trim().length > 0;

	const sorterteMeldinger = useMemo(() => {
		return [...meldinger].sort((d1, d2) => sortDatesAsc(d1.opprettet, d2.opprettet));
	}, [meldinger]);

	function refreshMeldinger() {
		hentMeldinger(hentId(utkast))
			.then(response => {
				if (response.data) {
					setMeldinger(response.data);
				}
			})
			.catch()
			.finally(() => {
				setHarLastetMeldinger(true);
			});
	}

	function clearAutoRefresh() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
		}
	}

	useEffect(() => {
		refreshMeldinger();

		// Start polling of new dialogs
		if (!features[SKRU_AV_POLLING_DIALOG] && intervalRef.current === undefined) {
			intervalRef.current = window.setInterval(refreshMeldinger, TEN_SECONDS);
		}

		return clearAutoRefresh;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function oppdaterMelding(tekst: string) {
		setMelding(tekst);
		midlertidigMelding = tekst;
	}

	function sendMelding() {
		setSenderMelding(true);

		sendDialog(hentId(utkast), melding)
			.then(() => hentMeldinger(hentId(utkast)))
			.then(response => {
				if (response.data) {
					setMeldinger(response.data);
					window.scrollTo(0, document.body.scrollHeight); // Scroll nederst til
				}
				oppdaterMelding('');
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
		if (!senderMelding && e.target.value.length <= MESSAGE_MAX_LENGTH) {
			oppdaterMelding(e.target.value);
		}
	}

	return (
		<div className="dialog-section-innhold">
			<div className="dialog-section-innhold__meldinger">
				{harLastetMeldinger ? (
					<MeldingListe meldinger={sorterteMeldinger} innloggetVeilederIdent={innloggetVeileder.ident} />
				) : (
					<div className="dialog-section-innhold__spinner">
						<Spinner />
					</div>
				)}
			</div>
			<div className="blokk-s">
				<Textarea
					onChange={handleOnMeldingChanged}
					value={melding}
					maxLength={MESSAGE_MAX_LENGTH}
					autoCorrect="on"
					className="dialog-section-innhold__skrivefelt skjemaelement__input textarea--medMeta"
				/>
				<div className="dialog-section-innhold__send">
					<Hovedknapp
						onClick={sendMelding}
						spinner={senderMelding}
						disabled={!kanSendeMelding || senderMelding}
						className="dialog-section-innhold__send-knapp"
					>
						Send
					</Hovedknapp>
				</div>
			</div>
		</div>
	);
}
