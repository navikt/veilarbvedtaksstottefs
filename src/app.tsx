import React from 'react';
import { AppProvider } from './components/providers/app-provider';
import { ViewController } from './components/viewcontroller/view-controller';
import { DataFetcher } from './components/datafetcher';
import { PrelanseringSjekk } from './components/prelansering-sjekk';
import './app.less';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App(props: AppProps) {
    return (
        <div className="veilarbvedtaksstottefs">
            <div className="veilarbvedtaksstottefs__content">
                <AppProvider>
                    <PrelanseringSjekk>
                        <DataFetcher fnr={props.fnr}>
                            <ViewController fnr={props.fnr}/>
                        </DataFetcher>
                    </PrelanseringSjekk>
                </AppProvider>
            </div>
        </div>
    );
}

export default App;
