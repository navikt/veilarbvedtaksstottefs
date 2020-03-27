import { AksjonType } from './aksjonType';
import { useDataFetcherStore } from '../../../../../stores/data-fetcher-store';

export function lagSystemMelding(aksjonType: AksjonType, innloggetVeileder: string): string {


    const {innloggetVeilederFetcher} = useDataFetcherStore();
    const innloggetVeilederNavn = innloggetVeilederFetcher.data.navn;

    switch (aksjonType) {
        case AksjonType.KLAR_TIL_BESLUTTER :
            return 'Utkast klar for beslutter';
        case AksjonType.BLI_BESLUTTER :
            return `${innloggetVeileder} er beslutter`;
        case AksjonType.TA_OVER_SOM_BESLUTTER :
            return `${innloggetVeileder} er ny beslutter`;
        case AksjonType.TA_OVER_SOM_VEILEDER :
            return `${innloggetVeileder} er ny ansvarlig veileder`;
        case AksjonType.KVALIFISERT :
            return `Kvalifisert av ${innloggetVeileder}`;
        case AksjonType.OPPRETTET_UKAST :
            return `${innloggetVeileder} opprettet utkast`;
        default :
            return '';

    }
}