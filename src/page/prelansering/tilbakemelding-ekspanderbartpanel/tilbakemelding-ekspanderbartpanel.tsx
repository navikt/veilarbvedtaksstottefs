import React, { useState } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import svaertBraBilde from './svaert_bra.svg';
import svaertDarligBilde from './svaert_darlig.svg';
import ImageButton from '../../../component/image-button/image-button';
import './tilbakemelding-ekspanderbartpanel.less';
import { logMetrikk } from '../../../util/logger';

interface TilbakemeldingEkspanderbartpanelProps {
	tittel: string;
	bilde: string;
	tilbakemeldingTag?: string;
	children?: React.ReactNode;
}

export type TilbakemeldingValg = 'JA' | 'NEI';

const LOCAL_STORAGE_PREFIX = 'prelansering_tilbakemelding_';

function TilbakemeldingEkspanderbartpanel(props: TilbakemeldingEkspanderbartpanelProps) {
	const localStorageName = LOCAL_STORAGE_PREFIX + props.tilbakemeldingTag;
	const harSendtTilbakemeldingTidligere = localStorage.getItem(localStorageName) != null;
	const [visTilbakemelding, setVisTilbakemelding] = useState(!harSendtTilbakemeldingTidligere);

	const handleTilbakemeldingValgClicked = (valg: TilbakemeldingValg) => {
		localStorage.setItem(localStorageName, 'true');
		setVisTilbakemelding(false);
		logMetrikk('tilbakemeldinger.info-om-ny-losning', {
			tag: props.tilbakemeldingTag,
			valg
		});
	};

	const Heading = () => (
		<div className="tilbakemelding-ekspanderbartpanel__heading">
			<img src={props.bilde} alt="Illustrasjon" className="tilbakemelding-ekspanderbartpanel__bilde" />
			<Undertittel className="ekspanderbartPanel__heading">{props.tittel}</Undertittel>
		</div>
	);

	return (
		<Ekspanderbartpanel tittel={<Heading />} border={true}>
			<div className="tilbakemelding-ekspanderbartpanel__innhold">
				{props.children}
				{visTilbakemelding && (
					<div className="tilbakemelding-ekspanderbartpanel__tilbakemelding">
						<Undertittel tag="h3">Var dette nyttig?</Undertittel>
						<div className="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg-wrapper">
							<ImageButton
								src={svaertBraBilde}
								alt="Ja"
								onClick={() => handleTilbakemeldingValgClicked('JA')}
								imgClassName="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg"
							/>
							<ImageButton
								src={svaertDarligBilde}
								alt="Nei"
								onClick={() => handleTilbakemeldingValgClicked('NEI')}
								imgClassName="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg"
							/>
						</div>
					</div>
				)}
			</div>
		</Ekspanderbartpanel>
	);
}

export default TilbakemeldingEkspanderbartpanel;
