import { enhet, enhetNavn } from './konstanter';

export const ansvarligVeileder = {
	navn: 'Ola Nordmann',
	ident: 'O150566',
	enhetId: enhet,
	enhetNavn: 'Gotham city',
};

export const ikkeAnsvarligVeileder = {
	navn: 'Kari Nordmann',
	ident: 'Z123',
	enhetId: enhet,
	enhetNavn,
};

export const beslutter = {
	navn: 'Beslutter Besluttersen',
	ident: 'S150566',
	enhetId: ansvarligVeileder.enhetId,
	enhetNavn: ansvarligVeileder.enhetNavn,
};

