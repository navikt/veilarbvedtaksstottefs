import React from 'react';
import { useTilgangStore } from '../../store/tilgang-store';
import { EndreUtkastSide } from './endre-utkast-side';
import { LesUtkastSide } from './les-utkast-side';
import './utkast-side.less';

export function UtkastSide() {
	const { erAnsvarligVeileder } = useTilgangStore();
	return erAnsvarligVeileder ? <EndreUtkastSide /> : <LesUtkastSide />;
}
