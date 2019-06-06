import React, { useState } from 'react';
import classNames from 'classnames';
import Tekstomrade from 'nav-frontend-tekstomrade';
import './skjemaelement.less';
import { logEvent } from '../../../utils/frontend-logger';
import { APP_NAME } from '../../../utils/constants';

interface SkjemaElementProps<T> {
    tittel: string;
    children: React.ReactNode;
    className?: string;
    value?: React.ReactNode;
    feil?: string;
    skalKunViseRedigeringsModus?: boolean;
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
        <div className="vedtaksskjemaelement">
            <legend>{`${props.tittel}:`}</legend>
            { isOpen || props.skalKunViseRedigeringsModus
                ? <RedigeringsModus skalKunViseRedigeringsModus={props.skalKunViseRedigeringsModus}lukkSkjemaElement={lukkSkjemaElement} children={props.children}/>
                : <VisningsModus<T> value={props.value} apneSkjemaElement={apneSkjemaElement}/>
            }
        </div>
    );
}

function RedigeringsModus(props: {
    skalKunViseRedigeringsModus?: boolean,
    lukkSkjemaElement: () => void,
    className?: string,
    children: React.ReactNode
}) {
    const className = classNames('vedtaksskjemaelement__innhold', props.className);
    const handleLukkBtnClicked = () => {
        props.lukkSkjemaElement();
        logEvent(`${APP_NAME}.metrikker.lukk-skjema-element`);
    };
    return (
        <>
            <div className={className}>
                {props.children}
            </div>
            {!props.skalKunViseRedigeringsModus &&
            <div>
                <button
                    onClick={handleLukkBtnClicked}
                    className="toggle--knapp btn--lenke"
                >
                    Lukk
                </button>
            </div>}
        </>
    );
}

function VisningsModus<T>(props: {value?: React.ReactNode, apneSkjemaElement: () => void }) {
    const handleEndreBtnClicked = () => {
        props.apneSkjemaElement();
        logEvent(`${APP_NAME}.metrikker.apne-skjema-element`);
    };
    return (
        <>
            <div className="vedtaksskjemaelement__visning">
                { props.value
                    ? typeof props.value === 'string'
                        ? <Tekstomrade>{props.value}</Tekstomrade>
                        : props.value
                    : <span>{EMDASH}</span>
                }
            </div>
            <div>
                <button type="button" className="toggle--knapp btn--lenke" onClick={handleEndreBtnClicked}>
                    Endre
                </button>
            </div>
        </>
    );
}
