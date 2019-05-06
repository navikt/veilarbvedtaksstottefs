import * as React from 'react';
import './hovedmal.less';
import { Radio, RadioPanelGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';

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
        <RadioPanelGruppe
            legend="Hovedmal: "
            name="hovedmal"
            radios={[
                {label: 'Skaffe arbeid', value: HovedmalType.SKAFFE_ARBEID},
                {label: 'Beholde arbeid', value: HovedmalType.BEHOLDE_ARBEID}
            ]}
            onChange={(e, value) => handleHovedmalChanged(value)}
            checked={hovedmal || ''}
            className="hovedmal"
        />
    );
}

export default Hovedmal;
