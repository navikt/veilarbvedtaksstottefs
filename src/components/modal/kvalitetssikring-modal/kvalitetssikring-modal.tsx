import React, { useEffect, useState } from 'react';
import { VarselModal } from '../varsel-modal/varsel-modal';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp, Flatknapp } from 'nav-frontend-knapper';
import { ModalProps } from '../modal-props';
import { useModalStore } from '../../../stores/modal-store';
import '../varsel-modal/varsel-modal.less';
import './kvalitetetssikring-modal.less';
import { OrNothing } from '../../../utils/types/ornothing';
import Show from '../../show';

interface KvalitetsSikringModalInnsendingProps extends ModalProps {
	sendVedtak: (beslutter?: string) => void;
	beslutterNavn: OrNothing<string>;
}

export function KvalitetsSikringModalInnsending(props: KvalitetsSikringModalInnsendingProps) {
	const { hideModal } = useModalStore();
	const [beslutter, setBeslutter] = useState<string>('');
	const [error, setError] = useState<{ feilmelding: string } | undefined>(undefined);
	const [harForsoktSende, setHarForsoktSende] = useState<boolean>(false);
	const harFyltUtBeslutter = beslutter.trim().length > 0;

	const handleSend = () => {
		setHarForsoktSende(true);
		if (harFyltUtBeslutter) {
			props.sendVedtak(beslutter);
		} else {
			setError({ feilmelding: 'Skriv inn navn på beslutter som har kvalitetssikret for å sende vedtaket' });
		}
	};

	useEffect(() => {
		if (props.beslutterNavn) {
			setBeslutter(props.beslutterNavn);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.beslutterNavn]);

	useEffect(() => {
		if (harForsoktSende && harFyltUtBeslutter) {
			setError(undefined);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [beslutter]);

	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Arbeidsevnevurderingen må godkjennes av beslutter"
			onRequestClose={hideModal}
			type="ADVARSEL"
			shouldCloseOnOverlayClick={false}
			closeButton={false}
		>
			<Systemtittel>{props.beslutterNavn ? 'Beslutter' : 'Hvem var beslutter?'}</Systemtittel>
			<Show if={props.beslutterNavn != null}>
				<Normaltekst className="kvalitetssikring__ingress">Sjekk at navnet på beslutter stemmer eller endre navnet i feltet nedenfor.</Normaltekst>
			</Show>
			<Input
				label="Navn på beslutter:"
				onChange={e => setBeslutter(e.target.value)}
				value={beslutter}
				feil={error}
				className="kvalitetssikring__input"
				placeholder="Legg til fullt navn på beslutter"
			/>
			<div className="varsel-modal__knapper kvalitetssikring__knapper">
				<Hovedknapp onClick={handleSend}>Send til bruker</Hovedknapp>
				<Flatknapp onClick={hideModal}>Avbryt</Flatknapp>
			</div>
		</VarselModal>
	);
}
