import ReactDOM from 'react-dom';
import App from './app';
import env from './util/environment';
import NAVSPA from '@navikt/navspa';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { enhetId, fnr } from './mock/data';

dayjs.locale('nb');

NAVSPA.eksporter('veilarbvedtaksstottefs', App);

if (env.isDevelopment) {
	require('./mock');
	ReactDOM.render(<App fnr={fnr} enhet={enhetId} />, document.getElementById('veilarbvedtaksstottefs-root'));
}
