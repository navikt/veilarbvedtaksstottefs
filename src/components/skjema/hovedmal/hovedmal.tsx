import * as React from 'react';
import './hovedmal.less';
import { RadioPanel } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';

export enum HovedmalType {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID'
}

interface HovedmalProps {
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
    const {hovedmal, setHovedmal} = useContext(SkjemaContext);
    return (
        <SkjemaElement
            tittel="Hovedmål"
            value={getHovedmalNavn(hovedmal)}
            feil={props.hovedmalfeil}
        >
            <HovedmalRadioButtons
                handleHovedmalChanged={setHovedmal}
                hovedmal={hovedmal}
            />
        </SkjemaElement>
    );
}

export default Hovedmal;

interface HovedmalRadioButtonsProps {
    handleHovedmalChanged: (e: any) => void;
    hovedmal: OrNothing<HovedmalType>;
}

function HovedmalRadioButtons(props: HovedmalRadioButtonsProps) {
    return (
        <div className="hovedmal">
            {hovedmalliste.map((mal, idx) =>
                <RadioPanel
                    key={idx}
                    label={mal.label}
                    name="hovedmal"
                    value={mal.value}
                    onChange={(e: any) => props.handleHovedmalChanged(e.target.value)}
                    checked={props.hovedmal === mal.value}
                />
            )}
        </div>
    );
}
