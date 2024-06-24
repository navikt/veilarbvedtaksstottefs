import { Hovedside } from '../page/hovedside/hovedside';
import { VedtakskjemaVisningSide } from '../page/vedtakskjema-visning/vedtakskjema-visning-side';
import { Forhandsvisning } from '../page/forhandsvisning/forhandsvisning';
import { useViewStore, ViewType } from '../store/view-store';
import { ArenaVedtaksbrevVisning, VedtaksbrevVisning } from '../page/vedtaksbrev-visning/vedtaksbrev-visning';
import { UtkastSide } from '../page/utkast/utkast-side';
import { OyeblikksbildeVisningPDF } from '../page/oyblikksbilde-visning/oyeblikksbilde-visning-pdf';
import { Oyeblikksbilde } from '../page/oyblikksbilde-visning/oyeblikksbilde-visning';

export function ViewController() {
	const { view, viewProps } = useViewStore();
	const { vedtakId, dokumentInfoId, journalpostId, oyeblikksbildeType } = viewProps;

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
			return <Oyeblikksbilde vedtakId={vedtakId} />;
		case ViewType.VEDTAK_PDF:
			return <VedtaksbrevVisning vedtakId={vedtakId} />;
		case ViewType.VEDTAK_OYEBLIKKSBILDE_PDF:
			return <OyeblikksbildeVisningPDF vedtakId={vedtakId} oyeblikksbildeType={oyeblikksbildeType} />;
		case ViewType.ARENA_VEDTAK_PDF:
			return <ArenaVedtaksbrevVisning dokumentInfoId={dokumentInfoId} journalpostId={journalpostId} />;
		default:
			return <Hovedside />;
	}
}
