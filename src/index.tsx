import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import NAVSPA from './NAVSPA';
import env from './utils/environment';
import { enhet, fnr } from './mock/kontekst';

if (env.isDevelopment) {
    ReactDOM.render(<App fnr={fnr} enhet={enhet} />, document.getElementById('veilarbvedtaksstottefs'));
    require('./mock/index');
} else {
    NAVSPA.eksporter('veilarbvedtaksstottefs', App);
}
