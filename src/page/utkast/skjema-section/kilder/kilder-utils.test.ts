import { expect, test } from 'vitest';
import { oppdaterKildevalg } from './kilder-utils';

const automatiskA = 'Automatisk kilde A';
const automatiskB = 'Automatisk kilde B';
const manuellA = 'Manuell kilde A';
const manuellB = 'Manuell kilde B';
const erAutomatisk = (kilde: string) => [automatiskA, automatiskB].includes(kilde);

test('automatic source changes preserve global selection order and manual selections', () => {
	const opprinneligeKilder = [automatiskA, manuellA, manuellB];
	const oppdater = (valgte: string[], nye: string[]) => oppdaterKildevalg(valgte, nye, erAutomatisk);

	expect(oppdater(opprinneligeKilder, [automatiskA])).toEqual(opprinneligeKilder);

	const medNyKilde = oppdater(opprinneligeKilder, [automatiskA, automatiskB]);
	expect(medNyKilde).toEqual([automatiskA, manuellA, manuellB, automatiskB]);

	const utenKilde = oppdater(medNyKilde, [automatiskB]);
	expect(utenKilde).toEqual([manuellA, manuellB, automatiskB]);

	const medKildeValgtPaNytt = oppdater(utenKilde, [automatiskB, automatiskA]);
	expect(medKildeValgtPaNytt).toEqual([manuellA, manuellB, automatiskB, automatiskA]);
	expect(oppdater(medKildeValgtPaNytt, [])).toEqual([manuellA, manuellB]);
	expect(opprinneligeKilder).toEqual([automatiskA, manuellA, manuellB]);
});

test('manual source changes preserve global selection order and automatic selections', () => {
	const opprinneligeKilder = [manuellA, automatiskA, automatiskB];
	const oppdater = (valgte: string[], nye: string[]) => oppdaterKildevalg(valgte, nye, kilde => !erAutomatisk(kilde));

	expect(oppdater(opprinneligeKilder, [manuellA])).toEqual(opprinneligeKilder);

	const medNyKilde = oppdater(opprinneligeKilder, [manuellA, manuellB]);
	expect(medNyKilde).toEqual([manuellA, automatiskA, automatiskB, manuellB]);

	const utenKilde = oppdater(medNyKilde, [manuellB]);
	expect(utenKilde).toEqual([automatiskA, automatiskB, manuellB]);

	const medKildeValgtPaNytt = oppdater(utenKilde, [manuellB, manuellA]);
	expect(medKildeValgtPaNytt).toEqual([automatiskA, automatiskB, manuellB, manuellA]);
	expect(oppdater(medKildeValgtPaNytt, [])).toEqual([automatiskA, automatiskB]);
	expect(opprinneligeKilder).toEqual([manuellA, automatiskA, automatiskB]);
});
