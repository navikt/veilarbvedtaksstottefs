import React from 'react';
import { keyCodes } from 'nav-frontend-js-utils';
import { Normaltekst } from 'nav-frontend-typografi';

interface VisopplysningProps {
    tekst: string;
    handleOpplysning: () => void;
    slettOpplysning: () => void;
}

export function VisOpplysning(props: VisopplysningProps) {

    function handleOnKeyDown(e: any) {
        if (e.keyCode === keyCodes.enter) {
            props.handleOpplysning();
        }
    }

    return (
        <li tabIndex={0} onClick={props.handleOpplysning} onKeyDown={handleOnKeyDown}>
            <Normaltekst>
                {props.tekst}
            </Normaltekst>
        </li>
    );
}