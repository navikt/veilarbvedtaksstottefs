import React from 'react';
import { ViewController } from './component/view-controller';
import { DataFetcher } from './component/data-fetcher';
import { PrelanseringSjekk } from './component/sjekk/prelansering-sjekk';
import { NasjonalTilgangSjekk } from './component/sjekk/nasjonal-tilgang-sjekk';
import StoreProvider from './store/store-provider';
import { ModalController } from './component/modal-controller';
import { TabClickedListener } from './component/tab-clicked-listener';
import './app.less';
import Show from './component/show';
import env from './util/environment';
import { VarselController } from './component/varsel/varsel-controller';
import { MockPanel } from './mock/component/mock-panel';

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
