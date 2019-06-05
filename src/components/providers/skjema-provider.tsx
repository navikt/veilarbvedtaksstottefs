import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { mergeMedDefaultOpplysninger } from '../skjema/skjema-utils';
import { HovedmalType } from '../skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../skjema/innsatsgruppe/innsatsgruppe';
import { Opplysning } from '../skjema/opplysninger/opplysninger';
import { useFetchState } from './fetch-provider';
import { SkjemaFeil } from '../../utils/types/skjema-feil';

const initialSkjemaData = {
    opplysninger: undefined,
    hovedmal: undefined,
    innsatsgruppe: undefined,
    begrunnelse: '',
    sistOppdatert: '',
};

interface SkjemaContextProps {
    opplysninger: Opplysning[];
    hovedmal: HovedmalType | undefined;
    innsatsgruppe: InnsatsgruppeType | undefined ;
    begrunnelse: string;
    sistOppdatert: string;
    skjemaFeil: SkjemaFeil;
    setOpplysninger: Dispatch<SetStateAction<Opplysning[]>>;
    setHovedmal: Dispatch<SetStateAction<HovedmalType|undefined>>;
    setInnsatsgruppe: Dispatch<SetStateAction<InnsatsgruppeType|undefined>>;
    setBegrunnelse: Dispatch<SetStateAction<string>>;
    setSistOppdatert: Dispatch<SetStateAction<string>>;
    setSkjemaFeil: Dispatch<SetStateAction<SkjemaFeil>>;
}

export const SkjemaContext = React.createContext<SkjemaContextProps>({} as SkjemaContextProps);

export function SkjemaProvider(props: {children: React.ReactNode}) {
    const [vedtak] = useFetchState('vedtak');
    const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST') || initialSkjemaData;

    const [opplysninger, setOpplysninger] = useState<Opplysning[]>(mergeMedDefaultOpplysninger(utkast.opplysninger) as Opplysning[]);
    const [hovedmal, setHovedmal] = useState(utkast.hovedmal);
    const [innsatsgruppe, setInnsatsgruppe] = useState(utkast.innsatsgruppe);
    const [begrunnelse, setBegrunnelse] = useState(utkast.begrunnelse || '');
    const [sistOppdatert, setSistOppdatert] = useState<string>('');
    const [skjemaFeil, setSkjemaFeil] = useState<SkjemaFeil>({});

    useEffect(() => {
        setHovedmal(utkast.hovedmal);
        setOpplysninger(mergeMedDefaultOpplysninger(utkast.opplysninger) as Opplysning[]);
        setInnsatsgruppe(utkast.innsatsgruppe);
        setBegrunnelse(utkast.begrunnelse || '');
        setSistOppdatert(utkast.sistOppdatert || '');
    }, [utkast]);

    return (
        <SkjemaContext.Provider
            value={{
                opplysninger,
                setOpplysninger,
                hovedmal,
                setHovedmal,
                innsatsgruppe,
                setInnsatsgruppe,
                begrunnelse,
                setBegrunnelse,
                sistOppdatert,
                setSistOppdatert,
                skjemaFeil,
                setSkjemaFeil,
            }}
        >
            {props.children}
        </SkjemaContext.Provider>
    );

}
