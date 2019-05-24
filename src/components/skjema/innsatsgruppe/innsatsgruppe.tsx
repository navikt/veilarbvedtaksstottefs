import * as React from 'react';
import { RadioPanel } from 'nav-frontend-skjema';
import './innsatsgruppe.less';
import { OrNothing } from '../../../utils/types/ornothing';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';

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
        label: 'Standard innsats (gode muligheter)',
        value: InnsatsgruppeType.STANDARD_INNSATS
    },
    {
        label: 'Situasjonsbestemt innsats (trenger veiledning)',
        value: InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS,
    },
    {
        label: 'Spesielt tilpasset innsats (nedsatt arbeidsevne)',
        value: InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS,
    },
    {
        label: 'Gradert varig tilpasset innsats (gradert varig nedsatt arbeidsevne)',
        value: InnsatsgruppeType.VARIG_TILPASSET_INNSATS
    },
    {
        label: 'Gradert varig tilpasset innsats (gradert varig nedsatt arbeidsevne)',
        value: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS
    },

];

interface InnsatsgruppeProps {
    innsatgruppefeil?: string;
}

function Innsatsgruppe (props: InnsatsgruppeProps) {
    const {innsatsgruppe, setInnsatsgruppe} = useContext(SkjemaContext);
    return (
        <SkjemaElement
            tittel="Innsatsgruppe"
            value={getInnsatsgruppeNavn(innsatsgruppe)}
            feil={props.innsatgruppefeil}
        >
            {(lukkSkjema) =>
                <InnsatsgruppeRadioButtons
                    lukkSkjema={lukkSkjema}
                    handleInnsatsgruppeChanged={setInnsatsgruppe}
                    innsatsgruppe={innsatsgruppe}
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