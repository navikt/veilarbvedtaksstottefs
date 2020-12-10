import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';
import { fetchMeldinger, fetchSendDialog } from '../../../rest/api';
import { hentId } from '../../../utils';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { MeldingListe } from './melding-liste/melding-liste';
import { useDataStore } from '../../../stores/data-store';
import { sortDatesAsc } from '../../../utils/date-utils';
import { SKRU_AV_POLLING_DIALOG } from '../../../rest/data/features';
import Spinner from '../../../components/spinner/spinner';
import './dialog-section.less';

let midlertidigMelding = '';

const TEN_SECONDS = 10000;

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
		fetchMeldinger(hentId(utkast))
			.then(response => {
				if (response.data) {
					setMeldinger(response.data);
				}
			})
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

		fetchSendDialog({ vedtakId: hentId(utkast), melding })
			.then(() => fetchMeldinger(hentId(utkast)))
			.then(response => {
				if (response.data) {
					setMeldinger(response.data);
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
		if (!senderMelding) {
			oppdaterMelding(e.target.value);
		}
	}

	return (
		<div className="dialog-section-innhold">
			<div>
				{harLastetMeldinger ? (
					<MeldingListe meldinger={sorterteMeldinger} innloggetVeilederIdent={innloggetVeileder.ident} />
				) : (
					<div className="dialog-section-innhold__spinner">
						<Spinner />
					</div>
				)}
			</div>
			<div className="blokk-s">
				<Textarea onChange={handleOnMeldingChanged} value={melding} />
				<div className="dialog-section-innhold__send">
					<Hovedknapp
						onClick={sendMelding}
						spinner={senderMelding}
						disabled={!kanSendeMelding || senderMelding}
					>
						Send
					</Hovedknapp>
				</div>
			</div>
		</div>
	);
}
