import * as React from 'react';
import './hovedmal.less';
import { Radio, RadioPanelGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';
import { Undertittel } from 'nav-frontend-typografi';
import { SkjemaElement } from '../skjemaelement/skjemaelement';

export enum HovedmalType {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID'
}

interface HovedmalProps {
    handleHovedmalChanged: (e: any) => void;
    hovedmal: OrNothing<HovedmalType>;
}

function Hovedmal(props: HovedmalProps) {
    const{ handleHovedmalChanged, hovedmal } = props;
    return (
        <SkjemaElement tittel="Hovedmål" className="hovedmal">
            <Radio
                label="Skaffe arbeid"
                name="hovedmal"
                value={HovedmalType.SKAFFE_ARBEID}
                onChange={e => handleHovedmalChanged(e.target.value)}
                checked={hovedmal === HovedmalType.SKAFFE_ARBEID}
                className="inputPanel radioPanel"
            />
            <Radio
                label="Beholde arbeid"
                name="hovedmal"
                value={HovedmalType.BEHOLDE_ARBEID}
                onChange={e => handleHovedmalChanged(e.target.value)}
                checked={hovedmal === HovedmalType.BEHOLDE_ARBEID}
                className="inputPanel radioPanel"
            />
        </SkjemaElement>
    );
}

export default Hovedmal;
