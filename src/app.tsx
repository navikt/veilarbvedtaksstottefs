import React from 'react';
import { ViewController } from './components/view-controller';
import { DataFetcher } from './components/data-fetcher';
import { PrelanseringSjekk } from './components/sjekk/prelansering-sjekk';
import { NasjonalTilgangSjekk } from './components/sjekk/nasjonal-tilgang-sjekk';
import StoreProvider from './stores/store-provider';
import { ModalController } from './components/modal-controller';
import { TabClickedListener } from './components/tab-clicked-listener';
import './app.less';
import { MockPanel } from './mock/panel/mock-panel';
import Show from './components/show';
import env from './utils/environment';
import { VarselController } from './components/varsel/varsel-controller';

interface AppProps {
	fnr: string;
	enhet: string;
}

function App(props: AppProps) {
	return (
		<main className="app veilarbvedtaksstottefs">
			<StoreProvider fnr={props.fnr} enhetId={props.enhet}>
				<PrelanseringSjekk>
					<NasjonalTilgangSjekk fnr={props.fnr}>
						<DataFetcher fnr={props.fnr}>
							<VarselController />
							<ViewController />
							<ModalController />
							<TabClickedListener />
							<Show if={!env.isProduction}>
								<MockPanel />
							</Show>
						</DataFetcher>
					</NasjonalTilgangSjekk>
				</PrelanseringSjekk>
			</StoreProvider>
		</main>
	);
}

export default App;
