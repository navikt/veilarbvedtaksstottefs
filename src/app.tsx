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
import { BrowserRouter } from 'react-router-dom';
import { Theme } from '@navikt/ds-react';
import { useState } from 'react';
import './app.css';

export type AppTheme = 'light' | 'dark';

interface AppProps {
	fnr: string;
	enhet: string;
	theme: AppTheme;
}

function App({ fnr, enhet, theme }: AppProps) {
	const [temaOverride, setTemaOverride] = useState<AppTheme | null>(null);
	const valgtTema = temaOverride ?? theme;

	return (
		<Theme theme={valgtTema} asChild>
			<main className="app veilarbvedtaksstottefs">
				<BrowserRouter basename={env.isRunningOnGhPages ? '/veilarbvedtaksstottefs' : '/vedtaksstotte'}>
					<StoreProvider fnr={fnr} enhetId={enhet}>
						<FeatureFetcher>
							<NasjonalTilgangSjekk fnr={fnr}>
								<DataFetcher fnr={fnr}>
									<VarselController />
									<ViewController />
									<ModalController />
									<TabClickedListener />
									{env.isDemo && <MockPanel tema={valgtTema} setTema={setTemaOverride} />}
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
