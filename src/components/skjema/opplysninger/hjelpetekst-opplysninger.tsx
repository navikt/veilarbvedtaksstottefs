import React from 'react';
import { Hjelpetekster } from '../hjelpetekster/hjelpetekster';
import { Normaltekst } from 'nav-frontend-typografi';

export function OpplysningerHjelpeTekster () {
    return (
        <Hjelpetekster>
            <Normaltekst>For andre kilder kan du for eksempel skrive:</Normaltekst>
            <ul className="opplysning-hjelpetekster__liste">
                <li>Referat fra møte med veilederen din<br/>1. januar 20xx</li>
                <li>Dialogmeldinger i aktivitetsplanen fra<br/>1. til 20. februar 20xx</li>
                <li>Sluttrapporten fra Tiltaksarrangør AS<br/>1. september 20xx</li>
                <li>Legeerklæringen 1. november 20xx</li>
            </ul>
        </Hjelpetekster>
    );
}
