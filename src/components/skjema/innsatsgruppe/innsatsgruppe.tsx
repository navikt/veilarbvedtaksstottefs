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
    handleKonklusjonChanged: (e: any) => void;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    innsatgruppefeil?: string;
}

function Innsatsgruppe (props: InnsatsgruppeProps) {
    const {handleKonklusjonChanged, innsatsgruppe} = props;

    const InnsatsgruppeRadioButtons = (injectedProps: any) => (
        <div className="innsatsgruppe">
            {innsatsgrupper.map((innsatsgruppeObject, index) =>
                <RadioPanel
                    key={index}
                    label={innsatsgruppeObject.label}
                    value={innsatsgruppeObject.value}
                    name="innsatsgruppe"
                    onChange={(e: any) => {
                        handleKonklusjonChanged(e.target.value);
                        injectedProps.lukkSkjemaElement();
                    }}
                    checked={innsatsgruppe === innsatsgruppeObject.value}
                />
            )}
        </div>
    );

    return (
        <SkjemaElement
            tittel="Innsatsgruppe"
            value={getInnsatsgruppeNavn(innsatsgruppe)}
            feil={props.innsatgruppefeil}
        >
            <InnsatsgruppeRadioButtons/>
        </SkjemaElement>
    );
}

export default Innsatsgruppe;
