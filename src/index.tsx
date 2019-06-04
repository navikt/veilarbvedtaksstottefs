import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import NAVSPA from './NAVSPA';
import env from './utils/environment';
import { enhet, fnr } from './mock/kontekst';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import ModalWrapper from 'nav-frontend-modal';

dayjs.locale('nb');

ModalWrapper.setAppElement(document.getElementById('modal-a11y-wrapper'));

if (env.isDevelopment || env.isRunningOnHeroku) {
    ReactDOM.render(<App fnr={fnr} enhet={enhet} />, document.getElementById('veilarbvedtaksstottefs'));
    require('./mock/index');
} else {
    NAVSPA.eksporter('veilarbvedtaksstottefs', App);
}
