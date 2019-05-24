import React from 'react';
import { ViewProvider } from './components/providers/view-provider';
import { ViewController } from './components/viewcontroller/view-controller';
import { DataFetcher } from './components/datafetcher';
import { PrelanseringSjekk } from './components/prelansering-sjekk';
import { FetchProvider } from './components/providers/fetch-provider';
import './app.less';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App(props: AppProps) {
    return (
        <div className="veilarbvedtaksstottefs">
            <div className="veilarbvedtaksstottefs__content">
                <FetchProvider>
                    <ViewProvider>
                        <PrelanseringSjekk>
                            <DataFetcher fnr={props.fnr}>
                                <ViewController fnr={props.fnr}/>
                            </DataFetcher>
                        </PrelanseringSjekk>
                    </ViewProvider>
                </FetchProvider>
            </div>
        </div>
    );
}

export default App;
