import React from 'react';
import { ViewProvider } from './components/providers/view-provider';
import { ViewController } from './components/viewcontroller/view-controller';
import { DataFetcher } from './components/datafetcher';
import { PrelanseringSjekk } from './components/prelansering-sjekk';
import { FetchProvider } from './components/providers/fetch-provider';
import './app.less';
import { SkjemaProvider } from './components/providers/skjema-provider';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App(props: AppProps) {
    return (
        <main className="veilarbvedtaksstottefs">
            <FetchProvider>
                <ViewProvider>
                    <PrelanseringSjekk>
                        <DataFetcher fnr={props.fnr}>
                            <SkjemaProvider>
                                <ViewController fnr={props.fnr}/>
                            </SkjemaProvider>
                        </DataFetcher>
                    </PrelanseringSjekk>
                </ViewProvider>
            </FetchProvider>
        </main>
    );
}

export default App;
