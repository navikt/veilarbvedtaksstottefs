import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function StandardSkaffe () {
    return (
        <>
            <Normaltekst>
                Her kan du begrunne konklusjonen om at bruker har gode muligheter til å komme i jobb på egenhånd.
                Her er noen tips til hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor har NAV vurdert at bruker har gode muligheter til å komme i jobb på egenhånd?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å komme i jobb?</li>
                <li>Hvis du og brukeren har blitt enige om noe, kan du utdype dette her.</li>
                <li>Hvis bruker er eller nylig har vært under oppfølging, har noe endret seg siden sist?</li>
                <li>Hva bør brukeren gjøre videre?</li>
            </ul>
        </>
    );
}

export default StandardSkaffe;
