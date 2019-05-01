import React from 'react';
import { AppProvider } from './components/app-provider/app-provider';
import { ViewController } from './components/viewcontroller/view-controller';
import './app.less';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App (props: AppProps) {
    return (
        <div className="veilarbvedtaksstottefs">
            <div className="veilarbvedtaksstottefs__content">
                <AppProvider fnr={props.fnr}>
                    <ViewController fnr={props.fnr}/>
                </AppProvider>
            </div>
        </div>
    );
}

export default App;
