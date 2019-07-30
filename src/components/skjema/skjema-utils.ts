import { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from './begrunnelse/begrunnelse';
import { OrNothing } from '../../utils/types/ornothing';
import { SkjemaData } from '../../pages/vedtakskjema/vedtakskjema-side';
import { Opplysning } from './opplysninger/opplysninger';
import { MalformType } from '../../rest/data/malform';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

export const defaultOpplysningslisteBokmal =
    [
        'Svarene dine fra da du registrerte deg',
        'CV-en/jobbprofilen din på nav.no',
        'Svarene dine om behov for veiledning',
    ];

export const defaultOpplysningslisteNynorsk =
    [
        'Svara dine frå då du registrerte deg',
        'CV-en/jobbprofilen din på nav.no',
        'Svara dine om behov for rettleiing',
    ];

function finnDefaultOpplysningsliste(malform: MalformType | null) {
    return malform === MalformType.NN
        ? defaultOpplysningslisteNynorsk
        : defaultOpplysningslisteBokmal;
}

export function mergeMedDefaultOpplysninger(opplysningerListe: string [] | undefined, malform: MalformType | null): Opplysning[] {
    const defaultOpplysningsliste = finnDefaultOpplysningsliste(malform);
    const defaultObjekt = byggDefaultOpplysningsObjektliste(opplysningerListe, defaultOpplysningsliste);
    const opplysningslisteObjekt = byggOpplysningsObjektliste(true, opplysningerListe, defaultOpplysningsliste);
    return defaultObjekt.concat(opplysningslisteObjekt);
}

export function erDefaultOpplysning (opplysning: string, malform: MalformType | null) {
    return finnDefaultOpplysningsliste(malform).some(defaultOpplysning => defaultOpplysning === opplysning);
}

function byggDefaultOpplysningsObjektliste(opplysningerListe: string[] | undefined, defaultOpplysningsliste: string[]) {
    return defaultOpplysningsliste.reduce((acc, defaultOpplysning) => {
        let opplysningsObjekt = {} as Opplysning;
        opplysningsObjekt[defaultOpplysning] = opplysningerListe &&
            opplysningerListe.some(opplysning => opplysning === defaultOpplysning) || false;
        return [...acc, opplysningsObjekt];
    }, [] as Opplysning[]);
}

function byggOpplysningsObjektliste (verdi: boolean, opplysningerListe: string [] | undefined, defaultOpplysningsliste: string[]) {
    if (!opplysningerListe) {
        return [];
    }

    const filtretOpplysningsListe = opplysningerListe
        .filter(opplysning => ! defaultOpplysningsliste.some(defaultOpplysning => opplysning === defaultOpplysning));

    return filtretOpplysningsListe.reduce((acc, opplysning ) => {
        let opplysningsObjekt = {} as Opplysning;
        opplysningsObjekt[opplysning] = verdi;
        return [...acc, opplysningsObjekt];
    }, [] as Opplysning[]);
}

export function mapTilTekstliste (opplysninger: Opplysning[]): string[] {
    return opplysninger.reduce((acc, opplysning) => {
        if (Object.values(opplysning)[0]) {
            return [...acc, Object.keys(opplysning)[0]];
        }
        return acc;
    }, [] as string[]);
}

export function isSkjemaEmpty (skjema: SkjemaData) {
    return skjema.hovedmal == null
        && skjema.innsatsgruppe == null
        && (skjema.opplysninger == null || skjema.opplysninger.length === 0)
        && skjema.begrunnelse == null || skjema.begrunnelse === '';
}

export function maSkriveBegrunnelseGittInnsatsgruppe (innsatsgruppe: OrNothing<InnsatsgruppeType>): boolean {
    return innsatsgruppe !== InnsatsgruppeType.STANDARD_INNSATS;
}

export function lagSkjemaElementFeil(error: string | undefined): SkjemaelementFeil | undefined {
    return error ? {feilmelding: error} : undefined;
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

export function validerBegrunnelseMaxLength (begrunnelse: OrNothing<string>) {
    let errors: SkjemaFeil = {};
    if (begrunnelse && begrunnelse.length > BEGRUNNELSE_MAX_LENGTH) {
        errors.begrunnelse =  `Du kan maksimalt skrive ${BEGRUNNELSE_MAX_LENGTH} tegn`;
    }
    return errors;
}

export function utkastetSkalKvalitetssikrets (innsatsgruppe: OrNothing<InnsatsgruppeType>) {
    return innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS
        || innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS;
}
