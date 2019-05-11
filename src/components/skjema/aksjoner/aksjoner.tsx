import * as React from 'react';
import './aksjoner.less';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';

interface AksjonerProps {
    handleSubmit: (e: any) => void;
    handleLagreOgTilbake: (e: any) => void;
}

function Aksjoner (props: AksjonerProps) {
    return (
        <div className="aksjoner">
            <Hovedknapp htmlType="submit" onClick={props.handleSubmit}>
                Til innsending
            </Hovedknapp>
            <Knapp htmlType="submit" onClick={props.handleLagreOgTilbake}>
                Lagre og gå tilbake
            </Knapp>
            <Flatknapp>
                Slett
            </Flatknapp>
        </div>
    );

}

export default Aksjoner;
