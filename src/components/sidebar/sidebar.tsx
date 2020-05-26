import React, { useEffect, useRef } from 'react';
import cls from 'classnames';
import tipsIkon from './dialog/dialog.svg';
import dialogIkon from './dialog/dialog.svg';
import { OpplysningerTips } from '../utkast-skjema/opplysninger/opplysninger-tips';
import { Dialog } from './dialog/dialog';
import { Vedtak } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import { finnUtkastAlltid } from '../../utils';
import Show from '../show';
import './sidebar.less';

enum SidebarTabType {
	TIPS,
	DIALOG
}

interface SidebarTab {
	type: SidebarTabType;
	icon: string;
	content: React.ReactChild;
}

const sidebarTabs: SidebarTab[] = [
	{
		type: SidebarTabType.TIPS,
		icon: tipsIkon,
		content: <OpplysningerTips />
	},
	{
		type: SidebarTabType.DIALOG,
		icon: dialogIkon,
		content: <Dialog />
	},
];

function finnTab(viewType: SidebarTabType, tabs: SidebarTab[]): SidebarTab | undefined {
	return tabs.find(t => t.type === viewType);
}

function finnDefaultTab(utkast: Vedtak): SidebarTabType {
	return utkast.beslutterProsessStatus != null
		? SidebarTabType.DIALOG
		: SidebarTabType.TIPS;
}

function mapTabTilView(tab: SidebarTab, isSelected: boolean, onTabClicked: (tab: SidebarTab) => void) {
	const classes = cls('sidebar__tab', { 'sidebar__tab--selected': isSelected});
	return (
		<button className={classes} onClick={() => onTabClicked(tab)} key={tab.type}>
			<img className="sidebar__tab-ikon" src={tab.icon} alt={tab.type as unknown as string} />
		</button>
	);
}

export const Sidebar = () => {
	const { vedtak } = useDataStore();
	const { selectedTab, setSelectedTab, isSidebarHidden, setIsSidebarHidden } = {} as any;
	const sidebarRef = useRef<HTMLDivElement>(null);

	const selectedTabData = finnTab(selectedTab, sidebarTabs);

	function handleOnTabClicked(tab: SidebarTab) {
		if (isSidebarHidden) {
			setIsSidebarHidden(false);
		} else if (tab.type === selectedTab) {
			setIsSidebarHidden(true);
		}

		setSelectedTab(tab.type);
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
		setSelectedTab(finnDefaultTab(finnUtkastAlltid(vedtak)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		    <Show if={selectedTabData}>
			    <div className="sidebar__tabs">
				    {sidebarTabs.map(tab => mapTabTilView(tab, tab.type === (selectedTabData as SidebarTab).type, handleOnTabClicked))}
			    </div>
			    <div className="sidebar__content">
				    {(selectedTabData as SidebarTab).content}
			    </div>
		    </Show>
	    </div>
	    </div>
    );
};
