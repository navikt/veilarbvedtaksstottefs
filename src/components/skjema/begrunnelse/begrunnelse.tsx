import React, { useEffect, useState } from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { BegrunnelseHjelpeTekster } from './begrunnelse-hjelpetekster';
import { lagSkjemaElementFeil, validerBegrunnelseMaxLength } from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { frontendlogger } from '../../../utils/frontend-logger';
import './begrunnelse.less';

export const BEGRUNNELSE_MAX_LENGTH = 4000;
const CHAR_DIFF_LIMIT_COPY_PASTE = 30;

function Begrunnelse() {
	const {begrunnelse, setBegrunnelse, errors, innsatsgruppe} = useSkjemaStore();
	const [begrunnelseFeil, setBegrunnelseFeil] = useState(errors.begrunnelse);

	function onBegrunnelseChanged(e: any) {
		const newText = e.target.value;
		const oldText = begrunnelse || '';
		const charDiff = newText.length - oldText.length;

		if (charDiff >= CHAR_DIFF_LIMIT_COPY_PASTE) {
			frontendlogger.logMetrikk('begrunnelse-copy-paste', { tegn: charDiff, innsatsgruppe });
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
				<AlertStripeInfo>
					Ved <i>standard innsats</i> er begrunnelse ikke obligatorisk. Unntaket er hvis du skal gjøre en ny
					vurdering, og gjeldende oppfølgingsvedtak viser <i>nedsatt arbeidsevne</i>
				</AlertStripeInfo>
				<SkjemaGruppe feil={lagSkjemaElementFeil(begrunnelseFeil)} className="begrunnelse__container">
					<Textarea
						id="begrunnelse-scroll-to"
						value={begrunnelse || ''}
						label=""
						placeholder="Skriv inn begrunnelse eller arbeidsevnevurdering"
						maxLength={BEGRUNNELSE_MAX_LENGTH}
						onChange={onBegrunnelseChanged}
						aria-labelledby="begrunnelse-tittel"
						aria-describedby="begrunnelse-tips"
					/>
					<span id="begrunnelse-tips" style={{display: 'none'}}>
						Begrunnelse for vedtak/arbeidsevnevurdering, tips ved siden av
					</span>
				</SkjemaGruppe>
				<BegrunnelseHjelpeTekster/>
			</div>
		</SkjemaBolk>
	);
}

export default Begrunnelse;
