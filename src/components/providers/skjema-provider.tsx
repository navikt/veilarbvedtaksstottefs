import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { mergeMedDefaultOpplysninger } from '../skjema/skjema-utils';
import { HovedmalType } from '../skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../skjema/innsatsgruppe/innsatsgruppe';
import { Opplysning } from '../skjema/opplysninger/opplysninger';
import { useFetchState } from './fetch-provider';

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
    setOpplysninger: Dispatch<SetStateAction<Opplysning[]>>;
    setHovedmal: Dispatch<SetStateAction<HovedmalType|undefined>>;
    setInnsatsgruppe: Dispatch<SetStateAction<InnsatsgruppeType|undefined>>;
    setBegrunnelse: Dispatch<SetStateAction<string>>;
    setSistOppdatert: Dispatch<SetStateAction<string>>;
}

export const SkjemaContext = React.createContext<SkjemaContextProps>({} as SkjemaContextProps);

export function SkjemaProvider(props: {children: React.ReactNode}) {
    const [vedtak] = useFetchState('vedtak');
    const [malform] = useFetchState('malform');

    const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST') || initialSkjemaData;
    const mergetOpplysninger = mergeMedDefaultOpplysninger(utkast.opplysninger,
        malform.data ? malform.data.malform : null) as Opplysning[];

    const [opplysninger, setOpplysninger] = useState<Opplysning[]>(mergetOpplysninger);
    const [hovedmal, setHovedmal] = useState(utkast.hovedmal);
    const [innsatsgruppe, setInnsatsgruppe] = useState(utkast.innsatsgruppe);
    const [begrunnelse, setBegrunnelse] = useState(utkast.begrunnelse || '');
    const [sistOppdatert, setSistOppdatert] = useState<string>('');

    useEffect(() => {
        setHovedmal(utkast.hovedmal);
        setOpplysninger(mergetOpplysninger);
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
            }}
        >
            {props.children}
        </SkjemaContext.Provider>
    );

}
