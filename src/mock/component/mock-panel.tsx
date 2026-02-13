import { useState } from 'react';
import { useDataStore } from '../../store/data-store';
import { useTilgangStore } from '../../store/tilgang-store';
import { finnVeilederTilgang } from '../../util/tilgang';
import { useSkjemaStore } from '../../store/skjema-store';
import { Veileder } from '../../api/veilarbveileder';
import { hentUtkast, oppdaterVedtakUtkastMockFraSkjema, updateInnloggetVeilederMock } from '../api-data';
import { veiledere } from '../data';
import { Box, Button, Radio, RadioGroup } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import './mock-panel.css';

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
				<Box
					background="default"
					paddingBlock="2"
					paddingInline="4"
					borderWidth="5"
					borderColor="brand-blue"
					className="mock-panel__innhold"
				>
					<Button size="small" variant="secondary" icon={<XMarkIcon aria-hidden />} onClick={toggle} />
					<InnloggetSom />
				</Box>
			)}
		</div>
	);
}

function InnloggetSom() {
	const { innloggetVeileder, setInnloggetVeileder, setUtkast } = useDataStore();
	const { setVeilederTilgang } = useTilgangStore();
	const { innsatsgruppe, hovedmal, begrunnelse, valgteKilder } = useSkjemaStore();

	const skjemaData = { innsatsgruppe, hovedmal, begrunnelse, opplysninger: valgteKilder };

	function byttInnloggetVeileder(veilederident: string) {
		const veileder = veiledere.find(v => v.ident === veilederident) as Veileder;

		oppdaterVedtakUtkastMockFraSkjema(skjemaData);
		setUtkast(hentUtkast());
		updateInnloggetVeilederMock(veileder);
		setInnloggetVeileder(veileder);
		setVeilederTilgang(finnVeilederTilgang(veileder, hentUtkast()));
	}

	return (
		<RadioGroup legend="Innlogget som:" onChange={byttInnloggetVeileder} value={innloggetVeileder.ident}>
			{veiledere.map(veileder => (
				<Radio key={veileder.ident} value={veileder.ident}>
					{veileder.navn}
				</Radio>
			))}
		</RadioGroup>
	);
}
