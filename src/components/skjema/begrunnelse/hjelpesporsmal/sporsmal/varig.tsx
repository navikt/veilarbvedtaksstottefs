import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function Varig () {
    return (
        <>
            <Normaltekst>
                Her skal du begrunne konklusjonen om at brukeren har nedsatt arbeidsevne, med liten mulighet til å jobbe.
                Her er noen tips til hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor har NAV vurdert at brukerens arbeidsevne er varig nedsatt og at han/hun har liten mulighet til å jobbe?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å komme i jobb?</li>
                <li>Hvis bruker er eller nylig har vært under oppfølging, har noe endret seg siden sist?</li>
                <li>På hvilken måte er brukerens helse en utfordring i yrkene som du har vurdert?</li>
                <li>Hvorfor vil ikke tiltak øke brukerens mulighet til å jobbe?</li>
                <li>Er det aktuelt med varig tilrettelagt arbeid (VTA) eller varig tilrettelagt arbeid i ordinær bedrift (VTO)?</li>
                <li>Er det aktuelt med varig lønnstilskudd fra NAV?</li>
                <li>Hva har du og brukeren blitt enige om?</li>
            </ul>
        </>
    );
}

export default Varig;
