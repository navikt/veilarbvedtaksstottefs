import React from 'react';
import { VedtakData } from '../../rest/data/vedtak';
import Page from '../page/page';
import Footer from '../../components/footer/footer';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SkjemaVisning } from '../../components/skjema-visning/skjema-visning';
import { useFetchStore } from '../../stores/fetch-store';
import { useViewStore, ViewType } from '../../stores/view-store';
import './vedtakskjema-visning-side.less';

export function VedtakskjemaVisningSide(props: { vedtakId: number }) {
	const { vedtak } = useFetchStore();
	const { changeView } = useViewStore();
	const vistVedtak = vedtak.data.find((v: VedtakData) => v.id === props.vedtakId);

	if (!vistVedtak) {
		return <AlertStripeFeil>Fant ikke vedtak å fremvise</AlertStripeFeil>;
	}

	return (
		<Page className="vedtakskjema-visning page--white">
			<SkjemaVisning vedtak={vistVedtak} />
			<Footer className="vedtakskjema-visning__footer">
				<div className="vedtakskjema-visning__aksjoner">
					<Hovedknapp
						mini={true}
						onClick={() => changeView(ViewType.VEDTAK_PDF, { vedtakId: vistVedtak.id })}
					>
						Vis vedtaksbrev
					</Hovedknapp>
					<Knapp mini={true} onClick={() => changeView(ViewType.HOVEDSIDE)}>
						Tilbake
					</Knapp>
				</div>
			</Footer>
		</Page>
	);
}
