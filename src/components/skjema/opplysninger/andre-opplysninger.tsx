import React, { useState } from 'react';
import { ReactComponent as LeggTilIkon } from './legg-til.svg';
import { RedigerOpplysning } from './rediger-opplysning';
import { VisOpplysning } from './visopplysning';
import { Undertittel } from 'nav-frontend-typografi';

export function AndreOpplysninger () {
    const [opplysninger, setOpplysninger ] = useState<string[]>( []);
    const [redigeringModusIndeks, setRedigeringModusIndeks ] = useState<number>( -1);
    const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning ] = useState<boolean>( true);

    function handleSlettOpplysningClicked (tekst: string) {
        setRedigeringModusIndeks(-1);
        setOpplysninger(prevOpplysninger => prevOpplysninger.filter(opplysning => opplysning !== tekst));
    }

    function onHandleTekstSubmit (tekst: string, indeks: number) {
        if (tekst.trim() !== '') {
            const nyOpplysninger = [...opplysninger];
            nyOpplysninger[indeks] = tekst;
            setOpplysninger(nyOpplysninger);
            setRedigeringModusIndeks(-1);
        }
        setVisLeggTilNyOpplysning(true);
    }

    return (
        <div className="andreopplysninger">
            <Undertittel>Andre opplysninger (Samtalsreferat, Dialog, Medisinsk dokumentasjon)</Undertittel>
            <ul>
                {opplysninger.map((opplysning, index) =>
                    redigeringModusIndeks !== index
                        ? <VisOpplysning
                            tekst={opplysning}
                            handleOpplysning={() => setRedigeringModusIndeks(index)}
                            slettOpplysning={() => handleSlettOpplysningClicked(opplysning)}
                        />
                        : <RedigerOpplysning
                            tekst={opplysning}
                            onTekstSubmit={(tekst) => onHandleTekstSubmit(tekst, index)}
                            key={index}
                        />
                )}
            </ul>
            {visLeggTilNyOpplysning
                ? <div tabIndex={0} role="button" aria-labelledby="legg til opplysning" onClick={() => setVisLeggTilNyOpplysning(false)} className="skjemaelement leggtil">
                    <LeggTilIkon/>
                    <label className="skjemaelement__label">Legg til</label>
                </div>
                : <RedigerOpplysning tekst={''} onTekstSubmit={(tekst) => onHandleTekstSubmit(tekst, opplysninger.length)}/>}
        </div>
    );
}