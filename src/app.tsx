import React from 'react';
import { ViewProvider } from './components/providers/view-provider';
import { ViewController } from './components/viewcontroller/view-controller';
import { DataFetcher } from './components/datafetcher';
import { PrelanseringSjekk } from './components/sjekk/prelansering-sjekk';
import { SkjemaProvider } from './components/providers/skjema-provider';
import { NasjonalTilgangSjekk } from './components/sjekk/nasjonal-tilgang-sjekk';
import { ModalViewProvider } from './components/providers/modal-provider';
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
                <ViewProvider>
                    <ModalViewProvider>
                        <FeilModal>
                            <NasjonalTilgangSjekk fnr={props.fnr}>
                                <DataFetcher fnr={props.fnr}>
                                    <PrelanseringSjekk>
                                        <SkjemaProvider>
                                            <ViewController fnr={props.fnr}/>
                                        </SkjemaProvider>
                                    </PrelanseringSjekk>
                                </DataFetcher>
                            </NasjonalTilgangSjekk>
                        </FeilModal>
                    </ModalViewProvider>
                </ViewProvider>
            </StoreProvider>
        </main>
    );
}

export default App;
