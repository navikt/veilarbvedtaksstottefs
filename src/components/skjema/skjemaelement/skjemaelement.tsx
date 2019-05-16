import React, { useState } from 'react';
import classNames from 'classnames';
import './skjemaelement.less';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';

interface SkjemaElementProps<T> {
    tittel: string;
    children: (JSX.Element[] | JSX.Element) | ((lukkSkjemaElement: () => void) => (JSX.Element[] | JSX.Element));
    className?: string;
    value?: React.ReactNode;
    feil?: string;
}

const emdashCharacterCode = 8212;
export const EMDASH = String.fromCharCode(emdashCharacterCode);

export function SkjemaElement<T>(props: SkjemaElementProps<T>) {
    const[isOpen, setIsOpen] = useState(true);

    function lukkSkjemaElement () {
        setIsOpen(false);
    }

    function apneSkjemaElement () {
        setIsOpen(true);
    }

    return (
        <SkjemaGruppe feil={props.feil ? {feilmelding : props.feil} : undefined} className="skjemaelement">
            <legend>{`${props.tittel}:`}</legend>
            { isOpen
                ? <RedigeringsModus lukkSkjemaElement={lukkSkjemaElement} children={props.children}/>
                : <VisningsModus<T> value={props.value} apneSkjemaElement={apneSkjemaElement}/>
            }
        </SkjemaGruppe>
    );
}

function RedigeringsModus(props: {lukkSkjemaElement: () => void, className?: string, children: (JSX.Element[] | JSX.Element) | ((lukkSkjemaElement: () => void) => (JSX.Element[] | JSX.Element)) }) {
    const className = classNames('skjemaelement__innhold', props.className);
    return (
        <div className={className}>
            <div className="skjemaelement__redigering">
                <Knapp onClick={props.lukkSkjemaElement} className="toggle--knapp">Lukk</Knapp>
            </div>
            {typeof props.children === 'function'
                ? props.children(props.lukkSkjemaElement)
                : props.children
            }
        </div>
    );
}

function VisningsModus<T>(props: {value?: React.ReactNode, apneSkjemaElement: () => void }) {
    return (
        <div className="skjemaelement__visning">
            { props.value
                ? typeof props.value === 'string'
                    ? <span>{props.value}</span>
                    : props.value
                : <span>{EMDASH}</span>
            }
            <div>
                <Knapp className="toggle--knapp" onClick={props.apneSkjemaElement}>
                    Endre
                </Knapp>
            </div>
        </div>
    );
}