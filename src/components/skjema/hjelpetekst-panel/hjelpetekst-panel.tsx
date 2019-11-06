import React, { PropsWithChildren, useState } from 'react';
import cls from 'classnames';
import { ReactComponent as InfoSirkelIkon } from './info-sirkel.svg';
import './hjelpetekst-panel.less';
import {
	EkspanderbartpanelBasePure
} from 'nav-frontend-ekspanderbartpanel';
import { frontendlogger } from '../../../utils/frontend-logger';

function PanelHeader(props: {tekst: string}) {
	return (
		<div className="hjelpetekst-panel__header blokk-xxs">
			<InfoSirkelIkon />
			<h4 className="hjelpetekst-panel__tittel">{props.tekst}</h4>
		</div>
	);
}

interface HjelpetekstPanelProps {
	navn: string;
	headerTekst: string;
	className?: string;
}

const getStorageName = (name: string) => `hjelpetekst_${name}_apen`;

export function HjelpetekstPanel(props: PropsWithChildren<HjelpetekstPanelProps>) {
	const storageName = getStorageName(props.navn);
	const previousOpenState = localStorage.getItem(storageName);
	const [isOpen, setIsOpen] = useState(previousOpenState === 'true');

	function onPanelClicked() {
		setIsOpen(prevState => {
			const open = !prevState;
			frontendlogger.logMetrikk('hjelpetekst_apen', { navn: props.navn, open});
			localStorage.setItem(storageName, open ? 'true' : 'false');
			return open;
		});
	}

	return (
		<EkspanderbartpanelBasePure
			className={cls('hjelpetekst-panel', props.className)}
			apen={isOpen}
			onClick={onPanelClicked}
			heading={<PanelHeader tekst={props.headerTekst}/>}
		>
			{props.children}
		</EkspanderbartpanelBasePure>
	);
}
