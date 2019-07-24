import {
    mapTilTekstliste,
    skjemaIsNotEmpty,
    validerSkjema
} from '../../components/skjema/skjema-utils';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { OrNothing } from '../../utils/types/ornothing';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import Skjema from '../../components/skjema/skjema';
import { SkjemaContext } from '../../stores/skjema-provider';
import Page from '../page/page';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import { ModalViewDispatch } from '../../stores/modal-provider';
import { ModalActionType } from '../../stores/modal-reducer';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import { feilVidLagring } from '../../components/modal/feil-modal-tekster';
import SkjemaHeader from '../../components/skjema/header/skjema-header';
import { VedtakData } from '../../rest/data/vedtak';
import './vedtakskjema-side.less';
import { useFetchStoreContext } from '../../stores/fetch-store';
import { fetchWithInfo } from '../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo, lagSlettUtkastFetchInfo } from '../../rest/api';
import { useAppStoreContext } from '../../stores/app-store';
import { useViewStoreContext, View } from '../../stores/view-store';

export interface SkjemaData {
    opplysninger: string[] | undefined;
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
}

export function VedtakskjemaSide() {
    const { fnr } = useAppStoreContext();
    const { vedtak } = useFetchStoreContext();
    const { changeView } = useViewStoreContext();
    const {modalViewDispatch} = useContext(ModalViewDispatch);
    const {opplysninger, begrunnelse, innsatsgruppe, hovedmal, sistOppdatert, setSistOppdatert} = useContext(SkjemaContext);
    const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);
    const [skjemaFeil, setSkjemaFeil] = useState<SkjemaFeil>({});

    const utkast = vedtak.data.find(v => v.vedtakStatus === 'UTKAST') as VedtakData;
    const vedtakskjema = {opplysninger: mapTilTekstliste(opplysninger), begrunnelse, innsatsgruppe, hovedmal};

    useEffect(() => {
        if (harForsoktAttSende) {
            const errors = validerSkjema(vedtakskjema);
            setSkjemaFeil(errors);
        }
    }, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);

    function sendDataTilBackend(skjema: SkjemaData) {
        return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo({ fnr, skjema }));
    }

    function dispatchFetchVedtakOgRedirectTilHovedside() {
        vedtak.fetch({ fnr });
        changeView(View.HOVEDSIDE);
    }

    function oppdaterSistEndret(skjema: SkjemaData) {
        if (skjemaIsNotEmpty(skjema)) {
            sendDataTilBackend(skjema).then(() => {
                setSistOppdatert(new Date().toISOString());
            });
        }
    }

    function handleForhandsvis(skjema: SkjemaData) {
        setHarForsoktAttSende(true);
        const errors = validerSkjema(skjema);
        if (Object.entries(errors).filter(feilmelding => feilmelding).length > 0) {
            setSkjemaFeil(errors);
            return;
        }

        sendDataTilBackend(skjema).then(() => {
            vedtak.fetch({ fnr });
            changeView(View.INNSENDING);
        }).catch(error => {
            console.log(error); // tslint:disable-line:no-console
        });
    }

    function handleLagreOgTilbake(skjema: SkjemaData) {
        sendDataTilBackend(skjema)
            .then(() => {
                dispatchFetchVedtakOgRedirectTilHovedside();
                modalViewDispatch({modalView: ModalActionType.MODAL_VEDTAK_LAGRET_SUKSESS});
            })
            .catch(() => {
                modalViewDispatch({modalView: ModalActionType.MODAL_FEIL, props: feilVidLagring});
            });
    }

    function handleSlett() {
        fetchWithInfo(lagSlettUtkastFetchInfo({fnr}))
            .then(dispatchFetchVedtakOgRedirectTilHovedside)
            .catch(error => {
                console.log(error); // tslint:disable-line:no-console
            });
    }

    return (
        <Page>
            <Card className="vedtakskjema">
                <SkjemaHeader vedtak={utkast} sistOppdatert={sistOppdatert}/>
                <Skjema errors={skjemaFeil} oppdaterSistEndret={oppdaterSistEndret}/>
            </Card>
            <Footer className="vedtakskjema__footer">
                <Aksjoner
                    handleForhandsvis={() => handleForhandsvis(vedtakskjema)}
                    handleLagreOgTilbake={() => handleLagreOgTilbake(vedtakskjema)}
                    handleSlett={handleSlett}
                />
            </Footer>
        </Page>
    );
}
