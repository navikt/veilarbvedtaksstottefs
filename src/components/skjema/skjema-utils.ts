import  { OpplysningType } from './opplysninger/opplysninger';
import { Opplysninger } from '../../pages/skjema/skjema';

export function byggOpplysningsObject (opplysningerListe: string []) {
    return (opplysningerListe ? opplysningerListe : []).reduce((acc: Opplysninger, opplysning ) => {
        acc[opplysning as OpplysningType] = true;
        return acc;
    }, {} as Opplysninger);
}

export function byggOpplysningliste (opplysningerObj: Opplysninger) {
    return Object.entries(opplysningerObj).reduce((acc, [key, value]) => value ? [...acc, key as OpplysningType] : acc, [] as OpplysningType[]);
}
