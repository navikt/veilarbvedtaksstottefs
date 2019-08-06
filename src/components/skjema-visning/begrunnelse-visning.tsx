import React from 'react';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';
import { EMDASH } from '../../utils';
import { OrNothing } from '../../utils/types/ornothing';

export function BegrunnelseVisning(props: { begrunnelse: OrNothing<string> }) {
	return (
		<SkjemaBolk tittel="Begrunnelse" tittelId="begrunnelse-tittel">
			<p className="begrunnelse-visning">{props.begrunnelse ? props.begrunnelse : EMDASH}</p>
		</SkjemaBolk>
	);
}
