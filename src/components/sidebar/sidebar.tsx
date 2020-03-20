import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import tipsIkon from './tips.svg';
import dialogIkon from './dialog.svg';
import { Tips } from './tips/tips';
import { Dialog } from './dialog/dialog';
import './sidebar.less';
import { func } from 'prop-types';

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
		content: <Dialog />
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
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [selectedTabName, setSelectedTabName] = useState(defaultSelectedTabName);
	const selectedTab = finnTab(selectedTabName, sidebarTabs);

	function handleOnTabClicked(tab: SidebarTab) {
		setSelectedTabName(tab.name);
	}

	function setSidebarHeight() {
		const sidebar = sidebarRef.current;
		if (sidebar) {
			const rect = sidebar.getBoundingClientRect();
			sidebar.style.height = window.innerHeight - rect.top + 'px';
		}
	}

	useEffect(() => {
		setSidebarHeight();
	}, [sidebarRef.current]);

	useEffect(() => {
		window.addEventListener('scroll', setSidebarHeight, true);
		return () => {
			window.removeEventListener('scroll', setSidebarHeight);
		};
	}, []);

	// Element Height = Viewport height - element.offset.top - desired bottom margin

    return (
    	<div className="sidebar__wrapper">
    	<div ref={sidebarRef} className="sidebar">
		    <div className="sidebar__tabs">
			    {sidebarTabs.map(tab => mapTabTilView(tab, tab.name === selectedTab.name, handleOnTabClicked))}
		    </div>
		    <div className="sidebar__content">
		        {selectedTab.content}
		    </div>
	    </div>
	    </div>
    );
};
