import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import Lukknapp from 'nav-frontend-lukknapp';
import './mock-panel.less';
import { VeilederTilgang } from '../../utils/tilgang';
import { useTilgangStore } from '../../stores/tilgang-store';
import { useDataStore } from '../../stores/data-store';
import { ansvarligVeileder, beslutter, ikkeAnsvarligVeileder } from '../personer';
import { MalformType } from '../../rest/data/malform';

export function MockPanel() {

    const [skalVise, setSkalVise] = useState(false);
    const visSkjul = skalVise ? 'vis' : 'skjul';
    const toggle = () => setSkalVise(!skalVise);

    return (
        <div className={`mock-panel ${visSkjul}`}>
            <button className="apne-lukk-knapp" onClick={toggle}>
                <Normaltekst className="apne">Vis valg</Normaltekst>
            </button>
            <Lukknapp onClick={toggle}/>
            <InnloggetSom/>
            <Malform/>
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
        {Object.keys(VeilederTilgang).map((x, idx) =>
            <RadioPanel
                onChange={() => {
                    change(VeilederTilgang[x as keyof typeof VeilederTilgang]);
                }}
                key={idx}
                name={x}
                label={x}
                value={x}
                checked={x === veilederTilgang}
            />
        )}
    </fieldset>);
}

function Malform() {
    const {malform, setMalform} = useDataStore();

    return (
        <fieldset>
            <legend>
                <Normaltekst>
                    Målform
                </Normaltekst>
            </legend>
            {Object.keys(MalformType).map((x, idx) =>
                <RadioPanel
                    onChange={() => {
                        setMalform({malform: MalformType[x as keyof typeof MalformType]});
                    }}
                    key={idx}
                    name={x}
                    label={x}
                    value={x}
                    checked={x === malform.malform}
                />
            )}
        </fieldset>);
}
