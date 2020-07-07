import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import Lukknapp from 'nav-frontend-lukknapp';
import './mock-panel.less';
import { useDataStore } from '../../stores/data-store';
import { veiledere } from '../veiledere-mock';
import { Veileder } from '../../rest/data/veiledere';
import { updateInnloggetVeilederMock } from '../api-data/innlogget-veileder';

export function MockPanel() {

    const [skalVise, setSkalVise] = useState(false);
    const visSkjul = skalVise ? 'vis' : 'skjul';
    const toggle = () => setSkalVise(!skalVise);

    return (
        <div className={`mock-panel mock-panel--${visSkjul}`}>
            <button className="apne-lukk-knapp" onClick={toggle}>
                <Normaltekst>Vis valg</Normaltekst>
            </button>
            <Lukknapp onClick={toggle}/>
            <InnloggetSom/>
        </div>
    );
}

function InnloggetSom() {
    const {innloggetVeileder, setInnloggetVeileder} = useDataStore();

    function change(veileder: Veileder) {
        updateInnloggetVeilederMock(veileder);
        setInnloggetVeileder(veileder);
    }

    return (<fieldset>
        <legend>
            <Normaltekst>
                Innlogget som
            </Normaltekst>
        </legend>
        {veiledere.map((veileder, idx) =>
            <RadioPanel
                onChange={() => {
                    change(veileder);
                }}
                key={idx}
                name={veileder.navn}
                label={veileder.navn}
                value={veileder.navn}
                checked={veileder.ident === innloggetVeileder.ident}
            />
        )}
    </fieldset>);
}
