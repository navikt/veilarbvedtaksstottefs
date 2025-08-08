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

	switch (view) {
		case ViewType.HOVEDSIDE:
			return <Hovedside />;
		case ViewType.UTKAST:
			return <UtkastSide />;
		case ViewType.FORHANDSVISNING:
			return <Forhandsvisning />;
		case ViewType.VEDTAK:
			if ('vedtakId' in viewProps) {
				return <VedtakskjemaVisningSide vedtakId={viewProps.vedtakId} />;
			}
			return null;
		case ViewType.OYBLIKKSBILDE_VISNING:
			if ('vedtakId' in viewProps) {
				return <Oyeblikksbilde vedtakId={viewProps.vedtakId} />;
			}
			return null;
		case ViewType.VEDTAK_PDF:
			if ('vedtakId' in viewProps) {
				return <VedtaksbrevVisning vedtakId={viewProps.vedtakId} />;
			}
			return null;
		case ViewType.VEDTAK_OYEBLIKKSBILDE_PDF:
			if ('vedtakId' in viewProps && 'oyeblikksbildeType' in viewProps) {
				return (
					<OyeblikksbildeVisningPDF
						vedtakId={viewProps.vedtakId}
						oyeblikksbildeType={viewProps.oyeblikksbildeType}
					/>
				);
			}
			return null;
		case ViewType.ARENA_VEDTAK_PDF:
			if ('dokumentInfoId' in viewProps && 'journalpostId' in viewProps) {
				return (
					<ArenaVedtaksbrevVisning
						dokumentInfoId={viewProps.dokumentInfoId}
						journalpostId={viewProps.journalpostId}
					/>
				);
			}
			return null;
		default:
			return <Hovedside />;
	}
}
