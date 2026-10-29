import { erDefaultKilde } from '../../../../../util/skjema-utils';
import { swallowEnterKeyPress } from '../../../../../util';
import { Button, Checkbox } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';
import './vis-kilde.css';
import { VisKildeArbeidssokerregisteret } from './vis-kilde-arbeidssokerregisteret';
import { VisKildeEgenvurdering } from './vis-kilde-egenvurdering';

interface VisKildeProps {
	kildenavn: string;
	handleKilde: () => void;
}

export function VisKilde({ kildenavn, handleKilde }: Readonly<VisKildeProps>) {
	const kanRedigeres = !erDefaultKilde(kildenavn);
	const erKildeArbeidssokerregister = (kildeTekst: string) => kildeTekst.includes('registrert som arbeidssøk');

	if (erKildeArbeidssokerregister(kildenavn)) {
		return <VisKildeArbeidssokerregisteret kildenavn={kildenavn} />;
	}

	if (kildenavn === 'Svarene dine om behov for veiledning') {
		return <VisKildeEgenvurdering kildenavn={kildenavn} />;
	}

	return (
		<div className="vis-kilde">
			<Checkbox value={kildenavn} onKeyDown={swallowEnterKeyPress}>
				{kildenavn}
			</Checkbox>
			{kanRedigeres && (
				<Button
					size="small"
					variant="tertiary"
					icon={<PencilIcon />}
					onClick={handleKilde}
					aria-label={'Rediger ' + kildenavn}
				/>
			)}
		</div>
	);
}
