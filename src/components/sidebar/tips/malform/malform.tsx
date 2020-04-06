import React from 'react';
import { MalformType } from '../../../../rest/data/malform';
import { useDataStore } from '../../../../stores/data-store';
import './malform.less';

function malformToTekst(malform: MalformType): string {
	if (malform === MalformType.NN || malform === MalformType.NB) {
		return `Norsk (${malform === MalformType.NN ? 'Nynorsk' : 'Bokmål'})`;
	}

	return malform;
}

export const Malform = () => {
	const { malform } = useDataStore();
	const malformData = malform && malform.malform;

	if (malformData == null) {
		return null;
	}

	return (
		<div className="malform-panel">
			<span className="malform-panel__tekst">Denne brukeren har valgt målform:</span>
			<span className="malform-panel__malform">{malformToTekst(malformData)}</span>
		</div>
	);
};
