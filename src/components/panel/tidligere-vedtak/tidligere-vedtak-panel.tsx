import React from 'react';
import cls from 'classnames';
import { InnsatsgruppeType, VedtakData } from '../../../rest/data/vedtak';
import { Panel } from '../panel/panel';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { HoyreChevron } from 'nav-frontend-chevron';
import { Dato } from '../dato';
import { Veileder } from '../veileder';
import emptyBox from './empty-box.svg';
import { useViewStore, ViewType } from '../../../stores/view-store';
import { frontendlogger } from '../../../utils/frontend-logger';
import './tidligere-vedtak-panel.less';
import { getInnsatsgruppeTekst } from '../../../utils/innsatsgruppe';
import dayjs from 'dayjs';

export function TidligereVedtakPanel(props: { vedtakHistorikk: VedtakData[] }) {
	if (props.vedtakHistorikk.length === 0) {
		return <IngenTidligereVedtak />;
	}

	return <HarTidligereVedtak vedtakHistorikk={props.vedtakHistorikk} />;
}

function IngenTidligereVedtak() {
	return (
		<Panel tittel="Tidligere oppfølgingsvedtak" className="ingen-tidligere-vedtak-panel">
			<section className="ingen-vedtak">
				<img src={emptyBox} alt="Illustrasjon av tom eske" className="ingen-vedtak__bilde" />
				<Undertittel>Ingen tidligere oppfølgingsvedtak</Undertittel>
				<Normaltekst className="ingen-vedtak__forklaring">
                    Oppfølgingsvedtak som er fattet i Modia vil bli tilgjengelige her.
				</Normaltekst>
			</section>
		</Panel>
	);
}

function HarTidligereVedtak({ vedtakHistorikk }: { vedtakHistorikk: VedtakData[] }) {
	const harToVedtak = vedtakHistorikk.length === 2;

	vedtakHistorikk.sort((v1, v2) => {
		const d1 = dayjs(v1.sistOppdatert);
		const d2 = dayjs(v2.sistOppdatert);
		return d1.isBefore(d2) ? 1 : -1;
	});

	return (
		<Panel
			tittel="Tidligere oppfølgingsvedtak"
			className={cls('tidligere-vedtak-panel', { 'to-tidligere-vedtak': harToVedtak })}
		>
			<ul className="vedtak-historikk-liste">
				{vedtakHistorikk.map((tidligereVedtak, idx) => (
					<TidligereVedtak key={idx} tidligereVedtak={tidligereVedtak} index={idx} />
				))}
			</ul>
		</Panel>
	);
}

function TidligereVedtak(props: { tidligereVedtak: VedtakData; index: number }) {
	const {
		innsatsgruppe, id, sistOppdatert, veilederNavn,
		veilederIdent, veilederEnhetId, veilederEnhetNavn
	} = props.tidligereVedtak;
	const { changeView } = useViewStore();

	const innsatsgruppeTekst = getInnsatsgruppeTekst(innsatsgruppe as InnsatsgruppeType);
	const elemId = 'tidligere-vedtak-' + props.index;

	function handleTidligereVedtakClicked() {
		changeView(ViewType.VEDTAK, { vedtakId: id });
		frontendlogger.logMetrikk('vis-tidligere-vedtak', { index: props.index });
	}

	return (
		<li className="vedtak-historikk-liste__item">
			<button
				aria-describedby={elemId}
				className="tidligere-vedtak knapp__no-style"
				onClick={handleTidligereVedtakClicked}
			>
				<div className="tidligere-vedtak__innhold">
					<div id={elemId}>
						<Element className="blokk-xxs">{innsatsgruppeTekst.tittel}</Element>
						<Dato sistOppdatert={sistOppdatert} formatType="short" text="Dato" />
						<Veileder
							enhetId={veilederEnhetId}
							veilederNavn={veilederNavn || veilederIdent}
							enhetNavn={veilederEnhetNavn}
							text="Fattet av"
						/>
					</div>
					<HoyreChevron className="tidligere-vedtak__chevron" />
				</div>
			</button>
		</li>
	);
}
