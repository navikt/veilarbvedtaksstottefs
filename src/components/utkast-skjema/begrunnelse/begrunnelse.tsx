import React, { useEffect, useState } from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { lagSkjemaElementFeil, validerBegrunnelseMaxLength } from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { frontendlogger } from '../../../utils/frontend-logger';
import './begrunnelse.less';
import { useInnloggetVeilederStore } from '../../../stores/innlogget-veileder-store';

export const BEGRUNNELSE_MAX_LENGTH = 4000;
const CHAR_DIFF_LIMIT_COPY_PASTE = 30;

function Begrunnelse() {
	const { kanEndreUtkast } = useInnloggetVeilederStore();
	const {begrunnelse, setBegrunnelse, errors, innsatsgruppe} = useSkjemaStore();
	const [begrunnelseFeil, setBegrunnelseFeil] = useState(errors.begrunnelse);

	function onBegrunnelseChanged(e: any) {
		const newText = e.target.value;
		const oldText = begrunnelse || '';
		const charDiff = newText.length - oldText.length;

		if (charDiff >= CHAR_DIFF_LIMIT_COPY_PASTE) {
			frontendlogger.logMetrikk('begrunnelse-copy-paste',
				{ tegn: charDiff, innsatsgruppe: innsatsgruppe || '' });
		}

		setBegrunnelse(newText);
	}

	useEffect(() => {
		const feil = validerBegrunnelseMaxLength(begrunnelse);
		setBegrunnelseFeil(feil.begrunnelse);
	}, [begrunnelse]);

	useEffect(() => {
		setBegrunnelseFeil(errors.begrunnelse);
	}, [errors.begrunnelse]);

	return (
		<SkjemaBolk tittel="Begrunnelse" tittelId="begrunnelse-tittel">
			<div className="begrunnelse">
				<SkjemaGruppe feil={lagSkjemaElementFeil(begrunnelseFeil)} className="begrunnelse__container">
					<Textarea
						id="begrunnelse-scroll-to"
						value={begrunnelse || ''}
						label=""
						placeholder="Skriv inn din begrunnelse/arbeidsevnevurdering her"
						maxLength={BEGRUNNELSE_MAX_LENGTH}
						onChange={onBegrunnelseChanged}
						aria-labelledby="begrunnelse-tittel"
						aria-describedby="begrunnelse-tips"
						autoCorrect="on"
						disabled={!kanEndreUtkast}
					/>
				</SkjemaGruppe>
			</div>
		</SkjemaBolk>
	);
}

export default Begrunnelse;
