import * as React from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import './innsatsgruppe.less';
import { OrNothing } from '../../../utils/types/ornothing';
import { SkjemaElement } from '../skjemaelement/skjemaelement';

export enum InnsatsgruppeType {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
    GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
    VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

export const getInnsatsgruppeNavn = (innsatsgruppeType: OrNothing<InnsatsgruppeType>) => {
    const innsatsgruppe = innsatsgrupper.find(elem => elem.value === innsatsgruppeType);
    return innsatsgruppe && innsatsgruppe.label;
};

export const innsatsgrupper = [
    {
        label: 'Gode muligheter (standard innsats)',
        value: InnsatsgruppeType.STANDARD_INNSATS
    },
    {
        label: 'Trenger veiledning (situasjonsbestemt innsats)',
        value: InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS,
    },
    {
        label: 'Nedsatt arbeidsevne (spesielt tilpasset innsats)',
        value: InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS,
    },
    {
        label: 'Varig nedsatt arbeidsevne (varig tilpasset innsats)',
        value: InnsatsgruppeType.VARIG_TILPASSET_INNSATS
    },
    {
        label: 'Gradert varig nedsatt arbeidsevne (gradert varig tilpasset innsats)',
        value: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS
    },

];

interface InnsatsgruppeProps {
    handleInnsatsgruppeChanged: (e: any) => void;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    innsatgruppefeil?: string;
}

function Innsatsgruppe (props: InnsatsgruppeProps) {
    return (
        <SkjemaElement
            tittel="Innsatsgruppe"
            value={getInnsatsgruppeNavn(props.innsatsgruppe)}
            feil={props.innsatgruppefeil}
        >
            {(lukkSkjema) =>
                <InnsatsgruppeRadioButtons
                    lukkSkjema={lukkSkjema}
                    handleInnsatsgruppeChanged={props.handleInnsatsgruppeChanged}
                    innsatsgruppe={props.innsatsgruppe}
                />
            }
        </SkjemaElement>
    );
}

export default Innsatsgruppe;

interface InnsatsgruppeRadioProps {
    handleInnsatsgruppeChanged: (e: any) => void;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    lukkSkjema: () => void;
}

function InnsatsgruppeRadioButtons (props: InnsatsgruppeRadioProps ) {
    return (
        <div className="innsatsgruppe">
            {innsatsgrupper.map((innsatsgruppeObject, index) =>
                <RadioPanel
                    key={index}
                    label={innsatsgruppeObject.label}
                    value={innsatsgruppeObject.value}
                    name="innsatsgruppe"
                    onChange={(e: any) => {
                        props.handleInnsatsgruppeChanged(e.target.value);
                        props.lukkSkjema();
                    }}
                    checked={props.innsatsgruppe === innsatsgruppeObject.value}
                />
            )}
        </div>
    );
}