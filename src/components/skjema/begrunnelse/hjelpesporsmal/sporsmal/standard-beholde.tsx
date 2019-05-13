import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function StandardBeholde () {
    return (
        <>
            <Normaltekst>
                Her kan du begrunne konklusjonen om at bruker har gode muligheter til å gå tilbake til jobben sin.
                Her er noen tips om hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor har NAV vurdert at brukeren har gode muligheter til å gå tilbake til jobben sin uten veiledning?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å gå tilbake til jobben sin?</li>
                <li>Hvis du og brukeren har blitt enige om noe, kan du utdype dette her.</li>
                <li>Hva sier arbeidsgiveren?</li>
                <li>Hvis bruker er eller nylig har vært under oppfølging, har noe endret seg siden sist?</li>
                <li>Hva bør brukeren gjøre videre?</li>
                <li>Hva har du, bruker og eventuelt arbeidsgiver blitt enige om?</li>
            </ul>
        </>
    );
}

export default StandardBeholde;
