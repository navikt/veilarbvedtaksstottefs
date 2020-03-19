import React, { useState } from 'react';
import cls from 'classnames';
import './sidebar.less';

interface SidebarProps {
	tabs: SidebarTab[];
	defaultSelectedTabName?: string;
}

export interface SidebarTab {
	name: string;
	icon: string;
	content: React.ReactChild;
}

function finnTab(tabName: string, tabs: SidebarTab[]): SidebarTab {
	return tabs.find(t => t.name === tabName) as SidebarTab;
}

function mapTabTilView(tab: SidebarTab, isSelected: boolean, onTabClicked: (tab: SidebarTab) => void) {
	const classes = cls('sidebar__tab', { 'sidebar__tab--selected': isSelected});
	return (
		<div className={classes} onClick={() => onTabClicked(tab)} key={tab.name}>
			<img className="sidebar__tab-ikon" src={tab.icon} alt={tab.name} />
		</div>
	);
}

export const Sidebar = (props: SidebarProps) => {
	const [selectedTabName, setSelectedTabName] = useState(props.defaultSelectedTabName ? props.defaultSelectedTabName : props.tabs[0].name);

	const selectedTab = finnTab(selectedTabName, props.tabs);

	function handleOnTabClicked(tab: SidebarTab) {
		console.log('tab', tab); // tslint:disable-line
		setSelectedTabName(tab.name);
	}

    return (
    	<section className="sidebar">
		    <div className="sidebar__tabs">
			    {props.tabs.map(tab => mapTabTilView(tab, tab.name === selectedTab.name, handleOnTabClicked))}
		    </div>
		    <div className="sidebar__content">
		        {selectedTab.content}
		    </div>
	    </section>
    );
};
