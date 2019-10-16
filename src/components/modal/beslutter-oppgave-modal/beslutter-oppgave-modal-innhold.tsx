import React, { FormEvent, useState } from 'react';
import { Input, Select, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Veileder, VeiledereData } from '../../../rest/data/veiledere';
import { InnsatsgruppeType } from '../../skjema/innsatsgruppe/innsatsgruppe';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { OrNothing } from '../../../utils/types/ornothing';
import { Datepicker } from '../../datepicker/datepicker';
import { formaterBeslutterOppgaveDato } from '../../../utils/date-utils';
import { Label } from '../../label';
import { Seperator } from '../../seperator/seperator';

interface BeslutterOppgaveModalInnholdProps {
	veiledereData: VeiledereData;
	onCancel: () => void;
	onSubmit: (data: BeslutterOppgaveData) => void;
	senderOppgave: boolean;
}

export interface BeslutterOppgaveData {
	aktivFra: string;
	frist: string | null;
	enhet: string;
	beslutter: string | null;
	beskrivelse: string;
}

const MAX_BESKRIVELSE_LENGDE = 250;
const BESLUTTER_IKKE_VALGT = 'IKKE_VALGT';

function lagDefaultBeskrivelse(innsatsgruppe: OrNothing<InnsatsgruppeType>): string {
	const innsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS ? 'varig' : 'delvis varig';
	return `Jeg har innstilt på ${innsats} tilpasset innsats. Sendes til beslutter for kvalitetsikring.`;
}

function mapVeiledereToOptions(veilederListe: Veileder[]) {
	return veilederListe.map(veileder =>
		<option key={veileder.ident} value={veileder.ident}>{veileder.navn}</option>);
}

export function BeslutterOppgaveModalInnhold(props: BeslutterOppgaveModalInnholdProps) {
	const {innsatsgruppe} = useSkjemaStore();
	const {veiledereData: {enhet, veilederListe}, onCancel, onSubmit, senderOppgave} = props;

	const [aktivFra, setAktivFra] = useState<Date>(new Date());
	const [frist, setFrist] = useState<Date | undefined>();
	const [beslutter, setBeslutter] = useState<string | undefined>(undefined);
	const [beskrivelse, setBeskrivelse] = useState(lagDefaultBeskrivelse(innsatsgruppe));

	function handleBeskrivelseChanged(e: any) {
		const value = e.target.value;
		setBeskrivelse(value.substr(0, MAX_BESKRIVELSE_LENGDE));
	}

	function handleOnSubmit(e: FormEvent) {
		e.preventDefault();
		const valgtBeslutter = (beslutter && beslutter !== BESLUTTER_IKKE_VALGT) ? beslutter : null;
		onSubmit({
			aktivFra: formaterBeslutterOppgaveDato(aktivFra),
			frist: frist ? formaterBeslutterOppgaveDato(frist) : null,
			beskrivelse,
			enhet: enhet.enhetId,
			beslutter: valgtBeslutter
		});
	}

	const enhetTekst = `${enhet.enhetId}, ${enhet.navn}`;

	return (
		<form className="beslutter-oppgave-modal__innhold" onSubmit={handleOnSubmit}>
			<div className="blokk-m">
				<div className="beslutter-oppgave-modal__labels blokk-m">
					<Label labelText="Tema" valueText="Oppfølging"/>
					<Seperator/>
					<Label labelText="Oppgavetype" valueText="Vurder hendvendelse"/>
					<Seperator/>
					<Label labelText="Gjelder" valueText="Til beslutter"/>
				</div>
				<div className="beslutter-oppgave-modal__dato-prioritet blokk-s">
					<div className="beslutter-oppgave-modal__dato">
						<Datepicker id="fraDato" label="Aktiv fra" value={aktivFra} onDateChange={setAktivFra}/>
						<Datepicker id="frist" label="Frist" value={frist} onDateChange={setFrist}/>
					</div>
					<Select className="beslutter-oppgave-modal__prioritet" id="prioritet" label="Prioritet">
						<option value="normal">Normal</option>
					</Select>
				</div>
				<div className="beslutter-oppgave-modal__beslutter blokk-s">
					<Input id="enhet" label="Enhet" value={enhetTekst} disabled/>
					<Select
						id="beslutter"
						label="Beslutter"
						selected={beslutter}
						onChange={(e) => setBeslutter(e.target.value)}
					>
						<option value={BESLUTTER_IKKE_VALGT}>Enhet</option>
						{mapVeiledereToOptions(veilederListe)}
					</Select>
				</div>
				<Textarea
					id="beskrivelse"
					maxLength={MAX_BESKRIVELSE_LENGDE}
					label="Beskrivelse"
					value={beskrivelse}
					onChange={handleBeskrivelseChanged}
				/>
			</div>
			<div className="knapperad">
				<Hovedknapp
					spinner={senderOppgave}
					disabled={senderOppgave}
					htmlType="submit"
					mini={true}
				>
					Bekreft
				</Hovedknapp>
				<Knapp
					disabled={senderOppgave}
					htmlType="button"
					mini={true}
					onClick={onCancel}
				>
					Avbryt
				</Knapp>
			</div>
		</form>
	);
}
