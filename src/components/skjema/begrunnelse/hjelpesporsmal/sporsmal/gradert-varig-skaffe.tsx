import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function GradertVarigSkaffe () {
    return (
        <>
            <Normaltekst>
                Her skal du begrunne konklusjonen om at brukeren har nedsatt arbeidsevne, med mulighet til å jobbe litt eller delvis.
                Her er noen tips til hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor har NAV vurdert at brukerens arbeidsevne er nedsatt og at han/hun ikke kan jobbe i full stilling?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å komme i jobb?</li>
                <li>Hvis bruker er eller nylig har vært under oppfølging, har noe endret seg siden sist?</li>
                <li>Hva slags arbeid har brukeren som mål å skaffe seg?</li>
                <li>På hvilken måte er brukerens helse en utfordring i yrkene som du har vurdert?</li>
                <li>Er det aktuelt med varig lønnstilskudd fra NAV?</li>
                <li>Hva har du og brukeren blitt enige om?</li>
            </ul>
        </>
    );
}

export default GradertVarigSkaffe;
