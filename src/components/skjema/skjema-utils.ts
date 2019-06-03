import { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from './begrunnelse/begrunnelse';
import { OrNothing } from '../../utils/types/ornothing';
import { SkjemaData } from '../../pages/vedtakskjema/vedtakskjema-side';
import { Opplysning } from './opplysninger/opplysninger';

export const defaultOpplysningsliste =
    [
        'Svarene dine fra da du registrerte deg',
        'CV-en og jobbprofilen din',
        'Svarene dine om behov for veiledning',
    ];

export function mergeMedDefaultOpplysninger(opplysningerListe?: string []): Opplysning[] {
    const defaultObjekt = byggDefaultOpplysningsObjektliste(opplysningerListe);
    const opplysningslisteObjekt = byggOpplysningsObjektliste(true, opplysningerListe);
    return defaultObjekt.concat(opplysningslisteObjekt);
}

export function erDefaultOpplysning (opplysning: string) {
    return defaultOpplysningsliste.some(defaultOpplysning => defaultOpplysning === opplysning);
}

function byggDefaultOpplysningsObjektliste(opplysningerListe?: string[]) {
    return defaultOpplysningsliste.reduce((acc, defaultOpplysning) => {
        let opplysningsObjekt = {} as Opplysning;
        opplysningsObjekt[defaultOpplysning] = opplysningerListe &&
            opplysningerListe.some(opplysning => opplysning === defaultOpplysning) || false;
        return [...acc, opplysningsObjekt];
    }, [] as Opplysning[]);
}

function byggOpplysningsObjektliste (verdi: boolean, opplysningerListe?: string []) {
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

export function mapTilTekstliste (opplysninger: Opplysning[]) {
    return opplysninger.reduce((acc, opplysning) => {
        if (Object.values(opplysning)[0]) {
            return [...acc, Object.keys(opplysning)[0]];
        }
        return acc;
    }, [] as string[]);
}

export function skjemaIsNotEmpty (skjema: SkjemaData) {
    return skjema.hovedmal
        || skjema.innsatsgruppe
        || (skjema.opplysninger && (skjema.opplysninger as string[]).length > 0 )
        || skjema.begrunnelse.trim();
}

function maSkriveBegrunnelseGittInnsatsgruppe (innsatsgruppe: OrNothing<InnsatsgruppeType>) {
    return (innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS || innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS);
}

export function validerSkjema(skjema: SkjemaData) {
    let errors: SkjemaFeil = {};
    const innsatsgruppe = skjema.innsatsgruppe;
    if (!innsatsgruppe) {
        errors.innsatsgruppe = 'Mangler innsatsgruppe';
    }

    if (!skjema.hovedmal) {
        errors.hovedmal = 'Mangler hovedmal';
    }

    const begrunnelse = skjema.begrunnelse.trim();
    if (!begrunnelse && maSkriveBegrunnelseGittInnsatsgruppe(innsatsgruppe) ) {
        errors.begrunnelse = 'Mangler begrunnelse';
    }

    if (begrunnelse.length > BEGRUNNELSE_MAX_LENGTH && maSkriveBegrunnelseGittInnsatsgruppe(innsatsgruppe)) {
        errors.begrunnelse = 'Begrunnelsen må vare 2000 teign';
    }

    return errors;
}

export function utkastetSkalKvalitetssikrets (innsatsgruppe?: InnsatsgruppeType) {
    return innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS || innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS;
}
