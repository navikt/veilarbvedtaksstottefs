import { erDefaultKilde } from '../../../../../util/skjema-utils';
import { swallowEnterKeyPress } from '../../../../../util';
import { Button, Checkbox } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';
import './vis-kilde.css';
import { VisKildeArbeidssokerregisteret } from './vis-kilde-arbeidssokerregisteret';

interface VisKildeProps {
	kildeId: string;
	kildetekst: string;
	handleKilde: () => void;
}

export function VisKilde({ kildeId, kildetekst, handleKilde }: Readonly<VisKildeProps>) {
	const kanRedigeres = !erDefaultKilde(kildetekst);
	const erKildeArbeidssokerregister = (kildeTekst: string) => kildeTekst.includes('registrert som arbeidssøk');

	if (erKildeArbeidssokerregister(kildetekst)) {
		return <VisKildeArbeidssokerregisteret kildeId={kildeId} kildetekst={kildetekst} />;
	}

	return (
		<div className="vis-kilde">
			<Checkbox value={kildeId} onKeyDown={swallowEnterKeyPress}>
				{kildetekst}
			</Checkbox>
			{kanRedigeres && (
				<Button
					size="small"
					variant="tertiary"
					icon={<PencilIcon />}
					onClick={handleKilde}
					aria-label={'Rediger ' + kildetekst}
				/>
			)}
		</div>
	);
}
