import * as React from 'react';
import './opplysninger.less';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { VisOpplysning } from './visopplysning';
import { RedigerOpplysning } from './rediger-opplysning';
import { useState } from 'react';
import { LeggTilOpplysning } from './leggtil-opplysning';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';

export type Opplysning = {
    [key: string]: boolean
};

export enum OpplysningType {
    CV = 'CV',
    JOBBPROFIL = 'JOBBPROFIL',
    REGISTRERINGSINFO = 'REGISTRERINGSINFO',
    EGENVURDERING = 'EGENVURDERING',
}

interface OpplysningerProps {
    opplysningerfeil?: string;
}

function Opplysninger(props: OpplysningerProps) {
    const [redigeringModusIndeks, setRedigeringModusIndeks ] = useState<number>( -1);
    const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning ] = useState<boolean>( true);

    const { opplysninger, setOpplysninger } = useContext(SkjemaContext);

    const harOpplysninger = opplysninger.some(opplysning => Object.values(opplysning)[0]);

    const samladeOpplysninger = opplysninger.reduce((acc, opplysning) => {
        if (Object.values(opplysning)[0]) {
            return [...acc, Object.keys(opplysning)[0]];
        }
        return acc;
    }, [] as string[]);

    function handleOpplysningerChanged (index: number, opplysning: Opplysning) {
        if (Object.keys(opplysning)[0].trim()) {
            setOpplysninger(prevState => {
                if (index === prevState.length) {
                    return [...prevState, opplysning];
                }
                return prevState.map((prevOpplysning, idx) => {
                    if (idx === index) {
                        return opplysning;
                    }
                    return prevOpplysning;
                });
            });
        }
    }

    function handleOpplysningerChecked (opplysning: Opplysning) {
        setOpplysninger(prevState => {
            return prevState.map(prevOpplysning => {
                if (Object.keys(prevOpplysning)[0] === Object.keys(opplysning)[0]) {
                    return opplysning;
                }
                return prevOpplysning;
            });
        });
    }

    return (
        <SkjemaElement
            tittel="Opplysninger"
            value={harOpplysninger ? <LagOpplysningsListe samladeOpplysninger={samladeOpplysninger}/> : null}
            feil={props.opplysningerfeil}
        >
           <div className="opplysninger">
            {opplysninger.map((opplysning, index) =>
                redigeringModusIndeks !== index
                    ? <VisOpplysning
                        opplysning={opplysning}
                        handleOpplysning={() => setRedigeringModusIndeks(index)}
                        key={index}
                        onChange={handleOpplysningerChecked}
                    />
                    : <RedigerOpplysning
                        opplysning={opplysning}
                        onTekstSubmit={(endretOpplysning) => {
                            setRedigeringModusIndeks(-1);
                            handleOpplysningerChanged(index, endretOpplysning);
                        }}
                        key={index}
                        onTekstCancel={() => setRedigeringModusIndeks(-1)}
                    />
            )}
            {visLeggTilNyOpplysning
                ? <LeggTilOpplysning leggTilOpplysning={() => setVisLeggTilNyOpplysning(false)}/>
                : <RedigerOpplysning
                    opplysning={{'': true}}
                    onTekstSubmit={(endretOpplysning) => {
                        handleOpplysningerChanged(opplysninger.length, endretOpplysning);
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