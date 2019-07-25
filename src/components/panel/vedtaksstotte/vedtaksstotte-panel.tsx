import React from 'react';
import cls from 'classnames';
import { Panel } from '../panel/panel';
import { Undertittel } from 'nav-frontend-typografi';
import './vedtaksstotte-panel.less';

interface VedtaksstottePanelProps {
    tittel: string;
    undertittel: string;
    imgSrc: string;
    tekstKomponent: React.ReactNode;
    knappKomponent?: React.ReactNode;
    panelKlasse?: string;
}

export function VedtaksstottePanel (props: VedtaksstottePanelProps) {
    const { tittel, undertittel, imgSrc, tekstKomponent, knappKomponent, panelKlasse } = props;
    return (
        <Panel tittel={tittel} className={cls('vedtakstottepanel', panelKlasse)}>
            <div className="vedtakstottepanel__content">
                <img src={imgSrc} className="vedtakstottepanel__ikon"/>
                <div>
                    <Undertittel className="vedtakstottepanel__undertittel">{undertittel}</Undertittel>
                    <div className="vedtakstottepanel__tekst">
                        {tekstKomponent}
                    </div>
                    {knappKomponent}
                </div>
            </div>
        </Panel>
    );
}
