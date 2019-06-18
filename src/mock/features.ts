import {
    Features, PRELANSERING_INFO_OM_LOSNING_TOGGLE,
    PRELANSERING_TOGGLE,
    STOPPE_VEDTAKSINNSENDING_TOGGLE,
    VEDTAK_I_GOSYS_TOGGLE
} from '../api/feature-toggle-api';

const features: Features = {
    [PRELANSERING_TOGGLE]: false,
    [PRELANSERING_INFO_OM_LOSNING_TOGGLE]: true,
    [VEDTAK_I_GOSYS_TOGGLE]: true,
    [STOPPE_VEDTAKSINNSENDING_TOGGLE]: false,
};

export default features;
