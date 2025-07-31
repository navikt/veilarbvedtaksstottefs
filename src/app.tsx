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

interface AppProps {
	fnr: string;
	enhet: string;
}

function App(props: AppProps) {
	return (
		<main className="app veilarbvedtaksstottefs">
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
		</main>
	);
}

export default App;
