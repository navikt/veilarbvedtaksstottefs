import React, { useContext, useEffect, useState } from 'react';
import { mapTilTekstliste, skjemaIsNotEmpty, validerSkjema } from '../../components/skjema/skjema-utils';
import { OrNothing } from '../../utils/types/ornothing';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import Skjema from '../../components/skjema/skjema';
import Page from '../page/page';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import { SkjemaFeil } from '../../utils/types/skjema-feil';
import SkjemaHeader from '../../components/skjema/header/skjema-header';
import { VedtakData } from '../../rest/data/vedtak';
import './vedtakskjema-side.less';
import { useFetchStore } from '../../stores/fetch-store';
import { fetchWithInfo } from '../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo, lagSlettUtkastFetchInfo } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, View } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';

export interface SkjemaData {
    opplysninger: string[] | undefined;
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: string;
}

export function VedtakskjemaSide() {
    const { fnr } = useAppStore();
    const { vedtak } = useFetchStore();
    const { changeView } = useViewStore();
    const { showModal } = useModalStore();
    const {
        opplysninger, begrunnelse, innsatsgruppe,
        hovedmal, sistOppdatert, setSistOppdatert
    } = useSkjemaStore();

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
                showModal(ModalType.VEDTAK_LAGRET_SUKSESS);
            })
            .catch(() => {
                showModal(ModalType.FEIL_VED_LAGRING);
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
