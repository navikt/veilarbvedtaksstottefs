import { VarselModal } from './varsel-modal/varsel-modal';
import { ModalProps } from './modal-props';
import { ModalType, useModalStore } from '../../store/modal-store';
import { useDataStore } from '../../store/data-store';
import { BodyShort, Button, CopyButton, Heading, Link, Modal } from '@navikt/ds-react';
import { useAppStore } from '../../store/app-store';
import './modal.css';
import { formateStringInUpperAndLowerCase } from '../../util/tekst-utils';
import { InnsatsgruppeType } from '../../api/veilarbvedtaksstotte';
import { useSkjemaStore } from '../../store/skjema-store.ts';

interface VedtakSendtModalProps extends ModalProps {
	onSendVedtakBekreftet: () => void;
}

export default function BekreftSendVedtakModal(props: VedtakSendtModalProps) {
	const { resetModalType, modalType } = useModalStore();
	const navn = useDataStore().navn;
	const fnr = useAppStore().fnr;
	const { innsatsgruppe } = useSkjemaStore();

	const erVarigInnsats =
//		innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS ||
//		innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS;
	innsatsgruppe === InnsatsgruppeType.STANDARD_INNSATS;

	return (
		<VarselModal
			isOpen={props.isOpen}
			onRequestClose={() => {}}
			contentLabel="Bekreft vedtaket blir sendt til bruker"
		>
			<Modal.Header>
				<Heading level="1" size="medium">
					Er du sikker på at du vil fatte vedtak for bruker?
				</Heading>
				<div className="bekreft-send-vedtak-modal-personinfo">
					<BodyShort weight="semibold">
						{`${formateStringInUpperAndLowerCase(navn.fornavn)} ${formateStringInUpperAndLowerCase(navn.mellomnavn)} ${formateStringInUpperAndLowerCase(navn.etternavn)}`}
					</BodyShort>
					<CopyButton
						copyText={fnr}
						text={`F.nr.: ${fnr}`}
						iconPosition="right"
						size="xsmall"
						className="bekreft-send-vedtak-modal-personinfo-copybutton"
					/>
				</div>
			</Modal.Header>
			<Modal.Body className="bekreft-send-vedtak-modal-body">
				<BodyShort>Vedtaksbrevet blir sendt til bruker.</BodyShort>
				{erVarigInnsats && (
					<BodyShort className="bekreft-send-vedtak-modal-varsel-tekst">
						Hvis brukeren skal ha AAP etter § 11-18, må du huske å sende Gosys-oppgave til Nav arbeid og ytelser,
						se{' '}
						<Link
							href="https://navno.sharepoint.com/sites/fag-og-ytelser-regelverk-og-rutiner/SitePages/Arbeidsevnen%20avklart%20mot%20varig%20tilpasset%20innsats.aspx?web=1"
							target="_blank"
							rel="noopener noreferrer"
						>
							servicerutine på Navet
						</Link>
						.
					</BodyShort>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button size="small" onClick={props.onSendVedtakBekreftet} loading={modalType === ModalType.LASTER}>
					Ja, fatt vedtak
				</Button>
				<Button
					size="small"
					variant="secondary"
					onClick={resetModalType}
					loading={modalType === ModalType.LASTER}
				>
					Avbryt
				</Button>
			</Modal.Footer>
		</VarselModal>
	);
}
