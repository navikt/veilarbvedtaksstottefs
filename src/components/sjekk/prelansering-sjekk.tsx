import React, { PropsWithChildren } from 'react';
import { Prelansering } from '../../pages/prelansering/prelansering';
import { useFetchState } from '../providers/fetch-provider';
import { PRELANSERING_TOGGLE } from '../../api/feature-toggle-api';

export function PrelanseringSjekk(props: PropsWithChildren<any>) {
    const [features] = useFetchState('features');
    return features.data![PRELANSERING_TOGGLE] ? <Prelansering/> : props.children;
}
