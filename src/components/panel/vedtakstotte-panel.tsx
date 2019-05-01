import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import classNames from 'classnames' ;
import './panel.less' ;
export function VedtakstottePanel (props: {tittel: string, children: React.ReactNode, className?: string}) {

    const className = classNames('vedtakstottepanel', props.className);

    return (
        <div className={className}>
            <div className="vedtakstottepanel__tittel">
                <Undertittel>{props.tittel}</Undertittel>
            </div>
            <div className="vedtakstottepanel__content">
                {props.children}
            </div>
        </div>
    );
}