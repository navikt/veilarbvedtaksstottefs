import { useEffect, useState } from 'react';
import { Alert, Radio, RadioGroup } from '@navikt/ds-react';
import { ArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils';
import FeltHeader from '../felt-header/felt-header';
import { hovedmalTekst } from '../../../../util/hovedmal';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { useAppStore } from '../../../../store/app-store';
import { HovedmalType, InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { swallowEnterKeyPress } from '../../../../util';
import { fetchAktivArbeidssokerperiode } from '../../../../api/veilarbperson';
import { useDataStore } from '../../../../store/data-store';
import { HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE } from '../../../../api/obo-unleash';
import './hovedmal.css';

function Hovedmal() {
	const { innsatsgruppe, hovedmal: valgtHovedmal, setHovedmal, errors } = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;
	const [arbeidssoekerperiode, setArbeidssoekerperiode] = useState<ArbeidssokerPeriode | null>(null);
	const { fnr } = useAppStore();

	const { features } = useDataStore();
	const skaffeArbeidUavhengigAvArbeidssokerperiode =
		features[HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE];

	const skaffeArbeidErIkkeValgbar = !skaffeArbeidUavhengigAvArbeidssokerperiode && !arbeidssoekerperiode;

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
						{skaffeArbeidErIkkeValgbar && (
							<Alert size="small" variant="warning" inline>
								Hovedmål <i>skaffe arbeid</i> kan ikke velges fordi personen ikke er registrert som
								arbeidssøker.
							</Alert>
						)}
						{Object.values(HovedmalType).map(hovedmaltype => (
							<Radio
								key={hovedmaltype}
								value={hovedmaltype}
								onKeyDown={swallowEnterKeyPress}
								// Hvis brukeren ikke har en aktiv arbeidssøkerperiode (og feature-toggle er av), skal ikke hovedmål "Skaffe arbeid" kunne velges
								disabled={skaffeArbeidErIkkeValgbar && hovedmaltype === HovedmalType.SKAFFE_ARBEID}
							>
								{hovedmalTekst[hovedmaltype]}
							</Radio>
						))}
					</>
				)}
			</RadioGroup>
		</div>
	);
}

export default Hovedmal;
