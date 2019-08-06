import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import env from './utils/environment';
import { enhet, fnr } from './mock/kontekst';
import ModalWrapper from 'nav-frontend-modal';
import NAVSPA from '@navikt/navspa';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';

dayjs.locale('nb');

ModalWrapper.setAppElement(document.getElementById('modal-a11y-wrapper'));

if (env.isDevelopment || env.isRunningOnHeroku) {
	require('./mock');
	ReactDOM.render(<App fnr={fnr} enhet={enhet} />, document.getElementById('veilarbvedtaksstottefs'));
} else {
	NAVSPA.eksporter('veilarbvedtaksstottefs', App);
}
