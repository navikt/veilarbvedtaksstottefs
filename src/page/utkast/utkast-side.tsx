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
import { useEventListener } from '../../util/hooks';
import { useDialogSectionHeight } from '../../store/dialog-section-height-store';
import { makeAbsoluteHeightStyle } from '../../util';

const FOOTER_HEIGHT = 72;

function calculateDialogSectionHeight(): number | undefined {
	const elem = document.getElementsByClassName('utkast-side__dialog-section')[0];
	if (elem) {
		const top = elem.getBoundingClientRect().top;
		const height = document.body.clientHeight;

		return height - top - FOOTER_HEIGHT;
	}

	return undefined;
}

export function UtkastSide() {
	const { utkast } = useDataStore();
	const { sistOppdatert, lagringStatus, setHarForsoktAForhandsvise } = useSkjemaStore();
	const { dialogSectionHeight, setDialogSectionHeight } = useDialogSectionHeight();
	const { erAnsvarligVeileder } = useTilgangStore();

	const dialogSectionStyle = dialogSectionHeight ? makeAbsoluteHeightStyle(dialogSectionHeight) : undefined;

	useEventListener('scroll', () => setDialogSectionHeight(calculateDialogSectionHeight()), []);

	useEffect(() => {
		setDialogSectionHeight(calculateDialogSectionHeight());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				<div style={dialogSectionStyle} className="utkast-side__dialog-section">
					<div className="utkast-side__dialog-section-innhold">
						<DialogSectionHeader beslutterNavn={utkast?.beslutterNavn} />
						<DialogSectionInnhold />
					</div>
				</div>
			</div>
			<UtkastFooter />
		</div>
	);
}
