
import { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from './begrunnelse/begrunnelse';
import { OrNothing } from '../../utils/types/ornothing';
import { SkjemaData } from '../../pages/skjema/vedtakskjema';
import { Opplysning } from './skjema';

const defaultOpplysningsliste =
    [
        {'Brukerens CV': false},
        {'Brukerens svar ved registrering hos NAV': false},
        {'Brukerens jobbprofil på nav.no': false },
        {'Brukerens egenvurdering': false},
    ];

export function skjemaIsNotEmpty (skjema: SkjemaData) {
 return skjema.hovedmal
     || skjema.innsatsgruppe
     || (skjema.opplysninger && (skjema.opplysninger as string[]).length > 0 )
     || skjema.begrunnelse.trim();
}

export function byggOpplysningsObject (opplysningerListe?: string []) {
    return opplysningerListe
        ? opplysningerListe.reduce((acc, opplysning ) => {
            let opplysningsObjekt = {} as Opplysning;
            opplysningsObjekt[opplysning] = true;
            return [...acc, opplysningsObjekt];
        }, [] as Opplysning[])
        : defaultOpplysningsliste;
}

export function byggOpplysningliste (opplysninger: Opplysning[]) {
    return opplysninger.reduce((acc, opplysning) => {
        if (Object.values(opplysning)[0]) {
            return [...acc, Object.keys(opplysning)[0]];
        }
        return acc;
    }, [] as string[]);
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