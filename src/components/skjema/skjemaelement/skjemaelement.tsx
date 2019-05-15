import React, { useState } from 'react';
import classNames from 'classnames';
import './skjemaelement.less';
import { SkjemaGruppe } from 'nav-frontend-skjema';

interface SkjemaElementProps<T> {
    tittel: string;
    children: JSX.Element[] | JSX.Element;
    className?: string;
    value?: T;
    feil?: string;
}

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export function SkjemaElement<T>(props: SkjemaElementProps<T>) {
    const[isOpen, setIsOpen] = useState(true);

    function lukkSkjemaElement () {
        setIsOpen(false);
    }

    function apneSkjemaElement () {
        setIsOpen(true);
    }

    function cloneChild(child: React.ReactElement<any>): React.ReactElement<any> {
        return React.cloneElement<any>(child, {lukkSkjemaElement: lukkSkjemaElement});
    }

    const modifiedChildren = React.Children.map(props.children, cloneChild);

    const VisningModus = () => (
        <div>
            <span>{props.value ? props.value : EMDASH}</span>
            <button onClick={apneSkjemaElement} className="endre--knapp">Endre</button>
        </div>
    );

    const RedigerinsModus = () => {
        const className = classNames('skjemaelement__innhold', props.className);
        return (
            <div className={className}>
                <div>
                    <button onClick={lukkSkjemaElement} className="endre--knapp">Lukk</button>
                </div>
                {modifiedChildren}
            </div>
        );
    };

    return (
        <SkjemaGruppe feil={props.feil ? {feilmelding : props.feil} : undefined} className="skjemaelement">
            <legend>{`${props.tittel}:`}</legend>
            { isOpen
                ? <RedigerinsModus/>
                : <VisningModus/>
            }
        </SkjemaGruppe>
    );
}