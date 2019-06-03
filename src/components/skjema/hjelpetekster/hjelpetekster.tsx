import React, { PropsWithChildren } from 'react';
import './hjelpetekster.less';
import { ReactComponent as InfoSirkelIkon } from './info-sirkel.svg';

export function Hjelpetekster (props: PropsWithChildren<{}>) {
    return (
        <section className="hjelpetekster">
            <div className="hjelpetekster__header blokk-xs">
                <InfoSirkelIkon/>
                <h4 className="hjelpetekster__tittel">Tips</h4>
            </div>
            {props.children}
        </section>
    );
}
