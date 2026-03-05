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
import { useState } from 'react';

interface AppProps {
	fnr: string;
	enhet: string;
}

function App(props: AppProps) {
	// Settes enkelt her mens vi gradvis skriver oss over til å støtte darkmode.
	// Visning av toggelen styres av en feature-toggle. Toggelen bør flyttes til en mer fornuftig plass når vi er klare til å lansere.
	const [darkmode, setDarkmode] = useState(false);

	return (
		<Theme theme={darkmode ? 'dark' : 'light'} asChild>
			<main className="app veilarbvedtaksstottefs">
				<StoreProvider fnr={props.fnr} enhetId={props.enhet}>
					<FeatureFetcher>
						<NasjonalTilgangSjekk fnr={props.fnr}>
							<DataFetcher
								fnr={props.fnr}
								darkmode={darkmode}
								setDarkmode={darkmode => setDarkmode(darkmode)}
							>
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
		</Theme>
	);
}

export default App;
