import { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from './begrunnelse/begrunnelse';
import { OrNothing } from '../../utils/types/ornothing';
import { SkjemaData } from '../../pages/vedtakskjema/vedtakskjema-side';
import { Opplysning } from './opplysninger/opplysninger';

const defaultOpplysningsliste =
    [
        'Brukerens CV',
        'Brukerens svar ved registrering hos NAV',
        'Brukerens jobbprofil på nav.no',
        'Brukerens egenvurdering',
    ];

export function mergeMedDefaultOpplysninger(opplysningerListe?: string []): Opplysning[] {
    const filtretDefaultFraBackend = filtrerDefaultOpplysningerFraBackend(opplysningerListe);
    const defaultObjekt = byggOpplysningsObjektliste(false, filtretDefaultFraBackend);
    const opplysningslisteObjekt = byggOpplysningsObjektliste(true, opplysningerListe);
    return defaultObjekt.concat(opplysningslisteObjekt);

}

function sjekkHvisOpplysningStartedMedDefaultOpplysning(opplysningerListe: string[], defaultOpplysning: string ) {
    return opplysningerListe.some(opplysning => opplysning.trim().toLowerCase().startsWith(defaultOpplysning.trim().toLowerCase()));
}

function filtrerDefaultOpplysningerFraBackend (opplysningerListe?: string []) {
    return opplysningerListe ?
        defaultOpplysningsliste
            .filter(defaultOpplysning => !sjekkHvisOpplysningStartedMedDefaultOpplysning(opplysningerListe, defaultOpplysning))
        : defaultOpplysningsliste;
}

function byggOpplysningsObjektliste (verdi: boolean, opplysningerListe?: string []) {
    if (!opplysningerListe) {
        return [];
    }
    return opplysningerListe.reduce((acc, opplysning ) => {
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