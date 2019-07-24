import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';
import { VedtakData } from '../rest/data/vedtak';
import { mergeMedDefaultOpplysninger } from '../components/skjema/skjema-utils';
import { HovedmalType } from '../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../components/skjema/innsatsgruppe/innsatsgruppe';
import { Opplysning } from '../components/skjema/opplysninger/opplysninger';
import { useFetchStoreContext } from './fetch-store';

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
    const { vedtak, malform } = useFetchStoreContext();

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
