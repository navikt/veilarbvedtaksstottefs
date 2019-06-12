import React, { useState } from 'react';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Undertittel } from 'nav-frontend-typografi';
import svaertBraBilde from './svaert_bra.svg';
import svaertDarligBilde from './svaert_darlig.svg';
import hjerteBilde from '../hjerte.svg';
import ImageButton from '../../../components/image-button/image-button';
import { logEvent } from '../../../utils/frontend-logger';
import { APP_NAME } from '../../../utils/constants';
import './tilbakemelding-ekspanderbartpanel.less';

interface TilbakemeldingEkspanderbartpanelProps {
    tittel: string;
    bilde: string;
    tilbakemeldingTag?: string;
    children?: React.ReactNode;
}

export type TilbakemeldingValg = 'JA' | 'NEI';

const LOCAL_STORAGE_PREFIX = 'prelansering_tilbakemelding_';

function TilbakemeldingEkspanderbartpanel(props: TilbakemeldingEkspanderbartpanelProps) {
    const localStorageName = LOCAL_STORAGE_PREFIX + props.tilbakemeldingTag;
    const harSendtTilbakemeldingTidligere = localStorage.getItem(localStorageName) != null;
    const [visTilbakemelding, setVisTilbakemelding] = useState(!harSendtTilbakemeldingTidligere);

    const handleTilbakemeldingValgClicked = (valg: TilbakemeldingValg) => {
        localStorage.setItem(localStorageName, 'true');
        setVisTilbakemelding(false);
        logEvent(`${APP_NAME}.tilbakemeldinger.info-om-ny-losning`, { tag: props.tilbakemeldingTag, valg });
    };

    const Heading = () => (
        <div className="tilbakemelding-ekspanderbartpanel__heading">
            <img src={props.bilde} alt="Illustrasjon" className="tilbakemelding-ekspanderbartpanel__bilde"/>
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
            <div className="tilbakemelding-ekspanderbartpanel__innhold">
                {props.children}
                {visTilbakemelding &&
                    <div className="tilbakemelding-ekspanderbartpanel__tilbakemelding">
                        <Undertittel tag="h3">
                            Var dette nyttig?
                        </Undertittel>
                        <div className="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg-wrapper">
                            <ImageButton
                                src={svaertBraBilde}
                                alt="Ja"
                                onClick={() => handleTilbakemeldingValgClicked('JA')}
                                imgClassName="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg"
                            />
                            <ImageButton
                                src={svaertDarligBilde}
                                alt="Nei"
                                onClick={() => handleTilbakemeldingValgClicked('NEI')}
                                imgClassName="tilbakemelding-ekspanderbartpanel__tilbakemelding--valg"
                            />
                        </div>
                    </div>
                }
            </div>
        </EkspanderbartpanelBase>
    );
}

export default TilbakemeldingEkspanderbartpanel;
