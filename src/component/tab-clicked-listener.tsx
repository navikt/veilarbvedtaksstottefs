import { useEventListener } from '../util/hooks';
import { useNavigate } from 'react-router-dom';
import { routes } from '../routes.ts';

export const TabClickedListener = () => {
	const navigate = useNavigate();

	useEventListener('veilarbpersonflatefs.tab-clicked', event => {
		if (event instanceof CustomEvent && event.detail.tabId === 'VEDTAKSSTOTTE') {
			navigate(routes.hovedside);
		}
	});

	return null;
};
