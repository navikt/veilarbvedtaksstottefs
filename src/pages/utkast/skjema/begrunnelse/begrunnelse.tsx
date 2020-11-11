import React, { useEffect, useState } from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { validerBegrunnelseMaxLength } from '../../../../utils/skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../../stores/skjema-store';
import { TipsPopover } from '../../../../components/tips-popover/tips-popover';
import { BegrunnelseTipsInnhold } from './begrunnelse-tips-innhold';
import { MalformData, MalformType } from '../../../../rest/data/malform';
import { useDataStore } from '../../../../stores/data-store';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { OrNothing } from '../../../../utils/types/ornothing';
import Show from '../../../../components/show';
import './begrunnelse.less';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { logMetrikk } from '../../../../utils/logger';

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

	const begrunnelseTittel = (
		<div className="begrunnelse__tittel">
			<Undertittel id="begrunnelse-tittel">Begrunnelse</Undertittel>
			<TipsPopover id="begrunnelse-tips" tipsInnhold={<BegrunnelseTipsInnhold />} ariaLabel="Begrunnelse tips" />
		</div>
	);

	return (
		<SkjemaBolk tittel={begrunnelseTittel} className="begrunnelse-skjema-bolk">
			<div className="begrunnelse">
				<SkjemaGruppe
					feil={begrunnelseFeil && <SkjemaelementFeilmelding>{begrunnelseFeil}</SkjemaelementFeilmelding>}
					className="begrunnelse__container"
				>
					<Textarea
						id="begrunnelse-scroll-to"
						value={begrunnelse || ''}
						label=""
						placeholder="Skriv inn din begrunnelse/arbeidsevnevurdering her"
						maxLength={BEGRUNNELSE_ANBEFALT_LENGTH}
						onChange={onBegrunnelseChanged}
						aria-labelledby="begrunnelse-tittel"
						autoCorrect="on"
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
		</SkjemaBolk>
	);
}

export default Begrunnelse;
