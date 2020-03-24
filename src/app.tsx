import React from 'react';
import { ViewController } from './components/view-controller';
import { DataFetcher } from './components/datafetcher';
import { PrelanseringSjekk } from './components/sjekk/prelansering-sjekk';
import { NasjonalTilgangSjekk } from './components/sjekk/nasjonal-tilgang-sjekk';
import StoreProvider from './stores/store-provider';
import { ModalController } from './components/modal-controller';
import { UtkastSkjemaSync } from './components/utkast-skjema-sync';
import './app.less';
import { DialogMeldingerSync } from './components/dialog-meldinger-sync';
import { BeslutterSync } from './components/beslutter-sync';
import { InnloggetVeilederSync } from './components/innlogget-veileder-sync';

interface AppProps {
	fnr: string;
	enhet: string;
}

function App(props: AppProps) {
	return (
		<main className="veilarbvedtaksstottefs">
			<StoreProvider fnr={props.fnr} enhetId={props.enhet}>
				<PrelanseringSjekk>
					<NasjonalTilgangSjekk fnr={props.fnr}>
						<DataFetcher fnr={props.fnr}>
							<UtkastSkjemaSync />
							<DialogMeldingerSync />
							<BeslutterSync />
							<ViewController />
							<ModalController />
							<InnloggetVeilederSync />
						</DataFetcher>
					</NasjonalTilgangSjekk>
				</PrelanseringSjekk>
			</StoreProvider>
		</main>
	);
}

export default App;
