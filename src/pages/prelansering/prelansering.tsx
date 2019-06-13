import React, { useState } from 'react';
import { logEvent } from '../../utils/frontend-logger';
import Page from '../page/page';
import Innspill from './innspill';
import PrelanseringInfo from './prelansering-info';
import TakkMelding from './takk-melding';
import { LosningInfo } from './losning-info/losning-info';
import { useFetchState } from '../../components/providers/fetch-provider';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../../api/feature-toggle-api';
import './prelansering.less';

const FRITEKST_MAX_LENGTH = 500;
const HAR_SENDT_INNSPILL_KEY = 'har_sendt_innspill';
const INNSPILL_TAG = 'veilarbvedtaksstottefs.innspill';

export function Prelansering() {
    const [harSendt, setHarSendt] = useState(false);
    const [faneNavn, setFaneNavn] = useState(null);
    const [fritekst, setFritekst] = useState('');
    const [features] = useFetchState('features');
    const harSendtTidligere = localStorage.getItem(HAR_SENDT_INNSPILL_KEY) != null;

    const handleFaneNavnChanged = (e: any) => {
        setFaneNavn(e.target.value);
    };

    const handleFritekstChanged = (e: any) => {
        let tekst = e.target.value;
        if (tekst.length > FRITEKST_MAX_LENGTH) {
            tekst = tekst.substr(0, FRITEKST_MAX_LENGTH);
        }
        setFritekst(tekst);
    };

    const handleSendInnspillClicked = () => {
        if (faneNavn || fritekst !== '') {
            logEvent(INNSPILL_TAG, { faneNavn, fritekst});
        }

        setHarSendt(true);
        localStorage.setItem(HAR_SENDT_INNSPILL_KEY, 'true');
    };

    return (
        <Page>
            <PrelanseringInfo/>
            {features.data[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && <LosningInfo/>}
            {harSendt && <TakkMelding/>}
            {harSendtTidligere || harSendt ? null :
                <Innspill
                    faneNavn={faneNavn}
                    fritekst={fritekst}
                    handleFaneNavnChanged={handleFaneNavnChanged}
                    handleFritekstChanged={handleFritekstChanged}
                    handleSendInnspillClicked={handleSendInnspillClicked}
                />}
        </Page>
    );
}
