import { swallowEnterKeyPress } from '../../../../../util';
import { Alert, Checkbox } from '@navikt/ds-react';
import './vis-kilde.css';
import { useDataStore } from '../../../../../store/data-store';

interface VisKildeProps {
	kildenavn: string;
}

export function VisKildeArbeidssokerregisteret({ kildenavn }: Readonly<VisKildeProps>) {
	const { arbeidssokerperiode } = useDataStore();

	return (
		<>
			<Checkbox value={kildenavn} onKeyDown={swallowEnterKeyPress} disabled={!arbeidssokerperiode}>
				{kildenavn}
			</Checkbox>
			{!arbeidssokerperiode && (
				<Alert size="small" variant="warning" inline className="vis-kilde__alert">
					Ikke registrert i Arbeidssøkerregisteret
				</Alert>
			)}
		</>
	);
}
