import { ansvarligVeileder } from '../personer';
import { enhetId, enhetNavn } from '../konstanter';

export const innloggetVeileder =
    {
        navn: ansvarligVeileder.navn,
        ident: ansvarligVeileder.ident,
        enhetId,
        enhetNavn,
    };
