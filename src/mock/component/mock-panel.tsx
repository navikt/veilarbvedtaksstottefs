import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import Lukknapp from 'nav-frontend-lukknapp';
import { useDataStore } from '../../store/data-store';
import { useTilgangStore } from '../../store/tilgang-store';
import { finnVeilederTilgang } from '../../util/tilgang';
import { useSkjemaStore } from '../../store/skjema-store';
import Show from '../../component/show';
import './mock-panel.less';
import { Veileder } from '../../api/veilarbveileder';
import { hentUtkast, oppdaterVedtakUtkastMockFraSkjema, updateInnloggetVeilederMock } from '../api-data';
import { veiledere } from '../data';

export function MockPanel() {
	const [visPanel, setVisPanel] = useState(false);

	const toggle = () => setVisPanel(prevVisPanel => !prevVisPanel);

	return (
		<div className="mock-panel">
			<Show if={!visPanel}>
				<button className="mock-panel__apne-knapp" onClick={toggle}>
					Vis valg
				</button>
			</Show>

			<Show if={visPanel}>
				<div className="mock-panel__innhold">
					<Lukknapp onClick={toggle} />
					<InnloggetSom />
				</div>
			</Show>
		</div>
	);
}

function InnloggetSom() {
	const { innloggetVeileder, setInnloggetVeileder, setUtkast } = useDataStore();
	const { setVeilederTilgang } = useTilgangStore();
	const { innsatsgruppe, hovedmal, begrunnelse, kilder } = useSkjemaStore();

	const skjemaData = { innsatsgruppe, hovedmal, begrunnelse, opplysninger: kilder };

	function byttInnloggetVeileder(veileder: Veileder) {
		oppdaterVedtakUtkastMockFraSkjema(skjemaData);
		setUtkast(hentUtkast());
		updateInnloggetVeilederMock(veileder);
		setInnloggetVeileder(veileder);
		setVeilederTilgang(finnVeilederTilgang(veileder, hentUtkast()));
	}

	return (
		<fieldset>
			<legend>
				<Normaltekst>Innlogget som</Normaltekst>
			</legend>
			{veiledere.map(veileder => (
				<RadioPanel
					onChange={() => byttInnloggetVeileder(veileder)}
					key={veileder.ident}
					name={veileder.navn}
					label={veileder.navn}
					value={veileder.navn}
					checked={veileder.ident === innloggetVeileder.ident}
				/>
			))}
		</fieldset>
	);
}
