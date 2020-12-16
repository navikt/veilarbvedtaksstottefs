import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import Lukknapp from 'nav-frontend-lukknapp';
import { useDataStore } from '../../store/data-store';
import { useTilgangStore } from '../../store/tilgang-store';
import { finnVeilederTilgang } from '../../util/tilgang';
import Lenke from 'nav-frontend-lenker';
import { useSkjemaStore } from '../../store/skjema-store';
import './mock-panel.less';
import { Veileder } from '../../api/veilarbveileder';
import { veiledere } from '../data';
import { hentUtkast, oppdaterVedtakUtkastMockFraSkjema, updateInnloggetVeilederMock } from '../api-data';

export function MockPanel() {
	const [skalVise, setSkalVise] = useState(false);
	const visSkjul = skalVise ? 'vis' : 'skjul';
	const toggle = () => setSkalVise(!skalVise);

	return (
		<div className={`mock-panel mock-panel--${visSkjul}`}>
			<button className="apne-lukk-knapp" onClick={toggle}>
				<Normaltekst>Vis valg</Normaltekst>
			</button>
			<Lukknapp onClick={toggle} />
			<InnloggetSom />
			<BeslutteroversiktLenke />
		</div>
	);
}

function InnloggetSom() {
	const { innloggetVeileder, setInnloggetVeileder, setUtkast } = useDataStore();
	const { setVeilederTilgang } = useTilgangStore();
	const { innsatsgruppe, hovedmal, begrunnelse, kilder } = useSkjemaStore();

	const skjemaData = { innsatsgruppe, hovedmal, begrunnelse, opplysninger: kilder };

	function change(veileder: Veileder) {
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
			{veiledere.map((veileder, idx) => (
				<RadioPanel
					onChange={() => {
						change(veileder);
					}}
					key={idx}
					name={veileder.navn}
					label={veileder.navn}
					value={veileder.navn}
					checked={veileder.ident === innloggetVeileder.ident}
				/>
			))}
		</fieldset>
	);
}

function BeslutteroversiktLenke() {
	return (
		<fieldset>
			<Lenke href={'https://navikt.github.io/beslutteroversikt/'} target="_blank">
				Til beslutteroversikt
			</Lenke>
		</fieldset>
	);
}
