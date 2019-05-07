import React from 'react';
import { Element, Undertittel } from 'nav-frontend-typografi';
import classNames from 'classnames';
import './skjemaelement.less';

export function SkjemaElement (props: {tittel: string, children: React.ReactNode, className?: string}) {
    const className = classNames('skjemaelement__innhold', props.className);
    return(
        <div className="veilarbvedtaksstottefs__skjemaelement">
            <Element>{`${props.tittel}:`}</Element>
            <div className={className}>
                {props.children}
            </div>
        </div>
    );
}