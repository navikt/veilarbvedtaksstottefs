import { mapTilTekstliste, skjemaIsNotEmpty, validerSkjema } from '../../components/skjema/skjema-utils';
import VedtaksstotteApi from '../../api/vedtaksstotte-api';
import { useContext, useEffect, useState } from 'react';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import React from 'react';
import { TilbakeKnapp } from '../../components/skjema/tilbakeknapp';
import { OrNothing } from '../../utils/types/ornothing';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Skjema from '../../components/skjema/skjema';
import { SkjemaContext } from '../../components/providers/skjema-provider';
import { ViewDispatch } from '../../components/providers/view-provider';
import { useFetchState } from '../../components/providers/fetch-provider';
import { Status } from '../../utils/fetch-utils';
import Page from '../page/page';
import Card from '../../components/card/card';
import { formatDateTime } from '../../utils/date-utils';
import Footer from '../../components/footer/footer';
import { ModalViewDispatch } from '../../components/providers/modal-provider';
import { ModalActionType } from '../../components/modalcontroller/modal-reducer';

export interface SkjemaData {
    opplysninger: string[] | undefined;
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
}

interface SkjemaAksjonerProps {
    fnr: string;
}

export function VedtakskjemaSide({fnr}: SkjemaAksjonerProps) {
    const {dispatch} = useContext(ViewDispatch);
    const {modalViewDispatch} = useContext(ModalViewDispatch);
    const [vedtak, setVedtak] = useFetchState('vedtak');
    const {opplysninger, begrunnelse, innsatsgruppe, hovedmal, sistOppdatert, setSistOppdatert} = useContext(SkjemaContext);
    const [errors, setErrors] = useState<SkjemaFeil>({});
    const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);

    const vedtakskjema = {opplysninger: mapTilTekstliste(opplysninger), begrunnelse, innsatsgruppe, hovedmal};

    useEffect(() => {
        if (harForsoktAttSende) {
            const skjemaFeil = validerSkjema(vedtakskjema);
            setErrors(skjemaFeil);
            }
    }, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);

    function sendDataTilBackend(skjema: SkjemaData) {
        return VedtaksstotteApi.putVedtakUtkast(fnr, skjema);
    }

    function dispatchFetchVedtakOgRedirectTilHovedside() {
        setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
        dispatch({view: ActionType.HOVEDSIDE});
    }

    function handleLagreOgTilbake(e: any, skjema: SkjemaData) {
        e.preventDefault();
        sendDataTilBackend(skjema)
            .then(() => {
                dispatchFetchVedtakOgRedirectTilHovedside();
                modalViewDispatch({modalView: ModalActionType.MODAL_VEDTAK_LAGRET_SUKSESS});
            })
            .catch(error => {
                console.log(error); // tslint:disable-line:no-console
            });
    }

    function handleSlett() {
        VedtaksstotteApi.slettUtkast(fnr)
            .then(dispatchFetchVedtakOgRedirectTilHovedside)
            .catch(error => {
                console.log(error); // tslint:disable-line:no-console
            });
    }

    function oppdaterSistEndret(skjema: SkjemaData) {
        if (skjemaIsNotEmpty(skjema)) {
            sendDataTilBackend(skjema).then(() => {
                setSistOppdatert(new Date().toISOString());
            });
        }
    }

    function handleSubmit(e: any, skjema: SkjemaData) {
        e.preventDefault();
        setHarForsoktAttSende(true);
        const skjemaFeil = validerSkjema(skjema);
        if (Object.entries(skjemaFeil).filter(feilmelding => feilmelding).length > 0) {
            setErrors(skjemaFeil);
            return;
        }
        sendDataTilBackend(skjema).then(() => {
            setVedtak(prevState => ({...prevState, status: Status.NOT_STARTED}));
            dispatch({view: ActionType.INNSENDING});
        }).catch(error => {
            console.log(error); // tslint:disable-line:no-console
        });
    }

    return (
        <Page>
            <div className="skjema">
                <form onSubmit={(e) => handleSubmit(e, vedtakskjema)}>
                    <Card>
                        <div className="skjema__topp">
                            {sistOppdatert &&
                            <Normaltekst>{`Sist lagret : ${formatDateTime(sistOppdatert)}`}</Normaltekst>}
                        </div>
                        <Systemtittel className="skjema__tittel">
                            Oppfølgingsvedtak (§ 14a)
                        </Systemtittel>
                        <Skjema errors={errors} oppdaterSistEndret={oppdaterSistEndret}/>
                    </Card>
                    <Footer>
                        <Aksjoner
                            handleSubmit={(e) => handleSubmit(e, vedtakskjema)}
                            handleLagreOgTilbake={(e) => handleLagreOgTilbake(e, vedtakskjema)}
                            handleSlett={handleSlett}
                        />
                    </Footer>
                </form>
            </div>
        </Page>
    );
}
