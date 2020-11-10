import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import env from './utils/environment';
import ModalWrapper from 'nav-frontend-modal';
import NAVSPA from '@navikt/navspa';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { enhetId, fnr } from './mock/konstanter';

dayjs.locale('nb');

ModalWrapper.setAppElement(document.getElementById('modal-a11y-wrapper'));

NAVSPA.eksporter('veilarbvedtaksstottefs', App);

if (env.isDevelopment) {
	require('./mock');
	ReactDOM.render(<App fnr={fnr} enhet={enhetId} />, document.getElementById('veilarbvedtaksstottefs-root'));
}
