import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import tipsIkon from './tips/tips.svg';
import dialogIkon from './dialog/dialog.svg';
import { Tips } from './tips/tips';
import { Dialog } from './dialog/dialog';
import './sidebar.less';
import { Vedtak } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import { finnUtkastAlltid } from '../../utils';

enum TabName {
	TIPS = 'TIPS',
	DIALOG = 'DIALOG'
}

interface SidebarTab {
	name: TabName;
	icon: string;
	content: React.ReactChild;
}

const sidebarTabs: SidebarTab[] = [
	{
		name: TabName.TIPS,
		icon: tipsIkon,
		content: <Tips />
	},
	{
		name: TabName.DIALOG,
		icon: dialogIkon,
		content: <Dialog />
	},
];

function finnTab(tabName: string, tabs: SidebarTab[]): SidebarTab {
	return tabs.find(t => t.name === tabName) as SidebarTab;
}

function finnDefaultTab(utkast: Vedtak): TabName {
	return utkast.beslutterProsessStartet
		? TabName.DIALOG
		: TabName.TIPS;
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
	const { vedtak } = useDataStore();
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [selectedTabName, setSelectedTabName] = useState(finnDefaultTab(finnUtkastAlltid(vedtak)));
	const selectedTab = finnTab(selectedTabName, sidebarTabs);

	function handleOnTabClicked(tab: SidebarTab) {
		setSelectedTabName(tab.name);
	}

	// Dette burde egentlig debounces, men det ser grusomt ut selv med lavt delay
	// Det beste hadde vært å bruke kun CSS til å sette høyden på sidebaren
	function setSidebarHeight() {
		const sidebar = sidebarRef.current;
		if (sidebar) {
			const rect = sidebar.getBoundingClientRect();
			sidebar.style.height = window.innerHeight - rect.top + 'px';
		}
	}

	useEffect(() => {
		// Set initial height
		setSidebarHeight();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sidebarRef.current]);

	useEffect(() => {
		// TODO: Kan vurdere å sjekke at det er høyden som endrer seg på resize event
		window.addEventListener('scroll', setSidebarHeight, true);
		window.addEventListener('resize', setSidebarHeight, true);
		return () => {
			window.removeEventListener('scroll', setSidebarHeight);
			window.removeEventListener('resize', setSidebarHeight);
		};
	}, []);

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
