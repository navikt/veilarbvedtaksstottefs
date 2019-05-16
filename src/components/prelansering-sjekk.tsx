import React, { PropsWithChildren } from 'react';
import useFetch, { Status } from '../utils/hooks/useFetch';
import FeatureToggleApi, { Features, PRELANSERING_TOGGLE } from '../api/feature-toggle-api';
import { Prelansering } from '../pages/prelansering/prelansering';

export function PrelanseringSjekk(props: PropsWithChildren<any>) {
    const features = useFetch<Features>(FeatureToggleApi.lagHentFeaturesConfig());

    console.log(features); // tslint:disable-line'

    if (features.status !== Status.DONE) {
        return null;

    }

    return features.data![PRELANSERING_TOGGLE] ? <Prelansering/> : props.children;
}
