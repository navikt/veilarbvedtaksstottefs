import React, { useState } from 'react';
import cls from 'classnames';
import './sidebar.less';
import tipsIkon from '../utkast-skjema/tips.svg';
import dialogIkon from '../utkast-skjema/dialog.svg';
import { Tips } from './tips/tips';

interface SidebarTab {
	name: string;
	icon: string;
	content: React.ReactChild;
}

const sidebarTabs: SidebarTab[] = [
	{
		name: 'tips',
		icon: tipsIkon,
		content: <Tips />
	},
	{
		name: 'dialog',
		icon: dialogIkon,
		content: (<div>Dette er dialog innhold</div>)
	},
];

const defaultSelectedTabName = 'tips';

function finnTab(tabName: string, tabs: SidebarTab[]): SidebarTab {
	return tabs.find(t => t.name === tabName) as SidebarTab;
}

function mapTabTilView(tab: SidebarTab, isSelected: boolean, onTabClicked: (tab: SidebarTab) => void) {
	const classes = cls('sidebar__tab', { 'sidebar__tab--selected': isSelected});
	return (
		<button className={classes} onClick={() => onTabClicked(tab)} key={tab.name}>
			<img className="sidebar__tab-ikon" src={tab.icon} alt={tab.name} />
		</button>
	);
}

export const Sidebar = () => {
	const [selectedTabName, setSelectedTabName] = useState(defaultSelectedTabName);
	const selectedTab = finnTab(selectedTabName, sidebarTabs);

	function handleOnTabClicked(tab: SidebarTab) {
		setSelectedTabName(tab.name);
	}

    return (
    	<section className="sidebar">
		    <div className="sidebar__tabs">
			    {sidebarTabs.map(tab => mapTabTilView(tab, tab.name === selectedTab.name, handleOnTabClicked))}
		    </div>
		    <div className="sidebar__content">
		        {selectedTab.content}
		    </div>
	    </section>
    );
};
