import { useEffect, useState } from 'react';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import FeltHeader from '../felt-header/felt-header';
import './hovedmal.less';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { HovedmalType, InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { lagSkjemaelementFeilmelding, swallowEnterKeyPress } from '../../../../util';
import { OrNothing } from '../../../../util/type/ornothing';
import { ArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils';
import { alleHovedmal } from '../../../../util/hovedmal';
import { useAppStore } from '../../../../store/app-store';
import { fetchAktivArbeidssokerperiode } from '../../../../api/veilarbperson';
import { Alert } from '@navikt/ds-react';

function Hovedmal() {
	const { innsatsgruppe, hovedmal, setHovedmal, errors } = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;
	const [arbeidssoekerperiode, setArbeidssoekerperiode] = useState<ArbeidssokerPeriode | null>(null);
	const { fnr } = useAppStore();

	useEffect(() => {
		if (!arbeidssoekerperiode) {
			fetchAktivArbeidssokerperiode(fnr).then(response => setArbeidssoekerperiode(response.data));
		}
	}, [arbeidssoekerperiode, fnr]);

	return (
		<div className="hovedmal-felt" id="hovedmal-scroll-to">
			<FeltHeader tittel="Hovedmål" tittelId="hovedmal-tittel" />
			<SkjemaGruppe feil={lagSkjemaelementFeilmelding(errors.hovedmal)}>
				{erVarigTilpassetInnsats ? (
					<span className="hovedmal__empty-tekst">
						Settes ikke for brukere med liten mulighet til å jobbe
					</span>
				) : (
					<HovedmalRadioButtons
						handleHovedmalChanged={setHovedmal}
						hovedmal={hovedmal}
						arbeidssokerperiode={arbeidssoekerperiode}
					/>
				)}
			</SkjemaGruppe>
		</div>
	);
}

export default Hovedmal;

interface HovedmalRadioButtonsProps {
	handleHovedmalChanged: (e: any) => void;
	hovedmal: OrNothing<HovedmalType>;
	arbeidssokerperiode: ArbeidssokerPeriode | null;
}

function HovedmalRadioButtons(props: HovedmalRadioButtonsProps) {
	return (
		<div className="hovedmal">
			{!props.arbeidssokerperiode && (
				<Alert size="small" variant="warning" inline>
					Hovedmål <i>skaffe arbeid</i> kan ikke velges fordi personen ikke er registrert som arbeidssøker.
				</Alert>
			)}
			{alleHovedmal.map((mal, idx) => (
				<Radio
					name="hovedmal"
					key={idx}
					label={mal.label}
					value={mal.value}
					onChange={(e: any) => props.handleHovedmalChanged(e.target.value)}
					checked={props.hovedmal === mal.value}
					onKeyPress={swallowEnterKeyPress}
					// Hvis brukeren ikke har en aktiv arbeidssøkerperiode, skal ikke hovedmål "Skaffe arbeid" kunne velges
					disabled={!props.arbeidssokerperiode && mal.value === HovedmalType.SKAFFE_ARBEID}
				/>
			))}
		</div>
	);
}
