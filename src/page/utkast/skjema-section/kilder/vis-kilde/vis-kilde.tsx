import { Checkbox } from 'nav-frontend-skjema';
import { Kilde } from '../kilder';
import { erDefaultKilde } from '../../../../../util/skjema-utils';
import { swallowEnterKeyPress } from '../../../../../util';
import { Button } from '@navikt/ds-react';
import { PencilIcon } from '@navikt/aksel-icons';
import './vis-kilde.less';

interface VisKildeProps {
	kilde: Kilde;
	handleKilde: () => void;
	onChange: (opplysning: Kilde) => void;
	erSistEndretIndeks: boolean;
}

export function VisKilde(props: VisKildeProps) {
	const { navn, erValgt } = props.kilde;
	const kanRedigeres = !erDefaultKilde(navn);

	return (
		<div className="vis-kilde">
			<Checkbox
				checked={erValgt}
				label={navn}
				value={navn}
				onKeyPress={swallowEnterKeyPress}
				onChange={(e: any) => props.onChange({ navn, erValgt: e.target.checked })}
			/>
			{kanRedigeres && (
				<Button
					variant="tertiary"
					icon={<PencilIcon />}
					className="vis-kilde__rediger-ikon"
					onClick={e => {
						if (document.activeElement === e.currentTarget) {
							props.handleKilde();
						}
					}}
					aria-label={'Rediger ' + navn}
				/>
			)}
		</div>
	);
}
