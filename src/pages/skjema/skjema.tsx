import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Card from '../../components/card/card';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Opplysninger, { OpplysningType } from '../../components/skjema/opplysninger/opplysninger';
import Hovedmal, { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import Innsatsgruppe, { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Begrunnelse from '../../components/skjema/begrunnelse/begrunnelse';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import './skjema.less';
import { OrNothing } from '../../utils/types/ornothing';
import { AppContext } from '../../components/app-provider/app-provider';
import { ViewDispatch } from '../../components/viewcontroller/view-controller';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { Status } from '../../utils/hooks/fetch-hook';
import { VedtakData } from '../../utils/types/vedtak';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import  VeilarbVedtakkstotteApi from '../../api/veilarbvedtakkstotte-api';
import { byggOpplysningliste, byggOpplysningsObject } from '../../components/skjema/skjema-utils';
import { useTimer } from '../../utils/hooks/useTimer';
import { EtikettInfo } from 'nav-frontend-etiketter';

interface SkjemaProps {
    fnr: string;
}

export type Opplysninger = {
    [K in OpplysningType]: boolean;
};

export interface SkjemaData {
    opplysninger: string[];
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
    andreOpplysninger: string[];
}

function Skjema ({fnr}: SkjemaProps) {
    const {vedtak, setVedtak} = useContext(AppContext);
    const {dispatch} = useContext(ViewDispatch);

    const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');

    const opplysningData = byggOpplysningsObject(utkast && utkast.opplysninger);
    const [opplysninger, setOpplysninger] = useState<Opplysninger>(opplysningData);
    const [hovedmal, handleHovedmalChanged] = useState( utkast && utkast.hovedmal);
    const [innsatsgruppe, handleKonklusjonChanged] = useState(utkast && utkast.innsatsgruppe);
    const [begrunnelse, handleBegrunnelseChanged] = useState(utkast && utkast.begrunnelse || '');
    const [andreOpplysninger, handleAndreopplysninger] = useState(utkast && utkast.andreopplysninger || []);
    const [sistLagret, setSistLagret] = useState('');

    useTimer(oppdaterSistEndret, 2000, [opplysninger, hovedmal, innsatsgruppe, begrunnelse, andreOpplysninger]);

    function sendDataTilBackend () {
        const skjema: SkjemaData = {opplysninger: byggOpplysningliste(opplysninger), hovedmal, innsatsgruppe, begrunnelse, andreOpplysninger};
        return VeilarbVedtakkstotteApi.putVedtakUtkast(fnr, skjema);
    }

    function oppdaterSistEndret () {
        sendDataTilBackend().then(() => {
            const date = new Date();
            const dato = date.toISOString().slice(0, 10);
            const tid = date.toLocaleTimeString('no');
            setSistLagret(`${dato} ${tid}`);
        });
    }

    function handleSubmit (e?: any) {
        e.preventDefault();
        sendDataTilBackend().then(() =>  {
            setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
            dispatch({view: ActionType.INNSENDING});
        }).catch (error => {
            console.log(error); // tslint:disable-line:no-console
        });
    }

    function handleLagreOgTilbake (e?: any) {
        e.preventDefault();
        sendDataTilBackend().then(() =>  {
            setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
            dispatch({view: ActionType.HOVEDSIDE});
        }).catch (error => {
            console.log(error); // tslint:disable-line:no-console
        });
    }

    function handleOpplysningerChanged (e: React.ChangeEvent<HTMLInputElement>) {
        e.persist();
        setOpplysninger(prevOpplysninger => {
            prevOpplysninger[e.target.name as OpplysningType] = e.target.checked;
            return prevOpplysninger;
        });
    }

    return (
        <div className="skjema">
            <div className="skjema__info">
                <TilbakeKnapp
                    tilbake={() =>  {
                        setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
                        dispatch({view: ActionType.HOVEDSIDE});
                    }}
                />
                {sistLagret && <EtikettInfo><Normaltekst>{`Sist lagret : ${sistLagret}`}</Normaltekst></EtikettInfo>}
            </div>
            <Card >
                <Systemtittel className="skjema__tittel">
                    Oppfølgingsvedtak (§ 14a)
                </Systemtittel>
                <Hovedmal
                    handleHovedmalChanged={handleHovedmalChanged}
                    hovedmal={hovedmal}
                />
                <Innsatsgruppe
                    handleKonklusjonChanged={handleKonklusjonChanged}
                    innsatsgruppe={innsatsgruppe}
                />
                <Begrunnelse
                    begrunnelseTekst={begrunnelse}
                    handleBegrunnelseChanged={handleBegrunnelseChanged}
                />
                <Opplysninger
                    handleOpplysningerChanged={handleOpplysningerChanged}
                    handleAndraOpplysningerChanged={handleAndreopplysninger}
                    andreOpplysninger={andreOpplysninger}
                />
                <Aksjoner
                    handleSubmit={handleSubmit}
                    handleLagreOgTilbake={handleLagreOgTilbake}
                />
            </Card>
        </div>
    );
}

export default Skjema;
