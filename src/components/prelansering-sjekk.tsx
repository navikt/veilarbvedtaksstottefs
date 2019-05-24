import React, { PropsWithChildren } from 'react';
import { useFetch } from '../utils/hooks/useFetch';
import FeatureToggleApi, { Features, PRELANSERING_TOGGLE } from '../api/feature-toggle-api';
import { Prelansering } from '../pages/prelansering/prelansering';
import { Status } from '../utils/fetch-utils';

export function PrelanseringSjekk(props: PropsWithChildren<any>) {
    const features = useFetch<Features>(FeatureToggleApi.lagHentFeaturesConfig());

    if (features.status !== Status.DONE) {
        return null;
    }

    return features.data![PRELANSERING_TOGGLE] ? <Prelansering/> : props.children;
}
