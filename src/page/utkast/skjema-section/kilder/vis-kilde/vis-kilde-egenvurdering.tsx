import { swallowEnterKeyPress } from '../../../../../util';
import { Alert, Checkbox } from '@navikt/ds-react';
import { useDataStore } from '../../../../../store/data-store';
import { SKRU_AV_EGENVURDERINGSKILDE_TOGGLE } from '../../../../../api/obo-unleash';
import './vis-kilde.css';

interface VisKildeProps {
	kildenavn: string;
}

export function VisKildeEgenvurdering({ kildenavn }: Readonly<VisKildeProps>) {
	const { features } = useDataStore();
	const skruAvEgenvurderingskilde = features[SKRU_AV_EGENVURDERINGSKILDE_TOGGLE];

	return (
		<>
			<Checkbox value={kildenavn} onKeyDown={swallowEnterKeyPress} disabled={skruAvEgenvurderingskilde}>
				{kildenavn}
			</Checkbox>
			{skruAvEgenvurderingskilde && (
				<Alert size="small" variant="warning" inline className="vis-kilde__alert">
					Du kan ikke bruke denne kilden akkurat nå. Teknisk vedlikehold pågår, se driftsmelding.
				</Alert>
			)}
		</>
	);
}
