import React from 'react';
import { ViewController } from './components/view-controller';
import { DataFetcher } from './components/data-fetcher';
import { PrelanseringSjekk } from './components/sjekk/prelansering-sjekk';
import { NasjonalTilgangSjekk } from './components/sjekk/nasjonal-tilgang-sjekk';
import StoreProvider from './stores/store-provider';
import { ModalController } from './components/modal-controller';
import { TabClickedListener } from './components/tab-clicked-listener';
import './app.less';

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
							<ViewController />
							<ModalController />
							<TabClickedListener />
						</DataFetcher>
					</NasjonalTilgangSjekk>
				</PrelanseringSjekk>
			</StoreProvider>
		</main>
	);
}

export default App;
