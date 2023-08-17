import ReactDOM from 'react-dom';
import App from './app';
import env from './util/environment';
import NAVSPA from '@navikt/navspa';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { enhetId, fnr } from './mock/data';
import { Modal } from '@navikt/ds-react';

dayjs.locale('nb');

Modal.setAppElement(document.getElementById('modal-a11y-wrapper'));

NAVSPA.eksporter('veilarbvedtaksstottefs', App);

if (env.isDevelopment) {
	require('./mock');
	ReactDOM.render(<App fnr={fnr} enhet={enhetId} />, document.getElementById('veilarbvedtaksstottefs-root'));
}
