import  { OpplysningType } from './opplysninger/opplysninger';
import { Opplysninger, SkjemaData } from '../../pages/skjema/skjema';
import { InnsatsgruppeType } from './innsatsgruppe/innsatsgruppe';
import { SkjemaFeil } from '../../utils/types/skjema-feil';

export function byggOpplysningsObject (opplysningerListe: string []) {
    return (opplysningerListe ? opplysningerListe : []).reduce((acc: Opplysninger, opplysning ) => {
        acc[opplysning as OpplysningType] = true;
        return acc;
    }, {} as Opplysninger);
}

export function byggOpplysningliste (opplysningerObj: Opplysninger) {
    return Object.entries(opplysningerObj).reduce((acc, [key, value]) => value ? [...acc, key as OpplysningType] : acc, [] as OpplysningType[]);
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
    if (!begrunnelse && (innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS || innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS)) {
        errors.begrunnelse = 'Mangler begrunnelse';
    }

    return errors;
}