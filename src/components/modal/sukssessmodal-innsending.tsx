import React from 'react';
import { VarselModal } from './varsel-modal/varsel-modal';
import { Systemtittel } from 'nav-frontend-typografi';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Knapp } from 'nav-frontend-knapper';
import { ModalProps } from './modal-props';
import { useModalStore } from '../../stores/modal-store';

export function SuksessModalInnsending(props: ModalProps) {
	const { hideModal } = useModalStore();
	return (
		<VarselModal
			isOpen={props.isOpen}
			contentLabel="Vedtaket sendt til bruker"
			onRequestClose={hideModal}
			type="SUKSESS"
		>
			<Systemtittel className="blokk-xxxs">Vedtak sendt til bruker</Systemtittel>
			<Normaltekst className="blokk-s">
				Du finner innholdet i vedtaket på fanen for oppfølgingsvedtak. Brukeren får vedtaksbrevet digitalt eller
				i posten
			</Normaltekst>
			<Knapp onClick={hideModal}>Lukk</Knapp>
		</VarselModal>
	);
}
