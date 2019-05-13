import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function SpesieltTilpassetSkaffe () {
    return (
        <>
            <Normaltekst>
                Her skal du begrunne konklusjonen om at bruker har nedsatt arbeidsevne, og har rett til mer veiledning.
                Her er noen tips til hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor har NAV vurdert at brukerens arbeidsevne er nedsatt?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å komme i jobb?</li>
                <li>Hva slags arbeid har brukeren som mål å skaffe seg?</li>
                <li>Har brukeren behov for yrkes- eller karriereveiledning?</li>
                <li>Hvis brukeren er eller nylig har vært under oppfølging, har noe endret seg siden sist?</li>
                <li>Skal det, eller har det blitt satt i gang, medisinsk behandling?</li>
                <li>Hva har du og brukeren blitt enige om?</li>
            </ul>
        </>
    );
}

export default SpesieltTilpassetSkaffe;
