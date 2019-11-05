import React, { useEffect, useState } from 'react';
import {
	isSkjemaEmpty,
	hentMalformFraData,
	mapOpplysningerFraForskjelligMalformTilBokmal
} from '../../components/skjema/skjema-utils';
import { OrNothing } from '../../utils/types/ornothing';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import Aksjoner from '../../components/skjema/aksjoner/aksjoner';
import Skjema from '../../components/skjema/skjema';
import Page from '../page/page';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import SkjemaHeader from '../../components/skjema/header/skjema-header';
import { useFetchStore } from '../../stores/fetch-store';
import { fetchWithInfo } from '../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { useTimer } from '../../utils/hooks/use-timer';
import { finnUtkast } from '../../utils';
import './vedtakskjema-side.less';

export interface SkjemaData {
	opplysninger: string[] | undefined;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	begrunnelse: OrNothing<string>;
}

export function VedtakskjemaSide() {
	const { fnr } = useAppStore();
	const { vedtak, malform } = useFetchStore();
	const { showModal } = useModalStore();
	const {
		opplysninger,
		hovedmal,
		innsatsgruppe,
		begrunnelse,
		sistOppdatert,
		setSistOppdatert,
		validerSkjema,
		validerBegrunnelseLengde,
		initSkjema
	} = useSkjemaStore();

	const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);

	// Hvis vi er på vedtakskjema-side så skal det alltid finnes et utkast
	const utkast = finnUtkast(vedtak.data);
	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };

	function sendDataTilBackend(skjema: SkjemaData) {
		const malformType = hentMalformFraData(malform.data);
		return fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo({ fnr, skjema, malform: malformType })).catch(() => {
			showModal(ModalType.FEIL_VED_LAGRING);
		});
	}

	function oppdaterSistEndret(skjema: SkjemaData) {
		if (!isSkjemaEmpty(skjema)) {
			sendDataTilBackend(skjema).then(() => {
				setSistOppdatert(new Date().toISOString());
			});
		}
	}

	useEffect(() => {
		if (isSkjemaEmpty(vedtakskjema)) {
			const mappetOpplysninger = mapOpplysningerFraForskjelligMalformTilBokmal(utkast.opplysninger);
			const utkastKopi = { ...utkast, opplysninger: mappetOpplysninger };
			initSkjema(utkastKopi);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [vedtak.status]);

	useEffect(() => {
		if (harForsoktAttSende) {
			validerSkjema();
		} else {
			validerBegrunnelseLengde();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);

	useTimer(
		() => {
			oppdaterSistEndret(vedtakskjema);
		},
		2000,
		[opplysninger, begrunnelse, innsatsgruppe, hovedmal]
	);

	return (
		<Page>
			<Card className="vedtakskjema">
				<SkjemaHeader vedtak={utkast} sistOppdatert={sistOppdatert} />
				<Skjema />
			</Card>
			<Footer className="vedtakskjema__footer">
				<Aksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => setHarForsoktAttSende(true)} />
			</Footer>
		</Page>
	);
}
