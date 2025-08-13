import { useEffect, useRef } from 'react';
import cls from 'classnames';
import { UtkastFooter } from './footer/utkast-footer';
import SkjemaHeader from './skjema-section/header/skjema-header';
import { DialogSectionHeader } from './dialog-section/dialog-section-header';
import { DialogSection } from './dialog-section/dialog-section';
import { EndreSkjemaSection } from './skjema-section/endre-skjema-section';
import { LesSkjemaSection } from './skjema-section/les-skjema-section';
import { useDataStore } from '../../store/data-store';
import { useTilgangStore } from '../../store/tilgang-store';
import { useSkjemaStore } from '../../store/skjema-store';
import { useDialogSection } from '../../store/dialog-section-store';
import { hentId, makeAbsoluteHeightStyle } from '../../util';
import Show from '../../component/show';
import { hentMeldinger } from '../../api/veilarbvedtaksstotte/meldinger';
import { DialogSectionMinified } from './dialog-section-minified/dialog-section-minified';
import { DialogSectionHeaderMinified } from './dialog-section-minified/dialog-section-header-minified';
import { trengerKvalitetssikrer } from '../../util/skjema-utils';
import { ScreenReaderSpeak } from '../../component/screen-reader-speak/screen-reader-speak';
import { KanIkkeDistribueresAlert } from './kan-ikke-distribueres-alert';
import './utkast-side.less';

const FOOTER_HEIGHT = 72;
const TEN_SECONDS = 10000;

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
	const { utkast, meldinger, setMeldinger } = useDataStore();
	const { sistOppdatert, lagringStatus, setHarForsoktAForhandsvise, innsatsgruppe } = useSkjemaStore();
	const {
		sectionHeight,
		setSectionHeight,
		showSection,
		setShowSection,
		harLastetMeldinger,
		setHarLastetMeldinger,
		setHarNyeMeldinger
	} = useDialogSection();
	const { erAnsvarligVeileder } = useTilgangStore();

	// Bruk refs for å hente oppdatert data i refreshMeldinger()
	const showSectionRef = useRef(showSection);
	const harLastetMeldingerRef = useRef(harLastetMeldinger);
	const meldingerRef = useRef(meldinger);
	const intervalRef = useRef<number>();
	const erBeslutterProsessStartet = !!utkast?.beslutterProsessStatus;
	const utkastSkjema = erAnsvarligVeileder ? <EndreSkjemaSection /> : <LesSkjemaSection />;
	const dialogSectionStyle = sectionHeight ? makeAbsoluteHeightStyle(sectionHeight) : undefined;
	const hovedinnholdClassName = showSection
		? 'utkast-side__hovedinnhold--dialog'
		: 'utkast-side__hovedinnhold--dialog-minified';

	function avbrytPolling() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = undefined;
		}
	}

	function refreshMeldinger() {
		hentMeldinger(hentId(utkast))
			.then(response => {
				const nyeMeldinger = response.data;

				if (nyeMeldinger) {
					const harNyeMeldingerSomIkkeErLest =
						!showSectionRef.current &&
						harLastetMeldingerRef.current &&
						nyeMeldinger.length > meldingerRef.current.length;

					if (harNyeMeldingerSomIkkeErLest) {
						setHarNyeMeldinger(true);
					}

					setMeldinger(nyeMeldinger);
				}
			})
			.catch(() => {
				// backend svarer med status 400 dersom man poller på meldinger for vedtak som er fattet
				avbrytPolling();
			})
			.finally(() => {
				setHarLastetMeldinger(true);
			});
	}

	useEffect(() => {
		showSectionRef.current = showSection;
		harLastetMeldingerRef.current = harLastetMeldinger;
		meldingerRef.current = meldinger;
	}, [showSection, harLastetMeldinger, meldinger]);

	useEffect(() => {
		if (showSection) {
			setHarNyeMeldinger(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showSection]);

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
		// Hvis utkastet har beslutter så henter vi meldinger periodisk for å simulere real-time kommunikasjon
		if (erBeslutterProsessStartet) {
			refreshMeldinger();

			// Start polling of new dialogs
			if (intervalRef.current === undefined) {
				intervalRef.current = window.setInterval(refreshMeldinger, TEN_SECONDS);
			}

			return () => {
				avbrytPolling();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [erBeslutterProsessStartet]);

	useEffect(() => {
		// Nullstill forsøk på forhåndsvisning hvis man har vært inne på utkastet og forhåndsvist før
		setHarForsoktAForhandsvise(false);
		setHarLastetMeldinger(false);

		// Vis dialog seksjon når man går inn på et utkast som trenger beslutter
		setShowSection(trengerKvalitetssikrer(innsatsgruppe));

		// Hent meldinger når utkast vises
		refreshMeldinger();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innsatsgruppe]);

	if (utkast == null) {
		return null;
	}

	return (
		<div className="utkast-side">
			<div className={cls('utkast-side__hovedinnhold', hovedinnholdClassName)}>
				<div className="utkast-side__skjema-section">
					<SkjemaHeader
						veilederNavn={utkast!.veilederNavn}
						sistOppdatert={sistOppdatert || utkast!.utkastSistOppdatert}
						skjemaLagringStatus={lagringStatus}
						vedtakId={utkast.id}
					/>
					<KanIkkeDistribueresAlert kanDistribueres={!!utkast && utkast?.kanDistribueres} />
					<div className="utkast-side__skjema-section-innhold">{utkastSkjema}</div>
				</div>
				<div
					// style={dialogSectionStyle}
					className="utkast-side__dialog-section"
				>
					<Show if={showSection}>
						<DialogSectionHeader beslutterNavn={utkast?.beslutterNavn} />
						<DialogSection />
						<ScreenReaderSpeak tekst="Dialog og kvalitetssikring seksjon åpen" />
					</Show>

					<Show if={!showSection}>
						<DialogSectionHeaderMinified />
						<DialogSectionMinified />
						<ScreenReaderSpeak tekst="Dialog og kvalitetssikring seksjon lukket" />
					</Show>
				</div>
			</div>
			<UtkastFooter />
		</div>
	);
}
