import React, { useEffect } from 'react';
import { UtkastFooter } from './footer/utkast-footer';
import SkjemaHeader from './skjema-section/header/skjema-header';
import { DialogSectionHeader } from './dialog-section/dialog-section-header';
import { DialogSectionInnhold } from './dialog-section/dialog-section-innhold';
import { EndreSkjemaSection } from './skjema-section/endre-skjema-section';
import { LesSkjemaSection } from './skjema-section/les-skjema-section';
import './utkast-side.less';
import { useDataStore } from '../../store/data-store';
import { useTilgangStore } from '../../store/tilgang-store';
import { useSkjemaStore } from '../../store/skjema-store';

export function UtkastSide() {
	const { utkast } = useDataStore();
	const { sistOppdatert, lagringStatus, setHarForsoktAForhandsvise } = useSkjemaStore();
	const { erAnsvarligVeileder } = useTilgangStore();

	useEffect(() => {
		// Nullstill forsøk på forhåndsvisning hvis man har vært inne på utkastet og forhåndsvist før
		setHarForsoktAForhandsvise(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sisteOppdatering = sistOppdatert || utkast!.sistOppdatert;

	const utkastSkjema = erAnsvarligVeileder ? <EndreSkjemaSection /> : <LesSkjemaSection />;

	return (
		<div className="utkast-side">
			<div className="utkast-side__hovedinnhold">
				<div className="utkast-side__skjema-section">
					<SkjemaHeader
						veilederNavn={utkast!.veilederNavn}
						sistOppdatert={sisteOppdatering}
						skjemaLagringStatus={lagringStatus}
					/>
					{utkastSkjema}
				</div>
				<div className="utkast-side__dialog-section">
					<DialogSectionHeader beslutterNavn={utkast?.beslutterNavn} />
					<DialogSectionInnhold />
				</div>
			</div>
			<div className="utkast-side__footer">
				<UtkastFooter />
			</div>
		</div>
	);
}
