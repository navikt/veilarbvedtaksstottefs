import * as React from 'react';
import './opplysninger.less';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { VisOpplysning } from './visopplysning';
import { RedigerOpplysning } from './rediger-opplysning';
import { useState } from 'react';
import { ReactComponent as LeggTilIkon } from './legg-til.svg';
import { Opplysning } from '../skjema';

export enum OpplysningType {
    CV = 'CV',
    JOBBPROFIL = 'JOBBPROFIL',
    REGISTRERINGSINFO = 'REGISTRERINGSINFO',
    EGENVURDERING = 'EGENVURDERING',
}

interface OpplysningerProps {
    handleOpplysningerChanged: (index: number, opplysning: Opplysning) => void;
    handleOpplysningerChecked: (opplysning: Opplysning) => void;
    opplysninger: Opplysning[];
    opplysningerfeil?: string;
}

function Opplysninger(props: OpplysningerProps) {
    const [redigeringModusIndeks, setRedigeringModusIndeks ] = useState<number>( -1);
    const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning ] = useState<boolean>( true);

    const harOpplysninger = props.opplysninger.some(opplysning => Object.values(opplysning)[0]);

    const samladeOpplysninger = props.opplysninger.reduce((acc, opplysning) => {
        if (Object.values(opplysning)[0]) {
            return [...acc, Object.keys(opplysning)[0]];
        }
        return acc;
    }, [] as string[]);

    return (
        <SkjemaElement
            tittel="Opplysninger"
            value={harOpplysninger ? <LagOpplysningsListe samladeOpplysninger={samladeOpplysninger}/> : null}
            feil={props.opplysningerfeil}
        >
           <div className="opplysninger">
            {props.opplysninger.map((opplysning, index) =>
                redigeringModusIndeks !== index
                    ? <VisOpplysning
                        opplysning={opplysning}
                        handleOpplysning={() => setRedigeringModusIndeks(index)}
                        key={index}
                        onChange={props.handleOpplysningerChecked}
                    />
                    : <RedigerOpplysning
                        opplysning={opplysning}
                        onTekstSubmit={(endretOpplysning) => {
                            setRedigeringModusIndeks(-1);
                            props.handleOpplysningerChanged(index, endretOpplysning);
                        }}
                        key={index}
                        onTekstCancel={() => setRedigeringModusIndeks(-1)}
                    />
            )}
            {visLeggTilNyOpplysning
                ? <div tabIndex={0} role="button" aria-labelledby="legg til opplysning" onClick={() => setVisLeggTilNyOpplysning(false)} className="inputPanel leggtil">
                    <LeggTilIkon className="leggtil__ikon"/>
                    <span className="inputPanel__label">Legg til</span>
                </div>
                : <RedigerOpplysning
                    opplysning={{'': true}}
                    onTekstSubmit={(endretOpplysning) => {
                        props.handleOpplysningerChanged(props.opplysninger.length, endretOpplysning);
                        setVisLeggTilNyOpplysning(true);
                    }}
                    onTekstCancel={() => setVisLeggTilNyOpplysning(true)}
                />
            }
          </div>
        </SkjemaElement>
    );
}

export default Opplysninger;

function LagOpplysningsListe (props: {samladeOpplysninger: string[]}) {
    return (
        <ul>
            {props.samladeOpplysninger.map((opplysning, idx) => <li key={idx}>{opplysning}</li>)}
        </ul>
    );
}