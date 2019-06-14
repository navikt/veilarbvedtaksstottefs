import React, { useContext } from 'react';
import Opplysninger from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';
import './skjema.less';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { useTimer } from '../../utils/hooks/useTimer';
import { SkjemaContext } from '../providers/skjema-provider';
import { mapTilTekstliste } from './skjema-utils';
import { SkjemaData } from '../../pages/vedtakskjema/vedtakskjema-side';

interface SkjemaProps {
    errors: SkjemaFeil;
    oppdaterSistEndret: (skjema: SkjemaData) => void;
}

function Skjema ({errors, oppdaterSistEndret}: SkjemaProps) {
    const {opplysninger, begrunnelse, innsatsgruppe, hovedmal} = useContext(SkjemaContext);

    const vedtakskjema = {opplysninger: mapTilTekstliste(opplysninger), begrunnelse, innsatsgruppe, hovedmal};

    useTimer(() => oppdaterSistEndret(vedtakskjema), 2000, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);
    return (
        <form>
            <Opplysninger opplysningerfeil={errors.opplysninger}/>
            <Begrunnelse begrunnelsefeil={errors.begrunnelse}/>
            <Innsatsgruppe innsatgruppefeil={errors.innsatsgruppe}/>
            <Hovedmal hovedmalfeil={errors.hovedmal}/>
        </form>
    );
}

export default Skjema;
