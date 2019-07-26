import React, { useEffect, useState } from 'react';
import {
    mapTilTekstliste,
    mergeMedDefaultOpplysninger,
    isSkjemaEmpty,
} from '../../components/skjema/skjema-utils';
import { OrNothing } from '../../utils/types/ornothing';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import Skjema from '../../components/skjema/skjema';
import Page from '../page/page';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import SkjemaHeader from '../../components/skjema/header/skjema-header';
import { VedtakData } from '../../rest/data/vedtak';
import './vedtakskjema-side.less';
import { useFetchStore } from '../../stores/fetch-store';
import { fetchWithInfo, hasData } from '../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { useTimer } from '../../utils/hooks/use-timer';

export interface SkjemaData {
    opplysninger: string[] | undefined;
    hovedmal: OrNothing<HovedmalType>;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    begrunnelse: OrNothing<string>;
}

export function VedtakskjemaSide() {
    const { fnr } = useAppStore();
    const { vedtak, malform } = useFetchStore();
    const { changeView } = useViewStore();
    const { showModal } = useModalStore();
    const {
        opplysninger, hovedmal,
        innsatsgruppe, begrunnelse,
        sistOppdatert, setSistOppdatert,
        validerSkjema, validerBegrunnelseLengde,
        initSkjema
    } = useSkjemaStore();

    const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);

    const utkast = vedtak.data.find(v => v.vedtakStatus === 'UTKAST') as VedtakData;
    const vedtakskjema = {opplysninger: mapTilTekstliste(opplysninger), begrunnelse, innsatsgruppe, hovedmal};

    useEffect(() => {

        if (hasData(vedtak) && hasData(malform) && isSkjemaEmpty(vedtakskjema)) {
            const utkast = vedtak.data.find((v: VedtakData) => v.vedtakStatus === 'UTKAST');

            if (utkast) {
                const mergetOpplysninger = mergeMedDefaultOpplysninger(utkast.opplysninger,
                    malform.data ? malform.data.malform : null);
                initSkjema(utkast, mergetOpplysninger);
            }

        }

    }, [vedtak.status, malform.status]);

    useEffect(() => {
        if (harForsoktAttSende) {
            validerSkjema();
        } else {
            validerBegrunnelseLengde();
        }

    }, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);


    useTimer(() => {
        oppdaterSistEndret(vedtakskjema);
    }, 2000, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);


    function sendDataTilBackend(skjema: SkjemaData) {
        return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo({ fnr, skjema }))
            .catch(() => {
                showModal(ModalType.FEIL_VED_LAGRING);
            });
    }

    function dispatchFetchVedtakOgRedirectTilHovedside() {
        vedtak.fetch({ fnr });
        changeView(ViewType.HOVEDSIDE);
    }

    function oppdaterSistEndret(skjema: SkjemaData) {
        if (!isSkjemaEmpty(skjema)) {
            sendDataTilBackend(skjema).then(() => {
                setSistOppdatert(new Date().toISOString());
            });
        }
    }

    function handleForhandsvis(skjema: SkjemaData) {
        setHarForsoktAttSende(true);

        if (!validerSkjema()) {
            return;
        }

        sendDataTilBackend(skjema).then(() => {
            changeView(ViewType.FORHANDSVISNING);
        });
    }

    function handleLagreOgTilbake(skjema: SkjemaData) {
        sendDataTilBackend(skjema)
            .then(() => {
                dispatchFetchVedtakOgRedirectTilHovedside();
                showModal(ModalType.VEDTAK_LAGRET_SUKSESS);
            });
    }

    return (
        <Page>
            <Card className="vedtakskjema">
                <SkjemaHeader vedtak={utkast} sistOppdatert={sistOppdatert}/>
                <Skjema />
            </Card>
            <Footer className="vedtakskjema__footer">
                <Aksjoner
                    handleForhandsvis={() => handleForhandsvis(vedtakskjema)}
                    handleLagreOgTilbake={() => handleLagreOgTilbake(vedtakskjema)}
                />
            </Footer>
        </Page>
    );
}
