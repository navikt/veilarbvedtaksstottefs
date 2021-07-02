import React from 'react';
import Page from '../../component/page/page';
import PrelanseringInfo from './prelansering-info';
import { LosningInfo } from './losning-info/losning-info';
import './prelansering.less';
import { PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../../api/veilarbpersonflatefs';
import { useAppStore } from '../../store/app-store';

export function Prelansering() {
	const { features } = useAppStore();

	return (
		<Page>
			<PrelanseringInfo />
			{features[PRELANSERING_INFO_OM_LOSNING_TOGGLE] && <LosningInfo />}
		</Page>
	);
}
