import React from 'react';
import Opplysninger from './/opplysninger/opplysninger';
import Hovedmal from './/hovedmal/hovedmal';
import Innsatsgruppe from './/innsatsgruppe/innsatsgruppe';
import Begrunnelse from './/begrunnelse/begrunnelse';
import { Malform } from './malform/malform';
import { Sidebar, SidebarTab } from '../sidebar/sidebar';
import tipsIkon from './tips.svg';
import dialogIkon from './dialog.svg';
import './utkast-skjema.less';

const sidebarTabs: SidebarTab[] = [
	{
		name: 'tips',
		icon: tipsIkon,
		content: (<div>Dette er tips innhold</div>)
	},
	{
		name: 'dialog',
		icon: dialogIkon,
		content: (<div>Dette er dialog innhold</div>)
	},
];

function UtkastSkjema() {
	return (
		<div className="utkast-skjema">
			<form className="utkast-skjema__form">
				<Malform />
				<Opplysninger />
				<Begrunnelse />
				<Innsatsgruppe />
				<Hovedmal />
			</form>
			<Sidebar tabs={sidebarTabs} />
		</div>
	);
}

export default UtkastSkjema;
