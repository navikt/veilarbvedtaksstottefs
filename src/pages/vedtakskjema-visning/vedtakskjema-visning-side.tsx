import React, { useContext } from 'react';
import { ViewDispatch } from '../../components/providers/view-provider';
import { VedtakData } from '../../rest/data/vedtak';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import Page from '../page/page';
import Card from '../../components/card/card';
import SkjemaHeader from '../../components/skjema/header/skjema-header';
import Footer from '../../components/footer/footer';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SkjemaVisning } from '../../components/skjema-visning/skjema-visning';
import { useFetchStoreContext } from '../../stores/fetch-store';
import './vedtakskjema-visning-side.less';

export function VedtakskjemaVisningSide(props: { id: number }) {
    const { vedtak } = useFetchStoreContext();
    const {dispatch} = useContext(ViewDispatch);
    const vistVedtak = vedtak.data.find((v: VedtakData) => v.id === props.id);

    if (!vistVedtak) {
        return (
            <AlertStripeFeil>
                Fant ikke vedtak å fremvise
            </AlertStripeFeil>
        );
    }

    return (
        <Page>
            <Card className="vedtakskjema-visning">
                <SkjemaHeader vedtak={vistVedtak}/>
                <SkjemaVisning vedtak={vistVedtak}/>
            </Card>
            <Footer className="vedtakskjema-visning__footer">
                <div className="vedtakskjema-visning__aksjoner">
                    <Hovedknapp
                        mini={true}
                        onClick={() => dispatch({view: ActionType.VIS_VEDTAK_PDF, props: {vedtakId: vistVedtak.id}})}
                    >
                        Vis vedtaksbrev
                    </Hovedknapp>
                    <Knapp
                        mini={true}
                        onClick={() => dispatch({view: ActionType.HOVEDSIDE})}
                    >
                        Tilbake
                    </Knapp>
                </div>
            </Footer>
        </Page>
    );
}
