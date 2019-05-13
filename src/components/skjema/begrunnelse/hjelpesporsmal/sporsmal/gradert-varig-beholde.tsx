import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function GradertVarigBeholde () {
    return (
        <>
            <Normaltekst>
                Her skal du begrunne konklusjonen om at brukeren har nedsatt arbeidsevne, med mulighet til å jobbe litt eller delvis.
                Her er noen tips til hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor mener NAV at brukerens arbeidsevne er nedsatt og at han/hun ikke kan jobbe i full stilling?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å gå tilbake til jobben sin?</li>
                <li>Hvis bruker er eller nylig har vært under oppfølging, har noe endret seg siden sist?</li>
                <li>På hvilken måte er brukerens helse en utfordring i jobben?</li>
                <li>Skal det, eller har det blitt satt i gang, tilrettelegging på arbeidsplassen?</li>
                <li>Er det aktuelt med varig lønnstilskudd fra NAV?</li>
                <li>Hva har du, brukeren og eventuelt arbeidsgiver blitt enige om?</li>
            </ul>
        </>
    );
}

export default GradertVarigBeholde;
