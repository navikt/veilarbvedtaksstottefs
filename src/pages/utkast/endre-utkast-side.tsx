import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { hentMalformFraData, SkjemaData } from '../../utils/skjema-utils';
import UtkastSkjema from './skjema/utkast-skjema';
import Footer from '../../components/footer/footer';
import { fetchWithInfo } from '../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo } from '../../rest/api';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { finnGjeldendeVedtak, hentId } from '../../utils';
import { useConst, useIsAfterFirstRender } from '../../utils/hooks';
import { Vedtak } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import './utkast-side.less';
import { SkjemaLagringStatus } from '../../utils/types/skjema-lagring-status';
import EndreUtkastAksjoner from './aksjoner/endre-utkast-aksjoner';
import Opplysninger from './skjema/opplysninger/opplysninger';
import Begrunnelse from './skjema/begrunnelse/begrunnelse';
import Innsatsgruppe from './skjema/innsatsgruppe/innsatsgruppe';
import Hovedmal from './skjema/hovedmal/hovedmal';

export function EndreUtkastSide() {
	const { fattedeVedtak, malform, utkast } = useDataStore();
	const { showModal } = useModalStore();
	const {
		opplysninger, hovedmal, innsatsgruppe, begrunnelse, sistOppdatert,
		setSistOppdatert, validerSkjema, validerBegrunnelseLengde, lagringStatus,
		setLagringStatus
	} = useSkjemaStore();

	const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);
	const isAfterFirstRender = useIsAfterFirstRender();

	const oppdaterUtkast = useConst(debounce((skjema: SkjemaData) => {
		const malformType = hentMalformFraData(malform);

		setLagringStatus(SkjemaLagringStatus.LAGRER);
		fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo({ vedtakId: hentId(utkast), skjema, malform: malformType }))
			.then(() => {
				setLagringStatus(SkjemaLagringStatus.ALLE_ENDRINGER_LAGRET);
				setSistOppdatert(new Date().toISOString());
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_LAGRING);
				setLagringStatus(SkjemaLagringStatus.LAGRING_FEILET);
			});
	}, 3000));

	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };

	useEffect(() => {
		// Initialiser når utkastet åpnes
		setLagringStatus(SkjemaLagringStatus.INGEN_ENDRING);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (harForsoktAttSende) {
			validerSkjema(finnGjeldendeVedtak(fattedeVedtak));
		} else {
			validerBegrunnelseLengde();
		}

		if (isAfterFirstRender) {
			if (lagringStatus !== SkjemaLagringStatus.ENDRING_IKKE_LAGRET) {
				setLagringStatus(SkjemaLagringStatus.ENDRING_IKKE_LAGRET);
			}

			oppdaterUtkast(vedtakskjema);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opplysninger, begrunnelse, innsatsgruppe, hovedmal]);

	useEffect(() => {
		// Det kan bli problemer hvis gamle oppdateringer henger igjen etter at brukeren har forlatt redigeringssiden.
		// Oppdateringen kan f.eks bli sendt etter at vedtaket har blitt fattet, eller at utkastet blir oppdatert med gammel data.
		return oppdaterUtkast.cancel;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="utkast-side page--grey">
			<UtkastSkjema utkast={utkast as Vedtak} sistOppdatert={sistOppdatert}>
				<form className="utkast-side__form">
					<Opplysninger />
					<Begrunnelse />
					<Innsatsgruppe />
					<Hovedmal />
				</form>
			</UtkastSkjema>
			<Footer>
				<EndreUtkastAksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => setHarForsoktAttSende(true)} />
			</Footer>
		</div>
	);
}
