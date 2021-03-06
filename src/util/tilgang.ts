import { OrNothing } from './type/ornothing';
import { Veileder } from '../api/veilarbveileder';
import { Utkast } from '../api/veilarbvedtaksstotte';

export enum VeilederTilgang {
	BESLUTTER = 'BESLUTTER',
	ANSVARLIG_VEILEDER = 'ANSVARLIG_VEILEDER',
	IKKE_ANSVARLIG_VEILEDER = 'IKKE_ANSVARLIG_VEILEDER'
}

export function kanEndreUtkast(tilgang: VeilederTilgang): boolean {
	return tilgang === VeilederTilgang.ANSVARLIG_VEILEDER;
}

export function erAnsvarligVeileder(tilgang: VeilederTilgang): boolean {
	return tilgang === VeilederTilgang.ANSVARLIG_VEILEDER;
}

export function erIkkeAnsvarligVeileder(tilgang: VeilederTilgang): boolean {
	return tilgang === VeilederTilgang.IKKE_ANSVARLIG_VEILEDER;
}

export function erBeslutter(tilgang: VeilederTilgang): boolean {
	return tilgang === VeilederTilgang.BESLUTTER;
}

export function finnVeilederTilgang(innloggetVeileder: Veileder, vedtak: OrNothing<Utkast>): VeilederTilgang {
	const innloggetIdent = innloggetVeileder.ident;

	if (!vedtak) {
		return VeilederTilgang.IKKE_ANSVARLIG_VEILEDER;
	} else if (vedtak.veilederIdent === innloggetIdent) {
		return VeilederTilgang.ANSVARLIG_VEILEDER;
	} else if (vedtak.beslutterIdent === innloggetIdent) {
		return VeilederTilgang.BESLUTTER;
	}

	return VeilederTilgang.IKKE_ANSVARLIG_VEILEDER;
}
