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
import { Sidebar } from '../../components/sidebar/sidebar';
import { useDataStore } from '../../stores/data-store';
import { useSidebarViewStore } from '../../stores/sidebar-view-store';
import './utkast-side.less';

export interface SkjemaData {
	opplysninger: string[] | undefined;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	begrunnelse: OrNothing<string>;
}

export function UtkastSide() {
	const { fnr } = useAppStore();
	const { vedtak, malform } = useDataStore();
	const { isSidebarHidden } = useSidebarViewStore();
	const { showModal } = useModalStore();
	const {
		opplysninger, hovedmal, innsatsgruppe, begrunnelse,
		setSistOppdatert, validerSkjema, validerBegrunnelseLengde
	} = useSkjemaStore();

	const [harForsoktAttSende, setHarForsoktAttSende] = useState<boolean>(false);
	const isAfterFirstRender = useIsAfterFirstRender();

	const oppdaterSistEndret = useConst(debounce((skjema: SkjemaData) => {
		const malformType = hentMalformFraData(malform);

		fetchWithInfo(lagOppdaterVedtakUtkastFetchInfo({ fnr, skjema, malform: malformType }))
			.then(() => {
				setSistOppdatert(new Date().toISOString());
			})
			.catch(() => {
				showModal(ModalType.FEIL_VED_LAGRING);
			});
	}, 3000));

	const vedtakskjema = { opplysninger, begrunnelse, innsatsgruppe, hovedmal };
	const innholdClassNames = cls('utkast-side__innhold', {
		'utkast-side__innhold--with-sidebar': !isSidebarHidden,
		'utkast-side__innhold--without-sidebar': isSidebarHidden
	});

	useEffect(() => {
		if (harForsoktAttSende) {
			validerSkjema(vedtak);
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
		<div className="utkast-side">
			<SkjemaHeader utkast={finnUtkastAlltid(vedtak)} />
			<div className={innholdClassNames}>
				<div>
					<UtkastSkjema />
					<Footer>
						<Aksjoner vedtakskjema={vedtakskjema} harForsoktForhandsvisning={() => setHarForsoktAttSende(true)} />
					</Footer>
				</div>
				<Sidebar />
			</div>
		</div>
	);
}
