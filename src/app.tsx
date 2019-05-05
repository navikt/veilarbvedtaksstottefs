import React from 'react';
import { AppProvider } from './components/app-provider/app-provider';
import { ViewController } from './components/viewcontroller/view-controller';
import './app.less';
import { DataFetcher } from './components/datafetcher';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App (props: AppProps) {
    return (
        <div className="veilarbvedtaksstottefs">
            <div className="veilarbvedtaksstottefs__content">
                <AppProvider>
                    <DataFetcher fnr={props.fnr}>
                        <ViewController fnr={props.fnr}/>
                    </DataFetcher>
                </AppProvider>
            </div>
        </div>
    );
}

export default App;
