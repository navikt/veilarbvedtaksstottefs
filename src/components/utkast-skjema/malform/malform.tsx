import React from 'react';
import { MalformType } from '../../../rest/data/malform';
import veilederBilde from './veileder.svg';
import { useDataStore } from '../../../stores/data-store';
import './malform.less';

export const Malform = () => {
	const { malform } = useDataStore();
	const malformData = malform && malform.malform;
	const malformTekst = `Norsk (${malformData === MalformType.NN ? 'Nynorsk' : 'Bokmål'})`;

	return (
		<div className="malform-panel">
			<img src={veilederBilde} className="malform-panel__bilde" alt="Veileder"/>
			Brukeren har målform <span className="malform-panel__malform">{malformTekst}</span>
		</div>
	);
};
