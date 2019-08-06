import React, { PropsWithChildren } from 'react';
import { ReactComponent as InfoSirkelIkon } from './info-sirkel.svg';
import './hjelpetekster.less';

export function Hjelpetekster(props: PropsWithChildren<{}>) {
	return (
		<section className="hjelpetekster">
			<div className="hjelpetekster__header blokk-xxs">
				<InfoSirkelIkon />
				<h4 className="hjelpetekster__tittel">Tips</h4>
			</div>
			{props.children}
		</section>
	);
}
