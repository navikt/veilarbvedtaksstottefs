import React from 'react';
import { ViewProvider } from './components/providers/view-provider';
import { ViewController } from './components/viewcontroller/view-controller';
import { DataFetcher } from './components/datafetcher';
import { PrelanseringSjekk } from './components/sjekk/prelansering-sjekk';
import { FetchProvider } from './components/providers/fetch-provider';
import { SkjemaProvider } from './components/providers/skjema-provider';
import { NasjonalTilgangSjekk } from './components/sjekk/nasjonal-tilgang-sjekk';
import './app.less';
import { ModalViewProvider } from './components/providers/modal-provider';
import { FeilModal } from './components/modal/feilmodal';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App(props: AppProps) {
    return (
        <main className="veilarbvedtaksstottefs">
            <FetchProvider>
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
            </FetchProvider>
        </main>
    );
}

export default App;
