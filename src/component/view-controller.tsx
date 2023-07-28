import { Hovedside } from '../page/hovedside/hovedside';
import { VedtakskjemaVisningSide } from '../page/vedtakskjema-visning/vedtakskjema-visning-side';
import { Forhandsvisning } from '../page/forhandsvisning/forhandsvisning';
import { useViewStore, ViewType } from '../store/view-store';
import { OyblikksbildeVisning } from '../page/oyblikksbilde-visning/oyblikksbilde-visning';
import { ArenaVedtaksbrevVisning, VedtaksbrevVisning } from '../page/vedtaksbrev-visning/vedtaksbrev-visning';
import { UtkastSide } from '../page/utkast/utkast-side';

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
