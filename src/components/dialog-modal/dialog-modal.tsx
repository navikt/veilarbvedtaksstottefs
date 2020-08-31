import React, { useEffect, useMemo, useRef, useState } from 'react';
import './dialog-modal.less'
import { useDataStore } from '../../stores/data-store';
import { sortDatesAsc } from '../../utils/date-utils';
import { Element } from 'nav-frontend-typografi';
import { MeldingListe } from './melding-liste/melding-liste';
import Show from '../show';
import Spinner from '../spinner/spinner';
import { Skrivefelt } from './skrivefelt/skrivefelt';
import dialogIkon from './dialog.svg';
import lukkIkon from './lukk.svg';
import ImageButton from '../image-button/image-button';
import { hentId } from '../../utils';
import { fetchMeldinger } from '../../rest/api';
import { SKRU_AV_POLLING_DIALOG } from '../../rest/data/features';

interface DialogModalProps {
	open: boolean;
	onRequestClose: () => void;
}

const TEN_SECONDS = 10000;

export const DialogModal = (props: DialogModalProps) => {
	const { meldinger, setMeldinger, innloggetVeileder, utkast, features } = useDataStore();
	const [harLastetMeldinger, setHarLastetMeldinger] = useState(false);

	const intervalRef = useRef<number>();

	const sorterteMeldinger = useMemo(() => {
		return [...meldinger].sort((d1, d2) => sortDatesAsc(d1.opprettet, d2.opprettet));
	}, [meldinger]);

	function refreshMeldinger() {
		fetchMeldinger(hentId(utkast))
			.then(response => {
				if (response.data) {
					setMeldinger(response.data);
				}
			})
			.finally(() => {
				setHarLastetMeldinger(true);
			});
	}

	function clearAutoRefresh() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
		}
	}

	useEffect(() => {
		if (props.open && !features[SKRU_AV_POLLING_DIALOG] && intervalRef.current === undefined) {
			intervalRef.current = setInterval(refreshMeldinger, TEN_SECONDS) as unknown as number;
			// NodeJs types are being used instead of browser types so we have to override
			// Maybe remove @types/node?
		} else if (!props.open) {
			clearAutoRefresh();
		}

		return clearAutoRefresh;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.open]);

	useEffect(() => {
			refreshMeldinger();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<Show if={!harLastetMeldinger && sorterteMeldinger.length === 0}>
					<Spinner />
				</Show>
			</div>
			<Skrivefelt />
		</div>
	);
};
