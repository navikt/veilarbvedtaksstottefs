import React from 'react';
import Page from '../../component/page/page';
import Footer from '../../component/footer/footer';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { SkjemaVisning } from '../../component/skjema-visning/skjema-visning';
import { useViewStore, ViewType } from '../../store/view-store';
import { useDataStore } from '../../store/data-store';
import './vedtakskjema-visning-side.less';
import { Vedtak } from '../../api/veilarbvedtaksstotte';
import { Tilbakeknapp } from 'nav-frontend-ikonknapper';

export function VedtakskjemaVisningSide(props: { vedtakId: number }) {
	const { fattedeVedtak } = useDataStore();
	const { changeView } = useViewStore();
	const vistVedtak = fattedeVedtak.find((v: Vedtak) => v.id === props.vedtakId);

	if (!vistVedtak) {
		return <AlertStripeFeil>Fant ikke vedtak å fremvise</AlertStripeFeil>;
	}

	return (
		<>
			<Page className="vedtakskjema-visning page--white">
				<SkjemaVisning fattetVedtak={vistVedtak} />
			</Page>
			<Footer>
				<div className="vedtakskjema-visning__aksjoner">
					<Tilbakeknapp htmlType="button" onClick={() => changeView(ViewType.HOVEDSIDE)} />

					<Hovedknapp
						mini={true}
						onClick={() =>
							changeView(ViewType.VEDTAK_PDF, {
								vedtakId: vistVedtak.id,
								dokumentInfoId: vistVedtak.dokumentInfoId,
								journalpostId: vistVedtak.journalpostId
							})
						}
					>
						Vis vedtaksbrev
					</Hovedknapp>
				</div>
			</Footer>
		</>
	);
}
