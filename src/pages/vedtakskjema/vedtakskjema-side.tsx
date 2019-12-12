import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { hentMalformFraData } from '../../components/skjema/skjema-utils';
import { OrNothing } from '../../utils/types/ornothing';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
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
import { finnUtkastAlltid } from '../../utils';
import { useConst, useIsAfterFirstRender } from '../../utils/hooks';
import './vedtakskjema-side.less';
import { InnsatsgruppeType } from '../../rest/data/vedtak';

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
		opplysninger, hovedmal, innsatsgruppe, begrunnelse,
		sistOppdatert, setSistOppdatert, validerSkjema,
		validerBegrunnelseLengde
	} = useSkjemaStore();

	const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);
	const isAfterFirstRender = useIsAfterFirstRender();
	const oppdaterSistEndret = useConst(debounce((skjema: SkjemaData) => {
		const malformType = hentMalformFraData(malform.data);

		fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo({ fnr, skjema, malform: malformType }))
			.then(() => {
				setSistOppdatert(new Date().toISOString());
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}, 3000));

	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };

	useEffect(() => {
		if (harForsoktAttSende) {
			validerSkjema();
		} else {
			validerBegrunnelseLengde();
		}

		if (isAfterFirstRender) {
			oppdaterSistEndret(vedtakskjema);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);

	useEffect(() => {
		// Det kan bli problemer hvis gamle oppdateringer henger igjen etter at brukeren har forlatt redigeringssiden.
		// Oppdateringen kan f.eks bli sendt etter at vedtaket har blitt fattet, eller at utkastet blir oppdatert med gammel data.
		return oppdaterSistEndret.cancel;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Page>
			<Card className="vedtakskjema">
				<SkjemaHeader vedtak={finnUtkastAlltid(vedtak.data)} sistOppdatert={sistOppdatert} />
				<Skjema />
			</Card>
			<Footer className="vedtakskjema__footer">
				<Aksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => setHarForsoktAttSende(true)} />
			</Footer>
		</Page>
	);
}
