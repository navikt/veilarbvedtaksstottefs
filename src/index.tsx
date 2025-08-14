import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import env from './util/environment';
import NAVSPA from '@navikt/navspa';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { enhetId, fnr } from './mock/data';

dayjs.locale('nb');

if (env.isDemo) {
	import('./mock/index')
		.then(({ worker }) => {
			worker
				.start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } })
				.then(() => {
					createRoot(document.getElementById('veilarbvedtaksstottefs-root') as HTMLElement).render(
						<App fnr={fnr} enhet={enhetId} />
					);
				})
				.catch((e: Error) => {
					// eslint-disable-next-line no-console
					console.error('Unable to setup mocked API endpoints', e);
				});
		}) // eslint-disable-next-line no-console
		.catch(e => console.log('MSW - failed to import', e));
} else {
	NAVSPA.eksporter('veilarbvedtaksstottefs', App);
}
