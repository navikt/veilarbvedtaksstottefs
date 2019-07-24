import React from 'react';
import { VedtakData } from '../../rest/data/vedtak';
import Page from '../page/page';
import Card from '../../components/card/card';
import SkjemaHeader from '../../components/skjema/header/skjema-header';
import Footer from '../../components/footer/footer';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SkjemaVisning } from '../../components/skjema-visning/skjema-visning';
import { useFetchStoreContext } from '../../stores/fetch-store';
import './vedtakskjema-visning-side.less';
import { useViewStoreContext, View } from '../../stores/view-store';

export function VedtakskjemaVisningSide(props: { vedtakId: number }) {
    const { vedtak } = useFetchStoreContext();
    const { changeView } = useViewStoreContext();
    const vistVedtak = vedtak.data.find((v: VedtakData) => v.id === props.vedtakId);

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
                        onClick={() => changeView(View.VEDTAK_PDF, { vedtakId: vistVedtak.id})}
                    >
                        Vis vedtaksbrev
                    </Hovedknapp>
                    <Knapp
                        mini={true}
                        onClick={() => changeView(View.HOVEDSIDE)}
                    >
                        Tilbake
                    </Knapp>
                </div>
            </Footer>
        </Page>
    );
}
