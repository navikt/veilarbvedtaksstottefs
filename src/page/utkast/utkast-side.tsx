import React, { useEffect } from 'react';
import cls from 'classnames';
import { UtkastFooter } from './footer/utkast-footer';
import SkjemaHeader from './skjema-section/header/skjema-header';
import { DialogSectionHeader } from './dialog-section/dialog-section-header';
import { DialogSection } from './dialog-section/dialog-section';
import { EndreSkjemaSection } from './skjema-section/endre-skjema-section';
import { LesSkjemaSection } from './skjema-section/les-skjema-section';
import './utkast-side.less';
import { useDataStore } from '../../store/data-store';
import { useTilgangStore } from '../../store/tilgang-store';
import { useSkjemaStore } from '../../store/skjema-store';
import { useDialogSection } from '../../store/dialog-section-store';
import { makeAbsoluteHeightStyle } from '../../util';
import Show from '../../component/show';
import { DialogSectionMinified } from './dialog-section-minified/dialog-section-minified';

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
	const { sectionHeight, setSectionHeight, showSection } = useDialogSection();
	const { erAnsvarligVeileder } = useTilgangStore();

	const dialogSectionStyle = sectionHeight ? makeAbsoluteHeightStyle(sectionHeight) : undefined;

	const hovedinnholdClassName = showSection
		? 'utkast-side__hovedinnhold--dialog'
		: 'utkast-side__hovedinnhold--no-dialog';

	useEffect(() => {
		const scrollListener = () => setSectionHeight(calculateDialogSectionHeight());

		if (showSection) {
			window.addEventListener('scroll', scrollListener);
			setSectionHeight(calculateDialogSectionHeight());
		}

		return () => window.removeEventListener('scroll', scrollListener);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showSection]);

	useEffect(() => {
		// Nullstill forsøk på forhåndsvisning hvis man har vært inne på utkastet og forhåndsvist før
		setHarForsoktAForhandsvise(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sisteOppdatering = sistOppdatert || utkast!.sistOppdatert;

	const utkastSkjema = erAnsvarligVeileder ? <EndreSkjemaSection /> : <LesSkjemaSection />;

	return (
		<div className="utkast-side">
			<div className={cls('utkast-side__hovedinnhold', hovedinnholdClassName)}>
				<div className="utkast-side__skjema-section">
					<SkjemaHeader
						veilederNavn={utkast!.veilederNavn}
						sistOppdatert={sisteOppdatering}
						skjemaLagringStatus={lagringStatus}
					/>
					<div className="utkast-side__skjema-section-innhold">
						{utkastSkjema}
						<Show if={!showSection}>
							<DialogSectionMinified />
						</Show>
					</div>
				</div>

				<Show if={showSection}>
					<div style={dialogSectionStyle} className="utkast-side__dialog-section">
						<DialogSectionHeader beslutterNavn={utkast?.beslutterNavn} />
						<DialogSection />
					</div>
				</Show>
			</div>
			<UtkastFooter />
		</div>
	);
}
