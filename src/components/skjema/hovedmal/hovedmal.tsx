import * as React from 'react';
import './hovedmal.less';
import { RadioPanel } from 'nav-frontend-skjema';
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

export const getHovedmalNavn = (h: OrNothing<HovedmalType>) => {
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

    const HovedmalRadioButtons = (injectedProps: any) => (
        <div className="hovedmal">
            {hovedmalliste.map((mal, idx) =>
                <RadioPanel
                    key={idx}
                    label={mal.label}
                    name="hovedmal"
                    value={mal.value}
                    onChange={(e: any) => {
                        handleHovedmalChanged(e.target.value);
                        injectedProps.lukkSkjemaElement();
                    }}
                    checked={hovedmal === mal.value}
                />
            )}
        </div>
    );

    return (
        <SkjemaElement
            tittel="Hovedmål"
            value={getHovedmalNavn(hovedmal)}
            feil={props.hovedmalfeil}
        >
            <HovedmalRadioButtons/>
        </SkjemaElement>
    );
}

export default Hovedmal;
