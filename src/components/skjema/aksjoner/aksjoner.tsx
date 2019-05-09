import * as React from 'react';
import './aksjoner.less';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

function Aksjoner (props: {handleSubmit: (e: any) => void} ) {
    return (
        <div className="aksjoner">
            <Hovedknapp htmlType="submit" onClick={props.handleSubmit}>
                Forhåndsvis vedtaksbrev
            </Hovedknapp>
            <Knapp>
                Forhåndsvis og send
            </Knapp>
        </div>
    );

}

export default Aksjoner;
