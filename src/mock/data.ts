import { Veileder } from '../api/veilarbveileder';

export const fnr = '00123456789';
export const enhetId = '0118';
export const enhetNavn = 'Nav Testheim';

export const veileder1: Veileder = {
	fornavn: 'Ola',
	etternavn: 'Nordmann',
	navn: 'Ola Nordmann',
	ident: 'O11111111'
};

export const veileder2: Veileder = {
	fornavn: 'Kari',
	etternavn: 'Nordmann',
	navn: 'Kari Nordmann',
	ident: 'K22222222'
};

export const veileder3: Veileder = {
	fornavn: 'Per',
	etternavn: 'Nordmann',
	navn: 'Per Nordmann',
	ident: 'P333333333'
};

export const veiledere: Veileder[] = [veileder1, veileder2, veileder3];
