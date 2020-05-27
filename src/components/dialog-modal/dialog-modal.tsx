import React, { useEffect, useMemo } from 'react';
import './dialog-modal.less'
import { useAppStore } from '../../stores/app-store';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { useDataStore } from '../../stores/data-store';
import { sortDatesAsc } from '../../utils/date-utils';
import { FetchStatus, isNotStarted } from '../../rest/utils';
import { Element } from 'nav-frontend-typografi';
import { MeldingListe } from './melding-liste/melding-liste';
import Show from '../show';
import Spinner from '../spinner/spinner';
import { Skrivefelt } from './skrivefelt/skrivefelt';
import dialogIkon from './dialog.svg';
import refreshIkon from './refresh.svg';
import lukkIkon from './lukk.svg';
import ImageButton from '../image-button/image-button';

interface DialogModalProps {
	open: boolean;
	onRequestClose: () => void;
}

export const DialogModal = (props: DialogModalProps) => {
	const { fnr } = useAppStore();
	const { meldingFetcher } = useDataFetcherStore();
	const { meldinger, innloggetVeileder } = useDataStore();

	const sorterteMeldinger = useMemo(() => {
		return [...meldinger].sort((d1, d2) => sortDatesAsc(d1.opprettet, d2.opprettet));
	}, [meldinger]);

	function handleRefreshClicked() {
		meldingFetcher.fetch({ fnr });
	}

	useEffect(() => {
		if (isNotStarted(meldingFetcher)) {
			// Dette blir plukket opp av DialogMeldingerSync
			meldingFetcher.fetch({ fnr });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [meldingFetcher.status]);

	if (!props.open) {
		return null;
	}

	return (
		<div className="dialog-modal">
			<div className="dialog-modal__header">
				<div className="dialog-modal__header-tittel">
					<img src={dialogIkon} alt="Snakkebobler" className="dialog-modal__header-ikon" />
					<Element>Kvalitetsikring av vedtak</Element>
				</div>

				<div className="dialog-modal__header-aksjoner">
					<ImageButton
						src={refreshIkon}
						alt="Refresh"
						imgClassName="dialog-modal__header-aksjon-ikon"
						onClick={handleRefreshClicked}
					/>
					<ImageButton
						src={lukkIkon}
						alt="Lukk dialog modal"
						className="dialog-modal__header-aksjon-lukk"
						imgClassName="dialog-modal__header-aksjon-ikon"
						onClick={props.onRequestClose}
					/>
				</div>
			</div>
			<div className="meldinger">
				<MeldingListe meldinger={sorterteMeldinger} innloggetVeilederIdent={innloggetVeileder.ident} />
				<Show if={meldingFetcher.status === FetchStatus.PENDING}>
					<Spinner />
				</Show>
			</div>
			<Skrivefelt />
		</div>
	);
};
