import { useEffect, useState } from 'react';
import { BegrunnelseTipsInnhold } from './begrunnelse-tips-innhold';
import { Normaltekst } from 'nav-frontend-typografi';
import FeltHeader from '../felt-header/felt-header';
import { OrNothing } from '../../../../util/type/ornothing';
import { MalformData, MalformType } from '../../../../api/veilarbperson';
import { useDataStore } from '../../../../store/data-store';
import { useSkjemaStore } from '../../../../store/skjema-store';
import { logMetrikk } from '../../../../util/logger';
import { validerBegrunnelseMaxLength } from '../../../../util/skjema-utils';
import { Lix, GammelnavskDictionary } from '../../../../spraksjekk-intern/components';
import { Accordion, Alert, Switch, Textarea } from '@navikt/ds-react';
import './begrunnelse.less';

export const BEGRUNNELSE_ANBEFALT_LENGTH = 4000;
export const BEGRUNNELSE_MAX_LENGTH = 10000;
const CHAR_DIFF_LIMIT_COPY_PASTE = 30;

function malformToTekst(malform: OrNothing<MalformData>): string {
	const malformType = malform ? malform.malform : null;

	if (malformType === MalformType.nn || malformType === MalformType.nb) {
		return `Norsk (${malformType === MalformType.nn ? 'Nynorsk' : 'Bokmål'})`;
	} else if (!malformType) {
		return 'Ukjent';
	}

	return malformType;
}

function Begrunnelse() {
	const { malform } = useDataStore();
	const { begrunnelse, setBegrunnelse, errors, innsatsgruppe } = useSkjemaStore();
	const [begrunnelseFeil, setBegrunnelseFeil] = useState(errors.begrunnelse);
	const [visSprakhjelp, setVisSprakhjelp] = useState(false);

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
		<>
			<div className="begrunnelse-felt" id="begrunnelse-scroll-to">
				<FeltHeader
					tittel="Begrunnelse"
					tittelId="begrunnelse-tittel"
					tipsId="begrunnelse-tips"
					tipsInnhold={<BegrunnelseTipsInnhold />}
					tipsAriaLabel="Tips for begrunnelse"
					eksternLenketekst="Nye retningslinjer for NAV-loven § 14 a"
					eksternLenke="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Oppdaterte-retningslinjer-for.aspx"
				/>

				<div className="begrunnelse">
					<Textarea
						size="small"
						label="Skriv inn din begrunnelse/arbeidsevnevurdering her"
						placeholder="Skriv inn din begrunnelse/arbeidsevnevurdering her"
						value={begrunnelse || ''}
						minRows={30}
						maxRows={30}
						maxLength={BEGRUNNELSE_ANBEFALT_LENGTH}
						i18n={{
							counterLeft: 'tegn igjen av anbefalt maksimum',
							counterTooMuch: 'tegn over anbefalt lengde'
						}}
						onChange={onBegrunnelseChanged}
						error={begrunnelseFeil}
						hideLabel
					/>
					<Normaltekst className="begrunnelse__malform">
						Brukers målform: {malformToTekst(malform)}
					</Normaltekst>
					{begrunnelse && begrunnelse.length > BEGRUNNELSE_ANBEFALT_LENGTH && (
						<Alert
							size="small"
							variant="warning"
							aria-live="polite"
							className="begrunnelse-for-langt-varsel"
						>
							Begrunnelsen du har skrevet er veldig lang og kan derfor være tung å lese for mottaker. Prøv
							å korte den ned.
						</Alert>
					)}
				</div>
			</div>
			<div className="spraksjekk-felt">
				<Switch
					size="small"
					position="left"
					onChange={() => setVisSprakhjelp(!visSprakhjelp)}
					checked={visSprakhjelp}
				>
					Språkhjelp
				</Switch>
				{visSprakhjelp && begrunnelse && begrunnelse.length > 0 && (
					<Accordion>
						{/* <LongParagraphs content={begrunnelse} /> */}
						{/* <LongSentences content={begrunnelse} /> */}
						{/* <LongWords content={begrunnelse} /> */}
						{/* <DuplicateWords content={begrunnelse} /> */}
						<GammelnavskDictionary content={begrunnelse} />
						{/*<NrkDictionaries content={begrunnelse} /> */}
						{/* <AvløserordDictionary content={begrunnelse} /> */}
						{/* <Begrepskatalog content={begrunnelse} /> */}
						{/* <PersonalData content={begrunnelse} /> */}
						<Lix content={begrunnelse} />
						{/* <WordCount content={begrunnelse} /> */}
					</Accordion>
				)}
			</div>
		</>
	);
}

export default Begrunnelse;
