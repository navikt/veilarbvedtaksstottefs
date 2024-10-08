import { useEffect, useState } from 'react';
import FeltHeader from '../felt-header/felt-header';
import { alleHovedmal } from '../../../../util/hovedmal';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { useAppStore } from '../../../../store/app-store';
import { HovedmalType, InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { swallowEnterKeyPress } from '../../../../util';
import { ArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils';
import { fetchAktivArbeidssokerperiode } from '../../../../api/veilarbperson';
import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import './hovedmal.css';

function Hovedmal() {
	const { innsatsgruppe, hovedmal: valgtHovedmal, setHovedmal, errors } = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;
	const [arbeidssoekerperiode, setArbeidssoekerperiode] = useState<ArbeidssokerPeriode | null>(null);
	const { fnr } = useAppStore();

	useEffect(() => {
		if (!arbeidssoekerperiode) {
			fetchAktivArbeidssokerperiode(fnr).then(response => setArbeidssoekerperiode(response.data));
		}
	}, [arbeidssoekerperiode, fnr]);

	return (
		<div className="hovedmal-felt" id="hovedmal__scroll-til-feil">
			<FeltHeader tittel="Hovedmål" tittelId="hovedmal-tittel" />
			<RadioGroup
				size="small"
				legend="Valg av hovedmål"
				hideLegend
				onChange={nyttHovedmal => setHovedmal(nyttHovedmal)}
				value={valgtHovedmal}
				error={errors.hovedmal}
			>
				{erVarigTilpassetInnsats ? (
					<span className="hovedmal__empty-tekst">
						Settes ikke for brukere med liten mulighet til å jobbe
					</span>
				) : (
					<>
						{!arbeidssoekerperiode && (
							<Alert size="small" variant="warning" inline>
								Hovedmål <i>skaffe arbeid</i> kan ikke velges fordi personen ikke er registrert som
								arbeidssøker.
							</Alert>
						)}
						{alleHovedmal.map(mal => (
							<Radio
								key={mal.value}
								value={mal.value}
								onKeyDown={swallowEnterKeyPress}
								// Hvis brukeren ikke har en aktiv arbeidssøkerperiode, skal ikke hovedmål "Skaffe arbeid" kunne velges
								disabled={!arbeidssoekerperiode && mal.value === HovedmalType.SKAFFE_ARBEID}
							>
								{mal.label}
							</Radio>
						))}
					</>
				)}
			</RadioGroup>
		</div>
	);
}

export default Hovedmal;
