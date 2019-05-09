import React, { useState } from 'react';
import { ReactComponent as LeggTilIkon } from './legg-til.svg';
import { RedigerOpplysning } from './rediger-opplysning';
import { VisOpplysning } from './visopplysning';
import { Undertittel } from 'nav-frontend-typografi';

interface AndreOpplysningerProps {
    andreopplysninger: string[];
    setAndreOpplysninger: (prevopplysninger: string[] | ((prevopplysninger: string[]) => void)) => void;
}

export function AndreOpplysninger (props: AndreOpplysningerProps) {
    const [redigeringModusIndeks, setRedigeringModusIndeks ] = useState<number>( -1);
    const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning ] = useState<boolean>( true);

    function handleSlettOpplysningClicked (index: number) {
        setRedigeringModusIndeks(-1);
        props.setAndreOpplysninger(prevOpplysninger => prevOpplysninger.filter((opplysning, idx) => idx !== index));
    }

    function onHandleTekstSubmit (tekst: string, indeks: number) {
        if (tekst.trim() !== '') {
            const nyOpplysninger = [...props.andreopplysninger];
            nyOpplysninger[indeks] = tekst;
            props.setAndreOpplysninger(nyOpplysninger);
            setRedigeringModusIndeks(-1);
        }
        setVisLeggTilNyOpplysning(true);
    }

    return (
        <div className="andreopplysninger">
            <Undertittel>Andre opplysninger (Samtalsreferat, Dialog, Medisinsk dokumentasjon)</Undertittel>
            <ul>
                {props.andreopplysninger.map((opplysning, index) =>
                    redigeringModusIndeks !== index
                        ? <VisOpplysning
                            tekst={opplysning}
                            handleOpplysning={() => setRedigeringModusIndeks(index)}
                            slettOpplysning={() => handleSlettOpplysningClicked(index)}
                        />
                        : <RedigerOpplysning
                            tekst={opplysning}
                            onTekstSubmit={(tekst) => onHandleTekstSubmit(tekst, index)}
                            key={index}
                        />
                )}
            </ul>
            {visLeggTilNyOpplysning
                ? <div tabIndex={0} role="button" aria-labelledby="legg til opplysning" onClick={() => setVisLeggTilNyOpplysning(false)} className="skjemaelement andreopplysninger__leggtil">
                    <LeggTilIkon/>
                    <label className="skjemaelement__label">Legg til</label>
                </div>
                : <RedigerOpplysning tekst={''} onTekstSubmit={(tekst) => onHandleTekstSubmit(tekst, props.andreopplysninger.length)}/>}
        </div>
    );
}