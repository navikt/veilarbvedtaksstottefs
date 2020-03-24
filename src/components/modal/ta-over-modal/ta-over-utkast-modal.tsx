import React from 'react';
import { ModalProps } from '../modal-props';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import { useModalStore } from '../../../stores/modal-store';
import { finnUtkast } from '../../../utils';
import { useAppStore } from '../../../stores/app-store';
import { useDataStore } from '../../../stores/data-store';

function TaOverUtkastModal(props: ModalProps) {
    const {fnr} = useAppStore();
    const {hideModal, showModal} = useModalStore();
    const {vedtak} = useDataStore();

    const utkast = finnUtkast(vedtak);
    const veilederNavn = utkast ? utkast.veilederNavn : undefined;

    // function handleTaOverVedtak() {
    //     const taOverVedtakFor = taOverFor ? taOverFor : 'veileder';
    //
    //     fetchWithInfo(lagTaOverUtkastFetchInfo({fnr, 'taOverFor': taOverVedtakFor}))
    //         .then(() => {
    //                 showModal(ModalType.TA_OVER_TILBAKEMELDING, {'taOverFor': taOverVedtakFor});
    //                 taOverVedtakFor === 'beslutter' ? setErInnloggetVeilederBeslutter(true) : setErInnloggetAnsvarligVeileder(true);
    //         })
    //         .catch(() => {
    //             showModal(ModalType.FEIL_VED_OVERTAKELSE);
    //         });
    // }
    //
    // function handleTaOverFor(taOverVedtakFor: string) {
    //     setTaOverFor(taOverVedtakFor);
    // }


    return (
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Bekreft taover utkast"
            onRequestClose={hideModal}
            varselIkonType={VarselIkonType.ADVARSEL}
        >
            {/*<Show if={!harBeslutter}>*/}
            {/*    <Normaltekst className="varsel-modal__tekstinnehold">*/}
            {/*        {`Vil du ta over som ansvarlig for vedtaket fra ${veilederNavn}?`}*/}
            {/*    </Normaltekst>*/}
            {/*    <div className="varsel-modal__knapper">*/}
            {/*        /!*<Hovedknapp onClick={() => handleTaOverVedtak()}>TA OVER FOR VEILEDER</Hovedknapp>*!/*/}
            {/*        <Knapp onClick={hideModal}> Avbryt</Knapp>*/}
            {/*    </div>*/}
            {/*</Show>*/}
            {/*<Show if={harBeslutter}>*/}
                {/*<div className="varsel-modal__radiopanel">*/}
                {/*    <RadioPanelGruppe*/}
                {/*        name="taovervedtakfor"*/}
                {/*        legend="Hvem ønsker du å ta over for?"*/}
                {/*        radios={[*/}
                {/*            {label: 'Veileder', value: 'veileder'},*/}
                {/*            {label: 'Beslutter', value: 'beslutter'}*/}
                {/*        ]}*/}
                {/*        onChange={(e: any) => taOverModalProps.handleTaOverFor(e.target.value)}*/}
                {/*        checked={taOverFor? taOverFor: undefined}*/}
                {/*    />*/}

                {/*    <Show if={taOverFor}>*/}
                {/*        <Hovedknapp*/}
                {/*            mini={true}*/}
                {/*            htmlType="submit"*/}
                {/*            onClick={() => taOverModalProps.handleTaOverVedtak()}*/}
                {/*            className="skjema__knapp"*/}
                {/*        >*/}
                {/*            TA OVER SOM {taOverFor && true ? taOverFor.toString().toUpperCase() : undefined}*/}
                {/*        </Hovedknapp>*/}
                {/*    </Show>*/}
                {/*</div>*/}
            {/*</Show>*/}
        </VarselModal>
    )
}

export default TaOverUtkastModal;
