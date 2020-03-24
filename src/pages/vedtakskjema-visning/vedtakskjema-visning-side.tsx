import React from 'react';
import { Vedtak } from '../../rest/data/vedtak';
import Page from '../page/page';
import Footer from '../../components/footer/footer';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SkjemaVisning } from '../../components/skjema-visning/skjema-visning';
import { useDataFetcherStore } from '../../stores/data-fetcher-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import './vedtakskjema-visning-side.less';
import { useDataStore } from '../../stores/data-store';

export function VedtakskjemaVisningSide(props: { vedtakId: number }) {
	const {vedtak} = useDataStore();
	const {changeView} = useViewStore();
	const vistVedtak = vedtak.find((v: Vedtak) => v.id === props.vedtakId);

	if (!vistVedtak) {
		return <AlertStripeFeil>Fant ikke vedtak å fremvise</AlertStripeFeil>;
	}

	return (
		<>
			<Page className="vedtakskjema-visning page--white">
				<SkjemaVisning vedtak={vistVedtak}/>
			</Page>
			<Footer>
				<div className="vedtakskjema-visning__aksjoner">
					<Hovedknapp
						mini={true}
						onClick={() => changeView(ViewType.VEDTAK_PDF, {vedtakId: vistVedtak.id})}
					>
						Vis vedtaksbrev
					</Hovedknapp>
					<Knapp mini={true} onClick={() => changeView(ViewType.HOVEDSIDE)}>
						Tilbake
					</Knapp>
				</div>
			</Footer>
		</>
	);
}
