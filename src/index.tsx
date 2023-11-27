import ReactDOM from 'react-dom';
import App from './app';
import env from './util/environment';
import ModalWrapper from 'nav-frontend-modal';
import NAVSPA from '@navikt/navspa';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { enhetId, fnr } from './mock/data';

dayjs.locale('nb');

ModalWrapper.setAppElement(document.getElementById('modal-a11y-wrapper'));

NAVSPA.eksporter('veilarbvedtaksstottefs', App);

if (env.isDevelopment) {
	const { worker } = require('./mock');
	worker
		.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
		.then(() => {
			ReactDOM.render(<App fnr={fnr} enhet={enhetId} />, document.getElementById('veilarbvedtaksstottefs-root'));
		})
		.catch((e: Error) => {
			// eslint-disable-next-line no-console
			console.error('Unable to setup mocked API endpoints', e);
		});
}
