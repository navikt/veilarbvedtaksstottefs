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
import { DropdownOption, SearchDropdown } from '../../search-dropdown/search-dropdown';

interface BeslutterOppgaveModalInnholdProps {
	veiledereData: VeiledereData;
	onCancel: () => void;
	onSubmit: (data: BeslutterOppgaveData) => void;
	senderOppgave: boolean;
}

export interface BeslutterOppgaveData {
	aktivFra: string;
	frist: string | null;
	beslutterIdent: string | null;
	beskrivelse: string | null;
	prioritet: Prioritet;
}

const MAX_BESKRIVELSE_LENGDE = 250;

function lagDefaultBeskrivelse(innsatsgruppe: OrNothing<InnsatsgruppeType>): string {
	const innsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS ? 'varig' : 'delvis varig';
	return `Jeg har innstilt på ${innsats} tilpasset innsats. Sendes til beslutter for kvalitetsikring.`;
}

function mapVeiledereToOptions(veilederListe: Veileder[]): DropdownOption[] {
	return veilederListe.map(veileder => ({ value: veileder.ident, label: veileder.navn}));
}

export enum Prioritet {
	LAV = 'LAV',
	NORMAL = 'NORM',
	HOY = 'HOY'
}

export function BeslutterOppgaveModalInnhold(props: BeslutterOppgaveModalInnholdProps) {
	const {innsatsgruppe} = useSkjemaStore();
	const {veiledereData: {enhet, veilederListe}, onCancel, onSubmit, senderOppgave} = props;

	const [aktivFra, setAktivFra] = useState<Date>(new Date());
	const [frist, setFrist] = useState<Date | undefined>();
	const [prioritet, setPrioritet] = useState<Prioritet>(Prioritet.NORMAL);
	const [beslutterIdent, setBeslutterIdent] = useState<string | null>(null);
	const [beskrivelse, setBeskrivelse] = useState(lagDefaultBeskrivelse(innsatsgruppe));

	function handleBeskrivelseChanged(e: any) {
		const value = e.target.value;
		setBeskrivelse(value.substr(0, MAX_BESKRIVELSE_LENGDE));
	}

	function handleBeslutterChanged(selectedOption: DropdownOption | null) {
		setBeslutterIdent(selectedOption ? selectedOption.value : null);
	}

	function handleOnSubmit(e: FormEvent) {
		e.preventDefault();
		onSubmit({
			aktivFra: formaterBeslutterOppgaveDato(aktivFra),
			frist: frist ? formaterBeslutterOppgaveDato(frist) : null,
			beskrivelse,
			beslutterIdent,
			prioritet
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
					<Select
						id="prioritet"
						label="Prioritet"
						value={prioritet}
						onChange={(e) => setPrioritet(e.target.value as Prioritet)}
						className="beslutter-oppgave-modal__prioritet"
					>
						<option value={Prioritet.LAV}>Lav</option>
						<option value={Prioritet.NORMAL}>Normal</option>
						<option value={Prioritet.HOY}>Høy</option>
					</Select>
				</div>
				<div className="beslutter-oppgave-modal__beslutter blokk-s">
					<Input id="enhet" label="Enhet" value={enhetTekst} disabled/>
					<SearchDropdown
						id="beslutter"
						label="Beslutter"
						placeholder="Søk etter veileder"
						options={mapVeiledereToOptions(veilederListe)}
						onChange={handleBeslutterChanged}
					/>
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
