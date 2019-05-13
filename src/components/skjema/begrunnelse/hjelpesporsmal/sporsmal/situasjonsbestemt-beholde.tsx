import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

function SituasjonsbestemtBeholde () {
    return (
        <>
            <Normaltekst>
                Her skal du begrunne konklusjonen om at bruker har rett til mer veiledning.
                Her er noen tips til hva du kan skrive om:
            </Normaltekst>
            <ul>
                <li>Hvorfor har NAV vurdert at brukeren kan få veiledning for å gå tilbake til jobben sin?</li>
                <li>Hvordan vurderer brukeren sine muligheter til å gå tilbake til jobben sin?</li>
                <li>Hvis brukeren har fått en arbeidsevnevurdering tidligere, hva har endret seg siden sist?</li>
                <li>Skal det, eller har det blitt satt i gang, tilrettelegging på arbeidsplassen?</li>
                <li>Hva har du, brukeren og eventuelt arbeidsgiver blitt enige om?</li>
            </ul>
        </>
    );
}

export default SituasjonsbestemtBeholde;
