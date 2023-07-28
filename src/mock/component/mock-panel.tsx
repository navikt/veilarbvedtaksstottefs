import { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import { useDataStore } from '../../store/data-store';
import { useTilgangStore } from '../../store/tilgang-store';
import { finnVeilederTilgang } from '../../util/tilgang';
import { useSkjemaStore } from '../../store/skjema-store';
import { Veileder } from '../../api/veilarbveileder';
import { hentUtkast, oppdaterVedtakUtkastMockFraSkjema, updateInnloggetVeilederMock } from '../api-data';
import { veiledere } from '../data';
import { Button } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import './mock-panel.less';

export function MockPanel() {
	const [visPanel, setVisPanel] = useState(false);

	const toggle = () => setVisPanel(prevVisPanel => !prevVisPanel);

	return (
		<div className="mock-panel">
			{!visPanel && (
				<Button size="small" className="mock-panel__apne-knapp" onClick={toggle}>
					Vis valg
				</Button>
			)}

			{visPanel && (
				<div className="mock-panel__innhold">
					<Button size="small" variant="secondary" icon={<XMarkIcon aria-hidden />} onClick={toggle} />
					<InnloggetSom />
				</div>
			)}
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
