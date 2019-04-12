import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './hovedmal.less';
import { Radio } from 'nav-frontend-skjema';

export enum HovedmalType {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID'
}

interface HovedmalProps {
    handleHovedmalChanged: (e: any) => void;
}

function Hovedmal(props: HovedmalProps) {
    const{ handleHovedmalChanged } = props;
    return (
        <div className="hovedmal">
            <Undertittel className="hovedmal__tittel">
                Hovedmål
            </Undertittel>
            <Radio
                label="Skaffe arbeid"
                name="hovedmal"
                value={HovedmalType.SKAFFE_ARBEID}
                onChange={e => handleHovedmalChanged(e.target.value)}
            />
            <Radio
                label="Beholde arbeid"
                name="hovedmal"
                value={HovedmalType.BEHOLDE_ARBEID}
                onChange={e => handleHovedmalChanged(e.target.value)}
            />
        </div>
    );
}

export default Hovedmal;
