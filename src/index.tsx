import React from 'react';
import App from './App';
import env from './app/utils/environment';
import NAVSPA from "./NAVSPA";

// if (env.isDevelopment) {
//     require('./mock');
// }

NAVSPA.eksporter('veilarbvedtaksstottefs', App);


