import { useState } from 'react';
import createUseContext from 'constate';

export enum SidebarTab {
	TIPS = 'TIPS',
	DIALOG = 'DIALOG'
}

export const useSidebarViewStore = createUseContext(() => {
	const [selectedTab, setSelectedTab] = useState<SidebarTab>(SidebarTab.TIPS);
	const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

	return { selectedTab, setSelectedTab, isSidebarHidden, setIsSidebarHidden };
});
