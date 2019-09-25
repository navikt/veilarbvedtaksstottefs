import React, { FormEvent, useEffect, useState } from 'react';
import { formatInputDate } from '../../../utils/date-utils';
import { Input, Select, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Enhet, Veileder, VeiledereData } from '../../../rest/data/veiledere';

interface BeslutterOppgaveModalInnholdProps {
	veiledereData: VeiledereData;
	onCancel: () => void;
	onSubmit: (data: BeslutterOppgaveData) => void;
	senderOppgave: boolean;
}

export interface BeslutterOppgaveData {
	aktivFra: string;
	frist: string;
	enhet: string;
	beslutter: string | undefined;
	beskrivelse: string;
}

const MAX_BESKRIVELSE_LENGDE = 250;

const BESLUTTER_IKKE_VALGT = 'IKKE_VALGT';

const DEFAULT_BESKRIVELSE = 'Jeg har innstilt på delvis varig tilpasset innsats eller varig tilpasset innsats. ' +
	'Sendes til beslutter for kvalitetsikring.';

function mapVeiledereToOptions(veilederListe: Veileder[]) {
	return veilederListe.map(veileder =>
		<option key={veileder.ident} value={veileder.ident}>{veileder.navn}</option>);
}

export function BeslutterOppgaveModalInnhold(props: BeslutterOppgaveModalInnholdProps) {
	const { veiledereData: { enhet, veilederListe }, onCancel, onSubmit, senderOppgave } = props;

	const [aktivFra, setAktivFra] = useState(formatInputDate(new Date()));
	const [frist, setFrist] = useState('');
	const [beslutter, setBeslutter] = useState<string | undefined>(undefined);
	const [beskrivelse, setBeskrivelse] = useState(DEFAULT_BESKRIVELSE);

	function handleBeskrivelseChanged(e: any) {
		const value = e.target.value;
		if (value.length <= MAX_BESKRIVELSE_LENGDE) {
			setBeskrivelse(value);
		}
	}

	function handleOnSubmit(e: FormEvent) {
		e.preventDefault();
		const valgtBeslutter = beslutter !== BESLUTTER_IKKE_VALGT ? beslutter : undefined;
		onSubmit({
			aktivFra,
			frist,
			beskrivelse,
			enhet: enhet.enhetId,
			beslutter: valgtBeslutter
		});
	}

	const enhetTekst = `${enhet.enhetId}, ${enhet.navn}`;

	return (
		<>
			<form onSubmit={handleOnSubmit}>
				<div className="blokk-l">
					<Select id="tema" label="Tema" disabled={true}>
						<option value="oppfolging">Oppfølging</option>
					</Select>
					<Select id="oppgavetype" label="Oppgavetype" disabled={true}>
						<option value="vurder_hendvendelse">Vurder henvendelse</option>
					</Select>
					<Select id="prioritet" className="blokk-s" label="Prioritet" disabled={true}>
						<option value="normal">Normal</option>
					</Select>
					<div className="blokk-s to-kol">
						<div>
							<label htmlFor="fraDato">Aktiv fra</label>
							<br/>
							<input id="fraDato" type="date" onChange={(e) => setAktivFra(e.target.value)} value={aktivFra} />
						</div>
						<div>
							<label htmlFor="frist">Frist</label>
							<br/>
							<input id="frist" type="date" onChange={(e) => setFrist(e.target.value)} value={frist}/>
						</div>
					</div>
					<div className="to-kol">
						<Input id="enhet" label="Enhet" value={enhetTekst} disabled/>
						<Select
							id="beslutter"
							label="Beslutter"
							selected={beslutter}
							onChange={(e) => setBeslutter(e.target.value)}
						>
							<option value={BESLUTTER_IKKE_VALGT}/>
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
		</>
	);
}
