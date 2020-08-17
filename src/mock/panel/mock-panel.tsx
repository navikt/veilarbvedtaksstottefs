import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import Lukknapp from 'nav-frontend-lukknapp';
import './mock-panel.less';
import { useDataStore } from '../../stores/data-store';
import { veiledere } from '../veiledere-mock';
import { Veileder } from '../../rest/data/veiledere';
import { updateInnloggetVeilederMock } from '../api-data/innlogget-veileder';
import { useTilgangStore } from '../../stores/tilgang-store';
import { finnVeilederTilgang } from '../../utils/tilgang';
import Lenke from 'nav-frontend-lenker';

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
            <BeslutteroversiktLenke/>
        </div>
    );
}

function InnloggetSom() {
    const {innloggetVeileder, setInnloggetVeileder, utkast} = useDataStore();
    const { setVeilederTilgang } = useTilgangStore();

    function change(veileder: Veileder) {
        updateInnloggetVeilederMock(veileder);
        setInnloggetVeileder(veileder);
        setVeilederTilgang(finnVeilederTilgang(veileder, utkast));
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

function BeslutteroversiktLenke() {
    return (<fieldset>
        <Lenke href={'https://navikt.github.io/beslutteroversikt/'} target="_blank">Til beslutteroversikt</Lenke>
    </fieldset>);
}
