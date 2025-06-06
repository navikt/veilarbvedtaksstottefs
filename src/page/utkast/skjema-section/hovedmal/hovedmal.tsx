import { Radio, RadioGroup } from '@navikt/ds-react';
import FeltHeader from '../felt-header/felt-header';
import { hovedmalTekst } from '../../../../util/hovedmal';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { HovedmalType, InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { swallowEnterKeyPress } from '../../../../util';
import './hovedmal.css';

function Hovedmal() {
	const { innsatsgruppe, hovedmal: valgtHovedmal, setHovedmal, errors } = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;

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
						{Object.values(HovedmalType).map(hovedmaltype => (
							<Radio key={hovedmaltype} value={hovedmaltype} onKeyDown={swallowEnterKeyPress}>
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
