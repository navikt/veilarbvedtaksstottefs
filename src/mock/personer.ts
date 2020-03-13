import { enhet } from './konstanter';

export const innloggetVeileder = {
	navn: 'Ola Nordmann',
	ident: 'Z007',
	enhetId: enhet,
	enhetNavn: 'Gotham city',
};

export const beslutter = {
	navn: 'Beslutter Besluttersen',
	ident: 'Z442389',
	enhetId: innloggetVeileder.enhetId,
	enhetNavn: innloggetVeileder.enhetNavn,
};

export const ansvarligVeileder = innloggetVeileder;
