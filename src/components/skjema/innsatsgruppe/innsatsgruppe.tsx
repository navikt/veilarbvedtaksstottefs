import * as React from 'react';
import { Radio, RadioPanelGruppe } from 'nav-frontend-skjema';
import './innsatsgruppe.less';
import { OrNothing } from '../../../utils/types/ornothing';
import { Undertittel } from 'nav-frontend-typografi';
import { SkjemaElement } from '../skjemaelement/skjemaelement';

export enum InnsatsgruppeType {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
    GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
    VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

export const getInnsatsgruppeNavn = (i: InnsatsgruppeType) => {
    switch (i) {
        case InnsatsgruppeType.STANDARD_INNSATS:
            return 'Gode muligheter (standard innsats)';
        case InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS:
            return 'Trenger veiledning (situasjonsbestemt innsats)';
        case InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS:
            return 'Nedsatt arbeidsevne (spesielt tilpasset innsats)';
        case InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS:
            return 'Gradert varig nedsatt arbeidsevne (gradert varig tilpasset innsats)';
        case  InnsatsgruppeType.VARIG_TILPASSET_INNSATS:
            return 'Varig nedsatt arbeidsevne (varig tilpasset innsats)';
        default :
            return null;
    }

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
}

function Innsatsgruppe (props: InnsatsgruppeProps) {
    const {handleKonklusjonChanged, innsatsgruppe} = props;
    return (
        <SkjemaElement tittel="Innsatsgruppe" className="innsatsgruppe">
            {innsatsgrupper.map((innsatsgruppeObject, index) =>
                <Radio
                    key={index}
                    label={innsatsgruppeObject.label}
                    value={innsatsgruppeObject.value}
                    name="innsatsgruppe"
                    onChange={e => handleKonklusjonChanged(e.target.value)}
                    checked={innsatsgruppe === innsatsgruppeObject.value}
                    className="inputPanel radioPanel"
                />
            )}
        </SkjemaElement>
    );
}

export default Innsatsgruppe;
