import React, { PropsWithChildren } from 'react';
import { Prelansering } from '../../pages/prelansering/prelansering';
import { PRELANSERING_TOGGLE } from '../../rest/data/features';
import { useFetchStoreContext } from '../../stores/fetch-store';

export function PrelanseringSjekk(props: PropsWithChildren<any>) {
    const { features} = useFetchStoreContext();
    return features.data![PRELANSERING_TOGGLE] ? <Prelansering/> : props.children;
}
