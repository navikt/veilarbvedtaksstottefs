import FeltHeader from '../felt-header/felt-header';
import { alleHovedmal } from '../../../../util/hovedmal';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { InnsatsgruppeType } from '../../../../api/veilarbvedtaksstotte';
import { swallowEnterKeyPress } from '../../../../util';
import { Radio, RadioGroup } from '@navikt/ds-react';
import './hovedmal.css';

function Hovedmal() {
	const { innsatsgruppe, hovedmal: valgtHovedmal, setHovedmal, errors } = useSkjemaStore();
	const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;

	return (
		<div className="hovedmal-felt" id="hovedmal-scroll-to">
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
					alleHovedmal.map(mal => (
						<Radio key={mal.value} value={mal.value} onKeyDown={swallowEnterKeyPress}>
							{mal.label}
						</Radio>
					))
				)}
			</RadioGroup>
		</div>
	);
}

export default Hovedmal;
