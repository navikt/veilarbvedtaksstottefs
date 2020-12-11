import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Kilde } from '../kilder';
import { erDefaultKilde } from '../../../../../utils/skjema-utils';
import { swallowEnterKeyPress } from '../../../../../utils';
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
				<button
					aria-label={'Rediger ' + navn}
					className="vis-kilde__rediger-knapp"
					onClick={e => {
						if (document.activeElement === e.currentTarget) {
							props.handleKilde();
						}
					}}
				>
					<div className="vis-kilde__rediger-ikon" />
				</button>
			)}
		</div>
	);
}
