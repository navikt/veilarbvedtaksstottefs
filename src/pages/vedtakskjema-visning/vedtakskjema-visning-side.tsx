import React, { useContext } from 'react';
import { ViewDispatch } from '../../components/providers/view-provider';
import { VedtakData } from '../../utils/types/vedtak';
import { ActionType } from '../../components/viewcontroller/view-reducer';
import { useFetchState } from '../../components/providers/fetch-provider';
import Page from '../page/page';
import Card from '../../components/card/card';
import SkjemaHeader from '../../components/skjema/header/skjema-header';
import Footer from '../../components/footer/footer';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SkjemaVisning } from '../../components/skjema-visning/skjema-visning';
import './vedtakskjema-visning-side.less';

export function VedtakskjemaVisningSide(props: { id: number }) {
    const [vedtak] = useFetchState('vedtak');
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
                    <Knapp
                        mini={true}
                        onClick={() => dispatch({view: ActionType.VIS_VEDTAK_PDF, props: {vedtakId: vistVedtak.id}})}
                    >
                        Vis vedtaksbrev
                    </Knapp>
                    <Flatknapp
                        mini={true}
                        onClick={() => dispatch({view: ActionType.VIS_VEDLEGG, props: {vedtakId: vistVedtak.id}})}
                    >
                        Brukerinformasjon på vedtakstidspunktet
                    </Flatknapp>
                </div>
            </Footer>
        </Page>
    );
}
