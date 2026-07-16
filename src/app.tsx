import { ViewController } from './component/view-controller';
import { DataFetcher } from './component/data-fetcher';
import { NasjonalTilgangSjekk } from './component/sjekk/nasjonal-tilgang-sjekk';
import StoreProvider from './store/store-provider';
import { ModalController } from './component/modal-controller';
import { TabClickedListener } from './component/tab-clicked-listener';
import { VarselController } from './component/varsel/varsel-controller';
import { MockPanel } from './mock/component/mock-panel';
import FeatureFetcher from './component/feature-fetcher';
import env from './util/environment';
import './app.css';
import { Theme } from '@navikt/ds-react';
import { BrowserRouter } from 'react-router-dom';

interface AppProps {
	fnr: string;
	enhet: string;
	theme?: 'light' | 'dark';
}

function App(props: AppProps) {
	return (
		<Theme theme={props.theme ?? 'light'} asChild>
			<main className="app veilarbvedtaksstottefs">
				<BrowserRouter basename={env.isRunningOnGhPages ? '/veilarbvedtaksstottefs' : '/vedtaksstotte'}>
					<StoreProvider fnr={props.fnr} enhetId={props.enhet}>
						<FeatureFetcher>
							<NasjonalTilgangSjekk fnr={props.fnr}>
								<DataFetcher fnr={props.fnr}>
									<VarselController />
									<ViewController />
									<ModalController />
									<TabClickedListener />
									{env.isDemo && <MockPanel />}
								</DataFetcher>
							</NasjonalTilgangSjekk>
						</FeatureFetcher>
					</StoreProvider>
				</BrowserRouter>
			</main>
		</Theme>
	);
}

export default App;
