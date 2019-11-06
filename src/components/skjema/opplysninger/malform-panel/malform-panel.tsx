import React from 'react';
import { MalformType } from '../../../../rest/data/malform';
import veilederBilde from './veileder.svg';
import './malform-panel.less';

interface MalformPanelProps {
	malform: MalformType | null;
}

export const MalformPanel = (props: MalformPanelProps) => {
	const malformTekst = `Norsk (${props.malform === MalformType.NN ? 'Nynorsk' : 'Bokmål'})`;
	return (
		<div className="malform-panel">
			<img src={veilederBilde} className="malform-panel__bilde" alt="Veileder"/>
			Brukeren har målform <span className="malform-panel__malform">{malformTekst}</span>
		</div>
	);
};
