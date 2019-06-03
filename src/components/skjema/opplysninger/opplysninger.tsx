import * as React from 'react';
import './opplysninger.less';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { VisOpplysning } from './visopplysning';
import { RedigerOpplysning } from './rediger-opplysning';
import { useRef, useState } from 'react';
import { LeggTilOpplysning } from './leggtil-opplysning';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';
import { Normaltekst } from 'nav-frontend-typografi';

export type Opplysning = {
    [key: string]: boolean
};

interface OpplysningerProps {
    opplysningerfeil?: string;
}

function Opplysninger(props: OpplysningerProps) {
    const [redigeringModusIndeks, setRedigeringModusIndeks ] = useState<number>( -1);
    const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning ] = useState<boolean>( true);
    const [sistEndretIndeks, setSistEndretIndeks] = useState<number>( -1);
    const timer = useRef(0);

    const { opplysninger, setOpplysninger } = useContext(SkjemaContext);
    const harOpplysninger = opplysninger.some(opplysning => Object.values(opplysning)[0]);
    const samladeOpplysninger = opplysninger.reduce((acc, opplysning) => {
        if (Object.values(opplysning)[0]) {
            return [...acc, Object.keys(opplysning)[0]];
        }
        return acc;
    }, [] as string[]);

    function nullstilState() {
        setRedigeringModusIndeks(-1);
        setSistEndretIndeks(-1);
    }

    function setTimer () {
        if (timer.current !== 0) {
            window.clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(() => setSistEndretIndeks(-1), 1500);

    }

    function handleOpplysningerChanged (index: number, opplysning: Opplysning) {
        if (Object.keys(opplysning)[0].trim()) {
            setSistEndretIndeks(index);
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
            setTimer();
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
                <Normaltekst>Kilder slik de vil vises i vedtaksbrevet</Normaltekst>
                {opplysninger.map((opplysning, index) =>
                    redigeringModusIndeks !== index
                        ? <VisOpplysning
                            opplysning={opplysning}
                            handleOpplysning={() => {
                                setRedigeringModusIndeks(index);
                                setVisLeggTilNyOpplysning(true);
                            }}
                            key={index}
                            onChange={handleOpplysningerChecked}
                            erSistEndretIndeks={index === sistEndretIndeks}
                        />
                        : <RedigerOpplysning
                            opplysning={opplysning}
                            onTekstSubmit={(endretOpplysning) => {
                                setRedigeringModusIndeks(-1);
                                handleOpplysningerChanged(index, endretOpplysning);
                            }}
                            key={index}
                            onTekstCancel={nullstilState}
                        />
                )}
                {visLeggTilNyOpplysning
                    ? <LeggTilOpplysning
                        leggTilOpplysning={() => {
                            setVisLeggTilNyOpplysning(false);
                            window.clearTimeout(timer.current);
                            nullstilState();
                        }}
                    />
                    : <RedigerOpplysning
                        opplysning={{'': true}}
                        onTekstSubmit={(endretOpplysning) => {
                            handleOpplysningerChanged(opplysninger.length, endretOpplysning);
                            setVisLeggTilNyOpplysning(true);
                        }}
                        onTekstCancel={() => {
                            setVisLeggTilNyOpplysning(true);
                        }}
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