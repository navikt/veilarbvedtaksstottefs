import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { hentMalformFraData } from '../../components/utkast-skjema/skjema-utils';
import { OrNothing } from '../../utils/types/ornothing';
import UtkastAksjoner from '../../components/utkast-skjema/aksjoner/utkast-aksjoner';
import UtkastSkjema from '../../components/utkast-skjema/utkast-skjema';
import Page from '../page/page';
import Card from '../../components/card/card';
import Footer from '../../components/footer/footer';
import SkjemaHeader from '../../components/utkast-skjema/header/skjema-header';
import { useFetchStore } from '../../stores/fetch-store';
import { fetchWithInfo } from '../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { finnUtkastAlltid } from '../../utils';
import { useConst, useIsAfterFirstRender } from '../../utils/hooks';
import './vedtakskjema-side.less';
import { HovedmalType, InnsatsgruppeType } from '../../rest/data/vedtak';
import { BeslutterDialog } from '../../components/beslutter-dialog/beslutter-dialog';

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
			validerSkjema(vedtak.data);
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
		<Page className="page--grey" contentClassName="vedtakskjema-side">
			<Card className="vedtakskjema">
				<SkjemaHeader utkast={finnUtkastAlltid(vedtak.data)} sistOppdatert={sistOppdatert} />
				<UtkastSkjema />
			</Card>
			<Footer className="vedtakskjema__footer">
				<UtkastAksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => setHarForsoktAttSende(true)} />
			</Footer>
		</Page>
	);
}
