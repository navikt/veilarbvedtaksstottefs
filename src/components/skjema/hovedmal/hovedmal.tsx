import React, { useContext } from 'react';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import { OrNothing } from '../../../utils/types/ornothing';
import { InnsatsgruppeType } from '../innsatsgruppe/innsatsgruppe';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import SkjemaBolk from '../bolk/skjema-bolk';
import { EMDASH } from '../skjemaelement/skjemaelement';
import './hovedmal.less';
import { useSkjemaStore } from '../../../stores/skjema-store';

export enum HovedmalType {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID'
}

interface HovedmalProps {
    hovedmalfeil?: string;
}

export const getHovedmalNavn = (hovedmal: OrNothing<HovedmalType>) => {
    const hovedmalobjekt = hovedmalliste.find(h => h.value === hovedmal);
    return (hovedmalobjekt && hovedmalobjekt.label) || EMDASH;
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
    const { innsatsgruppe, hovedmal, setHovedmal } = useSkjemaStore();
    const erVarigTilpassetInnsats = innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS;
    return (
        <SkjemaBolk
            tittel="Hovedmål"
            tittelId="hovedmal-id"
        >
            <SkjemaGruppe feil={props.hovedmalfeil ? {feilmelding: props.hovedmalfeil} : undefined}>
                {erVarigTilpassetInnsats
                    ? <AlertStripeInfo className="hovedmal-info">
                        <span className="hovedmal-info__tekst">
                            Hovedmål kan ikke velges ved varig tilpasset innsats (varig nedsatt arbeidsevne)
                        </span>
                    </AlertStripeInfo>
                    : <HovedmalRadioButtons
                        handleHovedmalChanged={setHovedmal}
                        hovedmal={hovedmal}
                    />
                }
            </SkjemaGruppe>
        </SkjemaBolk>
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
