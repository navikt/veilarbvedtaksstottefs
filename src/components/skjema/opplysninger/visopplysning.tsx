import React from 'react';
import { keyCodes } from 'nav-frontend-js-utils';

interface VisopplysningProps {
    tekst: string;
    handleOpplysning: () => void;
    slettOpplysning: () => void;
}

export function VisOpplysning(props: VisopplysningProps) {

    function handleOnKeyPress(e: any) {
        if (e.keyCode === keyCodes.enter) {
            props.handleOpplysning();
        }
    }

    return (
        <li tabIndex={0}>
            <span onClick={props.handleOpplysning} onKeyPress={handleOnKeyPress}>
                {props.tekst}
            </span>
        </li>
    );
}