import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import cls from 'classnames';
import { hentMalformFraData } from '../../components/utkast-skjema/skjema-utils';
import { OrNothing } from '../../utils/types/ornothing';
import Aksjoner from '../../components/utkast-skjema/aksjoner/aksjoner';
import UtkastSkjema from '../../components/utkast-skjema/utkast-skjema';
import Footer from '../../components/footer/footer';
import SkjemaHeader from '../../components/utkast-skjema/header/skjema-header';
import { fetchWithInfo } from '../../rest/utils';
import { lagOppdaterVedtakUtkastFetchInfo } from '../../rest/api';
import { useAppStore } from '../../stores/app-store';
import { ModalType, useModalStore } from '../../stores/modal-store';
import { useSkjemaStore } from '../../stores/skjema-store';
import { finnUtkastAlltid } from '../../utils';
import { useConst, useIsAfterFirstRender } from '../../utils/hooks';
import { HovedmalType, InnsatsgruppeType } from '../../rest/data/vedtak';
import { useDataStore } from '../../stores/data-store';
import './utkast-side.less';
import { SkjemaLagringStatus } from '../../utils/types/skjema-lagring-status';

export interface SkjemaData {
	opplysninger: string[] | undefined;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	begrunnelse: OrNothing<string>;
}

export function UtkastSide() {
	const { fnr } = useAppStore();
	const { vedtak, malform } = useDataStore();
	const { showModal } = useModalStore();
	const {
		opplysninger, hovedmal, innsatsgruppe, begrunnelse, sistOppdatert,
		setSistOppdatert, validerSkjema, validerBegrunnelseLengde, lagringStatus, setLagringStatus
	} = useSkjemaStore();

	const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);
	const isAfterFirstRender = useIsAfterFirstRender();

	const oppdaterUtkast = useConst(debounce((skjema: SkjemaData) => {
		const malformType = hentMalformFraData(malform);

		setLagringStatus(SkjemaLagringStatus.LAGRER);
		fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo({ fnr, skjema, malform: malformType }))
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
			validerSkjema(vedtak);
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
            <div className="utkast-side__utkast">
                <SkjemaHeader utkast={finnUtkastAlltid(vedtak)} sistOppdatert={sistOppdatert} />
                <UtkastSkjema />
            </div>
            <Footer>
                <Aksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => setHarForsoktAttSende(true)} />
            </Footer>
        </div>
	);
}
