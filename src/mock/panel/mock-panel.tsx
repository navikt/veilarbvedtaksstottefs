import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import Lukknapp from 'nav-frontend-lukknapp';
import './mock-panel.less';
import { VeilederTilgang } from '../../utils/tilgang';
import { useTilgangStore } from '../../stores/tilgang-store';
import { useDataStore } from '../../stores/data-store';
import { ansvarligVeileder, beslutter, ikkeAnsvarligVeileder } from '../personer';

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
    const {setInnloggetVeileder} = useDataStore();
    const {veilederTilgang, setVeilederTilgang} = useTilgangStore();

    function change(tilgang: VeilederTilgang) {
        setVeilederTilgang(tilgang);
        switch (tilgang) {
            case VeilederTilgang.BESLUTTER:
                setInnloggetVeileder(beslutter);
                break;
            case VeilederTilgang.ANSVARLIG_VEILEDER:
                setInnloggetVeileder(ansvarligVeileder);
                break;
            case VeilederTilgang.IKKE_ANSVARLIG_VEILEDER:
                setInnloggetVeileder(ikkeAnsvarligVeileder);
                break;

        }

    }

    return (<fieldset>
        <legend>
            <Normaltekst>
                Innlogget som
            </Normaltekst>
        </legend>
        {Object.keys(VeilederTilgang).map((tilgang, idx) =>
            <RadioPanel
                onChange={() => {
                    change(tilgang as VeilederTilgang);
                }}
                key={idx}
                name={tilgang}
                label={tilgang}
                value={tilgang}
                checked={tilgang === veilederTilgang}
            />
        )}
    </fieldset>);
}
