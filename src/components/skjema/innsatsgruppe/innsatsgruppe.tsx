import * as React from 'react';
import { RadioPanel, SkjemaGruppe } from 'nav-frontend-skjema';
import './innsatsgruppe.less';
import { OrNothing } from '../../../utils/types/ornothing';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { utkastetSkalKvalitetssikrets } from '../skjema-utils';

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
        label: 'Standard innsats (Gode muligheter)',
        value: InnsatsgruppeType.STANDARD_INNSATS
    },
    {
        label: 'Situasjonsbestemt innsats (Trenger veiledning)',
        value: InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS,
    },
    {
        label: 'Spesielt tilpasset innsats (Nedsatt arbeidsevne)',
        value: InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS,
    },
    {
        label: 'Delvis varig tilpasset innsats (Delvis varig nedsatt arbeidsevne)',
        value: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS
    },

    {
        label: 'Varig tilpasset innsats (Varig nedsatt arbeidsevne)',
        value: InnsatsgruppeType.VARIG_TILPASSET_INNSATS
    },

];

interface InnsatsgruppeProps {
    innsatgruppefeil?: string;
}

function Innsatsgruppe (props: InnsatsgruppeProps) {
    const {innsatsgruppe, setInnsatsgruppe} = useContext(SkjemaContext);
    const {setHovedmal} = useContext(SkjemaContext);
    const kvalitetssikresVarsel = utkastetSkalKvalitetssikrets(innsatsgruppe);
    return (
        <SkjemaElement
            tittel="Innsatsgruppe"
            tittelId="innsatsgruppe-tittel"
            value={getInnsatsgruppeNavn(innsatsgruppe)}
        >
            <SkjemaGruppe feil={props.innsatgruppefeil ? {feilmelding : props.innsatgruppefeil} : undefined}>
                <InnsatsgruppeRadioButtons
                    handleInnsatsgruppeChanged={setInnsatsgruppe}
                    innsatsgruppe={innsatsgruppe}
                    setHovedmal={setHovedmal}
                />
            </SkjemaGruppe>
            {kvalitetssikresVarsel &&
            <AlertStripeAdvarsel className="innsatsgruppe-advarsel">
                    Ved <i>delvis varig tilpasset innsats</i> og <i>varig tilpasset innsats</i> må arbeidsevnevurderingen godkjennes av beslutter etter gjeldende rutine.
            </AlertStripeAdvarsel>
            }
        </SkjemaElement>
    );
}

export default Innsatsgruppe;

interface InnsatsgruppeRadioProps {
    handleInnsatsgruppeChanged: (e: any) => void;
    setHovedmal: (e: any) => void;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
}

function InnsatsgruppeRadioButtons (props: InnsatsgruppeRadioProps ) {
    return (
        <div className="innsatsgruppe" aria-labelledby="innsatsgruppe-tittel">
            {innsatsgrupper.map((innsatsgruppeObject, index) =>
                <RadioPanel
                    key={index}
                    label={innsatsgruppeObject.label}
                    value={innsatsgruppeObject.value}
                    name="innsatsgruppe"
                    onChange={(e: any) => {
                        const innsatsgruppe = e.target.value;
                        props.handleInnsatsgruppeChanged(innsatsgruppe);
                        if (innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS) {
                            props.setHovedmal(null);
                        }
                    }}
                    checked={props.innsatsgruppe === innsatsgruppeObject.value}
                />
            )}
        </div>
    );
}
