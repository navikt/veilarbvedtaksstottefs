import React from 'react';
import { Hjelpetekster } from '../hjelpetekster/hjelpetekster';
import { Normaltekst } from 'nav-frontend-typografi';

export function OpplysningerHjelpeTekster () {
    return (
        <Hjelpetekster>
            <Normaltekst>Du kan for eksempel skrive:</Normaltekst>
            <ul>
                <li>Referat fra møte med veilederen din 1. januar 20xx</li>
                <li>Dialogmeldinger i aktivitetsplanen fra 1. til 20. februar 20xx</li>
                <li>Sluttrapporten fra Tiltaksarrangør AS 1. september 20xx</li>
                <li>Legeerklæringen 1. november 20xx</li>
            </ul>
        </Hjelpetekster>
    );
}