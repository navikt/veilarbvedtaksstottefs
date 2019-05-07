import React, { useState } from 'react';
import { ReactComponent as LeggTilIkon } from './legg-til.svg';
import { RedigerOpplysning } from './rediger-opplysning';
import { VisOpplysning } from './visopplysning';

export function EgneOpplysninger () {
    const [opplysninger, setOpplysninger ] = useState<string[]>( []);
    const [redigeringModusIndeks, setRedigeringModusIndeks ] = useState<number>( -1);

    function handleLeggTilOpplysningClicked () {
        setRedigeringModusIndeks(opplysninger.length);
        setOpplysninger([...opplysninger, '']);
    }

    function handleSlettOpplysningClicked (tekst: string) {
        setRedigeringModusIndeks(-1);
        setOpplysninger(prevOpplysninger => prevOpplysninger.filter(opplysning => opplysning !== tekst));
    }

    function onHandleTekstSubmit (tekst: string, indeks: number) {
        const nyOpplysninger = [...opplysninger];
        nyOpplysninger[indeks] = tekst;
        setOpplysninger(nyOpplysninger);
        setRedigeringModusIndeks(-1);
    }

    return (
        <div className="yadayda">
            <ul>
            {opplysninger.map((opplysning, index) =>
                redigeringModusIndeks !== index
                    ? <VisOpplysning tekst={opplysning} handleOpplysning={() => setRedigeringModusIndeks(index)} slettOpplysning={() => handleSlettOpplysningClicked(opplysning)}/>
                    : <RedigerOpplysning tekst={opplysning} onTekstSubmit={(tekst) => onHandleTekstSubmit(tekst, index)} key={index}/>
            )}
            </ul>
            <button type="button" onClick={handleLeggTilOpplysningClicked}><LeggTilIkon/><span>Legg til opplysning </span></button>
        </div>
    );
}