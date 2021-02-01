import { useEventListener } from '../util/hooks';
import { useViewStore, ViewType } from '../store/view-store';

export const TabClickedListener = () => {
	const { changeView } = useViewStore();

	useEventListener('veilarbpersonflatefs.tab-clicked', event => {
		if (event instanceof CustomEvent && event.detail.tabId === 'VEDTAKSSTOTTE') {
			changeView(ViewType.HOVEDSIDE);
		}
	});

	return null;
};
