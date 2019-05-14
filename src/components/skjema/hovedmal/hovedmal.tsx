import * as React from 'react';
import './hovedmal.less';
import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';
import { SkjemaElement } from '../skjemaelement/skjemaelement';

export enum HovedmalType {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID'
}

interface HovedmalProps {
    handleHovedmalChanged: (e: any) => void;
    hovedmal: OrNothing<HovedmalType>;
    hovedmalfeil?: string;
}

export const getHovedmalNavn = (h: HovedmalType) => {
    const hovedmalobjekt = hovedmalliste.find(hovedmal => hovedmal.value === h);
    return (hovedmalobjekt && hovedmalobjekt.label) || '';
};

const hovedmalliste = [
    {
        label: 'Skaffe arbeid',
        value: HovedmalType.SKAFFE_ARBEID
    },
    {
        label: 'Beholde arbeid',
        value: HovedmalType.BEHOLDE_ARBEID
    },
];

function Hovedmal(props: HovedmalProps) {
    const{ handleHovedmalChanged, hovedmal } = props;
    return (
        <SkjemaGruppe feil={props.hovedmalfeil ? {feilmelding : props.hovedmalfeil} : undefined}>
            <SkjemaElement tittel="Hovedmål" className="hovedmal">
                {hovedmalliste.map((mal, idx) =>
                    <Radio
                        key={idx}
                        label={mal.label}
                        name="hovedmal"
                        value={mal.value}
                        onChange={e => handleHovedmalChanged(e.target.value)}
                        checked={hovedmal === mal.value}
                        className="inputPanel radioPanel"
                    />
                )}
            </SkjemaElement>
        </SkjemaGruppe>
    );
}

export default Hovedmal;
