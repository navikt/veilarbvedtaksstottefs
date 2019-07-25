import React, { useEffect } from 'react';
import Opplysninger, { Opplysning } from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { useTimer } from '../../utils/hooks/use-timer';
import { mapTilTekstliste, mergeMedDefaultOpplysninger } from './skjema-utils';
import { SkjemaData } from '../../pages/vedtakskjema/vedtakskjema-side';
import { useSkjemaStore } from '../../stores/skjema-store';
import './skjema.less';
import { hasData } from '../../rest/utils';
import { useFetchStore } from '../../stores/fetch-store';
import { VedtakData } from '../../rest/data/vedtak';

interface SkjemaProps {
    oppdaterSistEndret: (skjema: SkjemaData) => void;
}

function Skjema({oppdaterSistEndret}: SkjemaProps) {
    const { vedtak, malform } = useFetchStore();
    const {
        opplysninger, setOpplysninger,
        hovedmal, setHovedmal,
        innsatsgruppe, setInnsatsgruppe,
        begrunnelse, setBegrunnelse,
        setSistOppdatert
    } = useSkjemaStore();

    useEffect(() => {

        if (hasData(vedtak) && hasData(malform)) {
            const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');

            if (utkast) {
                const mergetOpplysninger = mergeMedDefaultOpplysninger(utkast.opplysninger,
                    malform.data ? malform.data.malform : null) as Opplysning[];

                setHovedmal(utkast.hovedmal);
                setOpplysninger(mergetOpplysninger);
                setInnsatsgruppe(utkast.innsatsgruppe);
                setBegrunnelse(utkast.begrunnelse);
                setSistOppdatert(utkast.sistOppdatert);
            }
        }

    }, [vedtak.status, malform.status]);

    const vedtakskjema = {opplysninger: mapTilTekstliste(opplysninger), begrunnelse, innsatsgruppe, hovedmal};

    useTimer(() => {
        oppdaterSistEndret(vedtakskjema)
    }, 2000, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);

    return (
        <form>
            <Opplysninger />
            <Begrunnelse />
            <Innsatsgruppe />
            <Hovedmal />
        </form>
    );
}

export default Skjema;
