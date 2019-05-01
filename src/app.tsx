import React from 'react';
import { AppProvider } from './components/app-provider/app-provider';
import { ViewController } from './components/viewcontroller/view-controller';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App (props: AppProps) {
    return (
        <div className="veilarbvedtaksstottefs">
            <AppProvider fnr={props.fnr}>
               <ViewController fnr={props.fnr}/>
            </AppProvider>
        </div>
    );
}

export default App;
