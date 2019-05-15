import  { OpplysningType } from './opplysninger/opplysninger';
import { Opplysninger, SkjemaData } from '../../pages/skjema/skjema';
import { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { BEGRUNNELSE_MAX_LENGTH } from './begrunnelse/begrunnelse';
import { OrNothing } from '../../utils/types/ornothing';

export function byggOpplysningsObject (opplysningerListe: string []) {
    return (opplysningerListe ? opplysningerListe : []).reduce((acc: Opplysninger, opplysning ) => {
        acc[opplysning as OpplysningType] = true;
        return acc;
    }, {} as Opplysninger);
}

export function byggOpplysningliste (opplysningerObj: Opplysninger) {
    return Object.entries(opplysningerObj).reduce((acc, [key, value]) => value ? [...acc, key as OpplysningType] : acc, [] as OpplysningType[]);
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

    if (skjema.andreOpplysninger.length === 0 && skjema.opplysninger.length === 0) {
        errors.opplysninger = 'Mangler opplysninger';
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