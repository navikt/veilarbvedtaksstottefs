import React from 'react';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';
import { OrNothing } from '../../utils/types/ornothing';
import { InnsatsgruppeType } from '../../rest/data/vedtak';
import { getInnsatsgruppeTekst } from '../../utils/innsatsgruppe';

export function InnsatsgruppeVisning(props: {
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	beslutterNavn: OrNothing<string>;
}) {
	return (
		<SkjemaBolk tittel="Innsatsgruppe" tittelId="innsatsgruppe-tittel">
			<div className="innsatsgruppe-visning">
				<span>{getInnsatsgruppeTekst(props.innsatsgruppe as InnsatsgruppeType).tittel}</span>
				{props.beslutterNavn && (
					<span>
						<b>Beslutter: </b> {props.beslutterNavn}
					</span>
				)}
			</div>
		</SkjemaBolk>
	);
}
