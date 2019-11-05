import { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from './begrunnelse/begrunnelse';
import { OrNothing } from '../../utils/types/ornothing';
import { SkjemaData } from '../../pages/vedtakskjema/vedtakskjema-side';
import { Opplysning } from './opplysninger/opplysninger';
import { MalformData, MalformType } from '../../rest/data/malform';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

export const opplysningslisteBokmal = [
	'Svarene dine fra da du registrerte deg',
	'CV-en/jobbprofilen din på nav.no',
	'Svarene dine om behov for veiledning'
];

export const opplysningslisteNynorsk = [
	'Svara dine frå då du registrerte deg',
	'CV-en/jobbprofilen din på nav.no',
	'Svara dine om behov for rettleiing'
];

export function hentMalformFraData(malformData: MalformData | null): MalformType | null {
	return malformData ? malformData.malform : null;
}

export function mapOpplysningerFraForskjelligMalformTilBokmal(opplysningerListe: string[]): string[] {
	return opplysningerListe.map(opplysning => {
		const translationPos = opplysningslisteNynorsk.indexOf(opplysning);
		return translationPos === -1
			? opplysning
			: opplysningslisteBokmal[translationPos];
	});
}

export function mapOpplysningerFraBokmalTilBrukersMalform(opplysningerListe: string[] | undefined, malformType: MalformType | null): string[] {
	if (!opplysningerListe) return [];

	// Trenger ikke å mappe hvis vi ikke vet malform eller det allerede er på bokmål
	if (!malformType || malformType === MalformType.NB) return opplysningerListe;

	return opplysningerListe.map(opplysning => {
		const translationPos = opplysningslisteBokmal.indexOf(opplysning);
		return translationPos === -1
			? opplysning
			: opplysningslisteNynorsk[translationPos];
	});
}

export function mergeMedDefaultOpplysninger(opplysningListe: string[]): Opplysning[] {
	const opplysninger = opplysningslisteBokmal.map(opplysningTekst => ({
		navn: opplysningTekst,
		erValgt: opplysningListe.includes(opplysningTekst)
	}));

	opplysningListe.filter(opplysningTekst => !opplysningslisteBokmal.includes(opplysningTekst))
		.forEach(opplysningTekst => opplysninger.push({ navn: opplysningTekst, erValgt: true }));

	return opplysninger;
}

export function erDefaultOpplysning(opplysning: string) {
	return opplysningslisteBokmal.some(defaultOpplysning => defaultOpplysning === opplysning);
}

export function isSkjemaEmpty(skjema: SkjemaData) {
	return (
		(skjema.hovedmal == null &&
			skjema.innsatsgruppe == null &&
			(skjema.opplysninger == null || skjema.opplysninger.length === 0) &&
			skjema.begrunnelse == null) ||
		skjema.begrunnelse === ''
	);
}

export function maSkriveBegrunnelseGittInnsatsgruppe(innsatsgruppe: OrNothing<InnsatsgruppeType>): boolean {
	return innsatsgruppe !== InnsatsgruppeType.STANDARD_INNSATS;
}

export function lagSkjemaElementFeil(error: string | undefined): SkjemaelementFeil | undefined {
	return error ? { feilmelding: error } : undefined;
}

export function harFeil(skjemaFeil: SkjemaFeil): boolean {
	return Object.keys(skjemaFeil).length > 0;
}

export function scrollTilForsteFeil(skjemaFeil: SkjemaFeil): void {
	let forsteFeilNavn;

	if (skjemaFeil.opplysninger) {
		forsteFeilNavn = 'opplysninger';
	} else if (skjemaFeil.begrunnelse) {
		forsteFeilNavn = 'begrunnelse';
	} else if (skjemaFeil.innsatsgruppe) {
		forsteFeilNavn = 'innsatsgruppe';
	} else if (skjemaFeil.hovedmal) {
		forsteFeilNavn = 'hovedmal';
	}

	if (forsteFeilNavn) {
		const tittelElem = document.getElementById(forsteFeilNavn + '-scroll-to');
		if (tittelElem) {
			tittelElem.scrollIntoView({ block: 'center' });
		}
	}
}

export function validerSkjema(skjema: SkjemaData): SkjemaFeil {
	const errors: SkjemaFeil = {};
	const innsatsgruppe = skjema.innsatsgruppe;

	if (!innsatsgruppe) {
		errors.innsatsgruppe = 'Mangler innsatsgruppe';
	}

	if (!skjema.hovedmal && innsatsgruppe !== InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
		errors.hovedmal = 'Mangler hovedmål';
	}

	const begrunnelse = skjema.begrunnelse ? skjema.begrunnelse.trim() : '';

	if (!begrunnelse && maSkriveBegrunnelseGittInnsatsgruppe(innsatsgruppe)) {
		errors.begrunnelse = 'Mangler begrunnelse';
	}

	const begrunnelsefeil = validerBegrunnelseMaxLength(begrunnelse);
	Object.assign(errors, begrunnelsefeil);

	if (!skjema.opplysninger || skjema.opplysninger.length < 1) {
		errors.opplysninger = 'Mangler kilder';
	}

	return errors;
}

export function validerBegrunnelseMaxLength(begrunnelse: OrNothing<string>) {
	const errors: SkjemaFeil = {};
	if (begrunnelse && begrunnelse.length > BEGRUNNELSE_MAX_LENGTH) {
		errors.begrunnelse = `Du kan maksimalt skrive ${BEGRUNNELSE_MAX_LENGTH} tegn`;
	}
	return errors;
}

export function trengerBeslutter(innsatsgruppe: OrNothing<InnsatsgruppeType>) {
	return innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS
		|| innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS;
}
