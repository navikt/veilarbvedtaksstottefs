import React, { useEffect, useState } from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { validerBegrunnelseMaxLength } from '../../../../utils/skjema-utils';
import { useSkjemaStore } from '../../../../stores/skjema-store';
import { BegrunnelseTipsInnhold } from './begrunnelse-tips-innhold';
import { MalformData, MalformType } from '../../../../rest/data/malform';
import { useDataStore } from '../../../../stores/data-store';
import { Normaltekst } from 'nav-frontend-typografi';
import { OrNothing } from '../../../../utils/types/ornothing';
import Show from '../../../../components/show';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { logMetrikk } from '../../../../utils/logger';
import FeltHeader from '../felt-header/felt-header';
import './begrunnelse.less';
import { lagSkjemaelementFeilmelding } from '../../../../utils';

export const BEGRUNNELSE_ANBEFALT_LENGTH = 4000;
export const BEGRUNNELSE_MAX_LENGTH = 10000;
const CHAR_DIFF_LIMIT_COPY_PASTE = 30;

function malformToTekst(malform: OrNothing<MalformData>): string {
	const malformType = malform ? malform.malform : null;

	if (malformType === MalformType.NN || malformType === MalformType.NB) {
		return `Norsk (${malformType === MalformType.NN ? 'Nynorsk' : 'Bokmål'})`;
	} else if (!malformType) {
		return 'Ukjent';
	}

	return malformType;
}

function Begrunnelse() {
	const { malform } = useDataStore();
	const { begrunnelse, setBegrunnelse, errors, innsatsgruppe } = useSkjemaStore();
	const [begrunnelseFeil, setBegrunnelseFeil] = useState(errors.begrunnelse);

	function onBegrunnelseChanged(e: any) {
		const newText = e.target.value;
		const oldText = begrunnelse || '';
		const charDiff = newText.length - oldText.length;

		if (charDiff >= CHAR_DIFF_LIMIT_COPY_PASTE) {
			logMetrikk('begrunnelse-copy-paste', { tegn: charDiff, innsatsgruppe: innsatsgruppe || '' });
		}

		if (newText.length <= BEGRUNNELSE_MAX_LENGTH) {
			setBegrunnelse(newText);
		} else {
			setBegrunnelse(newText.substring(0, BEGRUNNELSE_MAX_LENGTH));
		}
	}

	useEffect(() => {
		const feil = validerBegrunnelseMaxLength(begrunnelse);
		setBegrunnelseFeil(feil.begrunnelse);
	}, [begrunnelse]);

	useEffect(() => {
		setBegrunnelseFeil(errors.begrunnelse);
	}, [errors.begrunnelse]);

	return (
		<div className="begrunnelse-felt" id="begrunnelse-scroll-to">
			<FeltHeader
				tittel="Begrunnelse"
				tittelId="begrunnelse-tittel"
				tipsId="begrunnelse-tips"
				tipsInnhold={<BegrunnelseTipsInnhold />}
				tipsAriaLabel="Begrunnelse tips"
			/>
			<div className="begrunnelse">
				<SkjemaGruppe feil={lagSkjemaelementFeilmelding(begrunnelseFeil)} className="begrunnelse__container">
					<Textarea
						value={begrunnelse || ''}
						label=""
						placeholder="Skriv inn din begrunnelse/arbeidsevnevurdering her"
						maxLength={BEGRUNNELSE_ANBEFALT_LENGTH}
						onChange={onBegrunnelseChanged}
						aria-labelledby="begrunnelse-tittel"
						autoCorrect="on"
						className="begrunnelse-tekstomrade skjemaelement__input textarea--medMeta"
					/>
					<Normaltekst className="begrunnelse__malform">
						Brukers målform: {malformToTekst(malform)}
					</Normaltekst>
					<Show if={begrunnelse && begrunnelse.length > BEGRUNNELSE_ANBEFALT_LENGTH}>
						<AlertStripeAdvarsel className="begrunnelse-for-langt-varsel">
							Begrunnelsen du har skrevet er veldig lang, og derfor tung å lese for mottaker. Prøv å korte
							den ned.
						</AlertStripeAdvarsel>
					</Show>
				</SkjemaGruppe>
			</div>
		</div>
	);
}

export default Begrunnelse;
