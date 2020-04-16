import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { RadioPanel } from 'nav-frontend-skjema';
import Lukknapp from 'nav-frontend-lukknapp';
import './mock-panel.less';
import { VeilederTilgang } from '../../utils/tilgang';
import { useTilgangStore } from '../../stores/tilgang-store';


export function MockPanel() {

    const {veilederTilgang, setVeilederTilgang} = useTilgangStore();

    const [skalVise, setSkalVise] = useState(false);
    const visSkjul = skalVise ? 'vis' : 'skjul';

    return (
        <div className={`devToggleStatus ${visSkjul}`}>
            <div
                className="apne-lukk-knapp"
                onClick={() => {
                    setSkalVise(!skalVise)
                }}
            >
                <div>
                    <Normaltekst className="apne">
                        Vis valg
                    </Normaltekst>
                </div>
                <Lukknapp>
                    Lukk
                </Lukknapp>
            </div>

            <fieldset>
                <legend>
                    <Normaltekst>
                        Innlogget som
                    </Normaltekst>
                </legend>
                {Object.keys(VeilederTilgang).map((x, idx) =>
                    <RadioPanel
                        onChange={() => {
                            setVeilederTilgang(VeilederTilgang[x as keyof typeof VeilederTilgang])
                        }}
                        key={idx}
                        name={x}
                        label={x}
                        value={x}
                        checked={x === veilederTilgang}
                    />
                )}
            </fieldset>
        </div>
    )
}
