import React from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import svaertBraBilde from './svaert_bra.svg';
import svaertDarligBilde from './svaert_darlig.svg';
import hjerteBilde from '../hjerte.svg';
import './info-ekspanderbartpanel.less';

interface InfoEkspanderbartpanelProps {
    tittel: string;
    children?: React.ReactNode;
}

function InfoEkspanderbartpanel(props: InfoEkspanderbartpanelProps) {

    const Heading = () => (
        <div className="info-ekspanderbartpanel__heading">
            <img src={hjerteBilde} alt="Illustrasjon" className="info-ekspanderbartpanel__bilde"/>
            <h2 className="ekspanderbartPanel__heading">
                {props.tittel}
            </h2>
        </div>
    );

    return (
        <EkspanderbartpanelBase
            heading={<Heading/>}
            border={true}
            ariaTittel={props.tittel}
        >
            <div className="info-ekspanderbartpanel__innhold">
                {props.children}
                <div className="info-ekspanderbartpanel__tilbakemelding">
                    <Undertittel>
                        Var dette nyttig?
                    </Undertittel>
                    <div className="info-ekspanderbartpanel__tilbakemelding--valg-wrapper">
                        <img src={svaertBraBilde} alt="Ja" className="info-ekspanderbartpanel__tilbakemelding--valg"/>
                        <img src={svaertDarligBilde} alt="Nei" className="info-ekspanderbartpanel__tilbakemelding--valg"/>
                    </div>
                </div>
            </div>
        </EkspanderbartpanelBase>
    );
}

export default InfoEkspanderbartpanel;
