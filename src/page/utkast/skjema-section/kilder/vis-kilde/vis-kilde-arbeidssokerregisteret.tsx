import { swallowEnterKeyPress } from '../../../../../util';
import { Alert, Checkbox } from '@navikt/ds-react';
import './vis-kilde.css';
import { useDataStore } from '../../../../../store/data-store';

interface VisKildeProps {
	kildeId: string;
	kildetekst: string;
}

export function VisKildeArbeidssokerregisteret({ kildeId, kildetekst }: Readonly<VisKildeProps>) {
	const { arbeidssokerperiode } = useDataStore();

	return (
		<>
			<Checkbox value={kildeId} onKeyDown={swallowEnterKeyPress} disabled={!arbeidssokerperiode}>
				{kildetekst}
			</Checkbox>
			{!arbeidssokerperiode && (
				<Alert size="small" variant="info" inline className="vis-kilde__alert">
					Du kan ikke bruke denne kilden, fordi bruker ikke er registrert i Arbeidssøkerregisteret.
				</Alert>
			)}
		</>
	);
}
