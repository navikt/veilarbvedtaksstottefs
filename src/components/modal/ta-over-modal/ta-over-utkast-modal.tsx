import { ModalProps } from '../modal-props';
import { VarselIkonType, VarselModal } from '../varsel-modal/varsel-modal';
import React from 'react';
import { ModalType, useModalStore } from '../../../stores/modal-store';
import { finnUtkast} from '../../../utils';
import { useFetchStore } from '../../../stores/fetch-store';
import { fetchWithInfo } from '../../../rest/utils';
import { lagTaOverUtkastFetchInfo } from '../../../rest/api';
import { useAppStore } from '../../../stores/app-store';
import { RadioPanelGruppe} from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { useBeslutterStore } from '../../../stores/beslutter-store';
import Show from '../../show';
import { useTaOverVedtakStore } from '../../../stores/taover-stor';
import { useSkjemaTilgangStore } from '../../../stores/skjema-tilgang-store';

function TaOverUtkastModal(props: ModalProps) {

    const {fnr} = useAppStore();
    const {hideModal, showModal} = useModalStore();
    const {vedtak} = useFetchStore();
    const {harBeslutter} = useBeslutterStore();
    const {taOverFor, setTaOverFor} = useTaOverVedtakStore();
    const {setErInnloggetAnsvarligVeileder, setErInnloggetVeilederBeslutter} = useSkjemaTilgangStore();
    const utkast = finnUtkast(vedtak.data);
    const veilederNavn = utkast ? utkast.veilederNavn : undefined;

    function handleTaOverVedtak() {
        const taOverVedtakFor = taOverFor ? taOverFor : 'veileder';

        fetchWithInfo(lagTaOverUtkastFetchInfo({fnr, 'taOverFor': taOverVedtakFor}))
            .then(() => {
                    showModal(ModalType.TA_OVER_TILBAKEMELDING, {'taOverFor': taOverVedtakFor});
                    taOverVedtakFor === 'beslutter' ? setErInnloggetVeilederBeslutter(true) : setErInnloggetAnsvarligVeileder(true);
            })
            .catch(() => {
                showModal(ModalType.FEIL_VED_OVERTAKELSE);
            });
    }

    function handleTaOverFor(taOverVedtakFor: string) {
        setTaOverFor(taOverVedtakFor);
    }

    interface TaOverBeslutterVeilederModalProps {
        handleTaOverFor: (e: any) => void;
        handleTaOverVedtak: () => void;
    }

    function TaOverBeslutterVeilederModal(taOverModalProps: TaOverBeslutterVeilederModalProps) {
        return (
            <div className="varsel-modal__radiopanel">
               <RadioPanelGruppe
                    name="taovervedtakfor"  
                    legend="Hvem ønsker du å ta over for?"
                    radios={[
                        {label: 'Veileder', value: 'veileder'},
                        {label: 'Beslutter', value: 'beslutter'}
                    ]}
                    onChange={(e: any) => taOverModalProps.handleTaOverFor(e.target.value)}
                    checked={taOverFor? taOverFor: undefined}
                />

                <Show if={taOverFor}>
                    <Hovedknapp
                        mini={true}
                        htmlType="submit"
                        onClick={() => taOverModalProps.handleTaOverVedtak()}
                        className="skjema__knapp"
                    >
                        TA OVER SOM {taOverFor && true ? taOverFor.toString().toUpperCase() : undefined}
                    </Hovedknapp>
                </Show>
            </div>
        );
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        // tslint:disable-next-line:no-unused-expression
        <VarselModal
            isOpen={props.isOpen}
            contentLabel="Bekreft taover utkast"
            onRequestClose={hideModal}
            varselIkonType={VarselIkonType.ADVARSEL}
        >
            <Show if={!harBeslutter}>
                <Normaltekst className="varsel-modal__tekstinnehold">
                    {`Vil du ta over som ansvarlig for vedtaket fra ${veilederNavn}?`}
                </Normaltekst>
                <div className="varsel-modal__knapper">
                    <Hovedknapp onClick={() => handleTaOverVedtak()}>TA OVER FOR VEILEDER</Hovedknapp>
                    <Knapp onClick={hideModal}> Avbryt</Knapp>
                </div>
            </Show>
            <Show if={harBeslutter}>
                <TaOverBeslutterVeilederModal handleTaOverFor={handleTaOverFor} handleTaOverVedtak={handleTaOverVedtak}/>
            </Show>
        </VarselModal>
    )
}


export default TaOverUtkastModal;
