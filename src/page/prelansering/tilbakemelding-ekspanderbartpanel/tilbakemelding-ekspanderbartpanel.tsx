import React, { useState } from 'react';
import { logMetrikk } from '../../../util/logger';
import { Button, ExpansionCard, Heading, HStack } from '@navikt/ds-react';
import { FaceFrownFillIcon, FaceSmileFillIcon } from '@navikt/aksel-icons';
import './tilbakemelding-ekspanderbartpanel.less';

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

	return (
		<ExpansionCard aria-label={props.tittel}>
			<ExpansionCard.Header className="tilbakemelding-ekspanderbartpanel__heading">
				<img src={props.bilde} alt="Illustrasjon" className="tilbakemelding-ekspanderbartpanel__bilde" />
				<ExpansionCard.Title>{props.tittel}</ExpansionCard.Title>
			</ExpansionCard.Header>

			<ExpansionCard.Content>
				{props.children}
				{visTilbakemelding && (
					<HStack gap="4" align="center" className="tilbakemelding-ekspanderbartpanel__tilbakemelding">
						<Heading size="small" level="3">
							Var dette nyttig?
						</Heading>
						<Button
							size="small"
							variant="tertiary"
							icon={<FaceSmileFillIcon />}
							onClick={() => handleTilbakemeldingValgClicked('JA')}
							className="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg-ja"
						/>
						<Button
							size="small"
							variant="tertiary"
							icon={<FaceFrownFillIcon />}
							onClick={() => handleTilbakemeldingValgClicked('NEI')}
							className="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg-nei"
						/>
					</HStack>
				)}
			</ExpansionCard.Content>
		</ExpansionCard>
	);
}

export default TilbakemeldingEkspanderbartpanel;
