import React from 'react';
import Skjema from './components/skjema/skjema';

interface AppProps {
    fnr: string;
    enhet: string;
}

function App (props: AppProps) {
    return (
        <div className="veilarbvedtaksstottefs">
            <Skjema fnr={props.fnr}/>
        </div>
    );
}

export default App;
