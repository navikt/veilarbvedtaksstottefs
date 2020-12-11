import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Opplysning } from '../opplysninger';
import { erDefaultOpplysning } from '../../../../../util/skjema-utils';
import { swallowEnterKeyPress } from '../../../../../util';
import './vis-opplysning.less';

interface VisOpplysningProps {
	opplysning: Opplysning;
	handleOpplysning: () => void;
	onChange: (opplysning: Opplysning) => void;
	erSistEndretIndeks: boolean;
}

export function VisOpplysning(props: VisOpplysningProps) {
	const { navn, erValgt } = props.opplysning;
	const kanRedigeres = !erDefaultOpplysning(navn);

	return (
		<div className="vis-opplysning">
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
					className="vis-opplysning__rediger-knapp"
					onClick={e => {
						if (document.activeElement === e.currentTarget) {
							props.handleOpplysning();
						}
					}}
				>
					<div className="vis-opplysning__rediger-ikon" />
				</button>
			)}
		</div>
	);
}
