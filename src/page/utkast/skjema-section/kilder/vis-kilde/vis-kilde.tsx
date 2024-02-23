import { erDefaultKilde } from '../../../../../util/skjema-utils';
import { swallowEnterKeyPress } from '../../../../../util';
import { Button, Checkbox } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';
import './vis-kilde.css';

interface VisKildeProps {
	kildenavn: string;
	handleKilde: () => void;
}

export function VisKilde({ kildenavn, handleKilde }: VisKildeProps) {
	const kanRedigeres = !erDefaultKilde(kildenavn);

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
