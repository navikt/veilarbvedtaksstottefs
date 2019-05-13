import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function SpesieltTilpassetBeholde () {
    return (
        <>
            <Normaltekst>
                Her skal du begrunne konklusjonen om at bruker har nedsatt arbeidsevne, og har rett til mer veiledning.
                Her er noen tips til hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor har NAV vurdert at brukerens arbeidsevne er nedsatt?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å gå tilbake til jobben sin?</li>
                <li>Hvis bruker er eller nylig har vært under oppfølging, har noe endret seg siden sist?</li>
                <li>Skal det, eller har det blitt satt i gang, medisinsk behandling?</li>
                <li>Skal det, eller har det blitt satt i gang, tilrettelegging på arbeidsplassen?</li>
                <li>Hvilke aktiviteter eller tiltak kan være aktuelle for brukeren?</li>
                <li>Hva har du, brukeren og eventuelt arbeidsgiver blitt enige om?</li>
            </ul>
        </>
    );
}

export default SpesieltTilpassetBeholde;
