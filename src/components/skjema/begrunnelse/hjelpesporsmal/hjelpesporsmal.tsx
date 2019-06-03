import * as React from 'react';
import { OrNothing } from '../../../../utils/types/ornothing';
import { InnsatsgruppeType } from '../../innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../../hovedmal/hovedmal';
import ManglerData from './sporsmal/mangler-data';
import StandardSkaffe from './sporsmal/standard-skaffe';
import StandardBeholde from './sporsmal/standard-beholde';
import SituasjonsbestemtSkaffe from './sporsmal/situasjonsbestemt-skaffe';
import SituasjonsbestemtBeholde from './sporsmal/situasjonsbestemt-beholde';
import SpesieltTilpassetSkaffe from './sporsmal/spesielt-tilpasset-skaffe';
import SpesieltTilpassetBeholde from './sporsmal/spesielt-tilpasset-beholde';
import GradertVarigSkaffe from './sporsmal/gradert-varig-skaffe';
import GradertVarigBeholde from './sporsmal/gradert-varig-beholde';
import Varig from './sporsmal/varig';
import { Hjelpetekster } from '../../hjelpetekster/hjelpetekster';

interface HjelpesporsmalProps  {
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    hovedmal: OrNothing<HovedmalType>;
}

function finnRiktigSporsmal(innsatsgruppe: OrNothing<InnsatsgruppeType>, hovedmal: OrNothing<HovedmalType>) {

    const harGruppeOgMal = (_innsatsgruppe: InnsatsgruppeType, _hovedmal: HovedmalType) => {
        return innsatsgruppe === _innsatsgruppe && hovedmal === _hovedmal;
    };

    if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
        return <Varig />;
    } else if (harGruppeOgMal(InnsatsgruppeType.STANDARD_INNSATS, HovedmalType.SKAFFE_ARBEID)) {
        return <StandardSkaffe />;
    } else if (harGruppeOgMal(InnsatsgruppeType.STANDARD_INNSATS, HovedmalType.BEHOLDE_ARBEID)) {
        return <StandardBeholde />;
    } else if (harGruppeOgMal(InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS, HovedmalType.SKAFFE_ARBEID)) {
        return <SituasjonsbestemtSkaffe />;
    } else if (harGruppeOgMal(InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS, HovedmalType.BEHOLDE_ARBEID)) {
        return <SituasjonsbestemtBeholde />;
    } else if (harGruppeOgMal(InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS, HovedmalType.SKAFFE_ARBEID)) {
        return <SpesieltTilpassetSkaffe />;
    } else if (harGruppeOgMal(InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS, HovedmalType.BEHOLDE_ARBEID)) {
        return <SpesieltTilpassetBeholde />;
    } else if (harGruppeOgMal(InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS, HovedmalType.SKAFFE_ARBEID)) {
        return <GradertVarigSkaffe />;
    } else if (harGruppeOgMal(InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS, HovedmalType.BEHOLDE_ARBEID)) {
        return <GradertVarigBeholde />;
    } else {
        return <ManglerData />;
    }

}

function Hjelpesporsmal (props: HjelpesporsmalProps) {
    const { innsatsgruppe, hovedmal } = props;
    return (
        <Hjelpetekster>
            {finnRiktigSporsmal(innsatsgruppe, hovedmal)}
        </Hjelpetekster>
    );
}

export default Hjelpesporsmal;
