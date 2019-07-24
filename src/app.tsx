import React from 'react';
import { ViewController } from './components/view-controller';
import { DataFetcher } from './components/datafetcher';
import { PrelanseringSjekk } from './components/sjekk/prelansering-sjekk';
import { SkjemaProvider } from './stores/skjema-provider';
import { NasjonalTilgangSjekk } from './components/sjekk/nasjonal-tilgang-sjekk';
import { ModalViewProvider } from './stores/modal-provider';
import { FeilModal } from './components/modal/feilmodal';
import StoreProvider from './stores/store-provider';
import './app.less';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App(props: AppProps) {
    return (
        <main className="veilarbvedtaksstottefs">
            <StoreProvider fnr={props.fnr} enhetId={props.enhet}>
                <ModalViewProvider>
                    <NasjonalTilgangSjekk fnr={props.fnr}>
                        <DataFetcher fnr={props.fnr}>
                            <PrelanseringSjekk>
                                <SkjemaProvider>
                                    <ViewController/>
                                </SkjemaProvider>
                            </PrelanseringSjekk>
                        </DataFetcher>
                    </NasjonalTilgangSjekk>
                    <FeilModal/>
                </ModalViewProvider>
            </StoreProvider>
        </main>
    );
}

export default App;
