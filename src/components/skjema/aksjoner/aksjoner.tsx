import * as React from 'react';
import './aksjoner.less';
import { Flatknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { ReactComponent as SlettIkon } from './slett.svg';

interface AksjonerProps {
    handleSubmit: (e: any) => void;
    handleLagreOgTilbake: (e: any) => void;
    handleSlett: (e: any) => void;
}

function Aksjoner (props: AksjonerProps) {
    return (
        <div className="aksjoner">
            <div className="aksjoner__lagre">
                <Hovedknapp htmlType="submit" onClick={props.handleSubmit}>
                    Til innsending
                </Hovedknapp>
                <Knapp htmlType="submit" onClick={props.handleLagreOgTilbake}>
                    Lagre og gå tilbake
                </Knapp>
            </div>
            <div className="aksjoner__slett">
            <Flatknapp htmlType="button" onClick={props.handleSlett}>
                <SlettIkon/>
                <span>Slett</span>
            </Flatknapp>
            </div>
        </div>
    );

}

export default Aksjoner;
