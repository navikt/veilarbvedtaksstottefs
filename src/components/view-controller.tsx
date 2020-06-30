import React from 'react';
import { Hovedside } from '../pages/hovedside/hovedside';
import { VedtakskjemaVisningSide } from '../pages/vedtakskjema-visning/vedtakskjema-visning-side';
import { Forhandsvisning } from '../pages/forhandsvisning/forhandsvisning';
import { useViewStore, ViewType } from '../stores/view-store';
import { OyblikksbildeVisning } from '../pages/oyblikksbilde-visning/oyblikksbilde-visning';
import { ArenaVedtaksbrevVisning, VedtaksbrevVisning } from '../pages/vedtaksbrev-visning/vedtaksbrev-visning';
import { UtkastSide } from '../pages/utkast/utkast-side';

export function ViewController() {
	const { view, viewProps } = useViewStore();
	const { vedtakId, dokumentInfoId, journalpostId } = viewProps;

	switch (view) {
		case ViewType.HOVEDSIDE:
			return <Hovedside />;
		case ViewType.UTKAST:
			return <UtkastSide />;
		case ViewType.FORHANDSVISNING:
			return <Forhandsvisning />;
		case ViewType.VEDTAK:
			return <VedtakskjemaVisningSide vedtakId={vedtakId} />;
		case ViewType.OYBLIKKSBILDE_VISNING:
			return <OyblikksbildeVisning vedtakId={vedtakId} />;
		case ViewType.VEDTAK_PDF:
			return <VedtaksbrevVisning vedtakId={vedtakId} />;
		case ViewType.ARENA_VEDTAK_PDF:
			return <ArenaVedtaksbrevVisning dokumentInfoId={dokumentInfoId} journalpostId={journalpostId} />;
		default:
			return <Hovedside />;
	}
}
