import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Hovedside } from '../page/hovedside/hovedside';
import { VedtakskjemaVisningSide } from '../page/vedtakskjema-visning/vedtakskjema-visning-side';
import { Forhandsvisning } from '../page/forhandsvisning/forhandsvisning';
import { ArenaVedtaksbrevVisning, VedtaksbrevVisning } from '../page/vedtaksbrev-visning/vedtaksbrev-visning';
import { UtkastSide } from '../page/utkast/utkast-side';
import { OyeblikksbildeVisningPDF } from '../page/oyblikksbilde-visning/oyeblikksbilde-visning-pdf';
import { Oyeblikksbilde } from '../page/oyblikksbilde-visning/oyeblikksbilde-visning';
import { KlagebehandlingSide } from '../page/klagebehandling/klagebehandling-side.tsx';
import { routePatterns } from '../routes.ts';
import { hasHashParam } from '../util';

function VedtakRoute() {
	const { vedtakId } = useParams();
	return <VedtakskjemaVisningSide vedtakId={Number(vedtakId)} />;
}

function VedtakPdfRoute() {
	const { vedtakId } = useParams();
	return <VedtaksbrevVisning vedtakId={Number(vedtakId)} />;
}

function ArenaVedtakPdfRoute() {
	const { dokumentInfoId, journalpostId } = useParams();
	return <ArenaVedtaksbrevVisning dokumentInfoId={dokumentInfoId!} journalpostId={journalpostId!} />;
}

function OyeblikksbildeRoute() {
	const { vedtakId } = useParams();
	return <Oyeblikksbilde vedtakId={Number(vedtakId)} />;
}

function OyeblikksbildePdfRoute() {
	const { vedtakId, oyeblikksbildeType } = useParams();
	return <OyeblikksbildeVisningPDF vedtakId={Number(vedtakId)} oyeblikksbildeType={oyeblikksbildeType!} />;
}

function KlagebehandlingRoute() {
	const { vedtakId } = useParams();
	return <KlagebehandlingSide vedtakId={Number(vedtakId)} />;
}

function FallbackRedirect() {
	const target = hasHashParam('visUtkast') ? routePatterns.utkast : '/';
	return <Navigate to={target} replace />;
}

export function ViewController() {
	return (
		<Routes>
			<Route path={routePatterns.hovedside} element={<Hovedside />} />
			<Route path={routePatterns.utkast} element={<UtkastSide />} />
			<Route path={routePatterns.forhandsvisning} element={<Forhandsvisning />} />
			<Route path={routePatterns.vedtak} element={<VedtakRoute />} />
			<Route path={routePatterns.vedtakPdf} element={<VedtakPdfRoute />} />
			<Route path={routePatterns.oyeblikksbilde} element={<OyeblikksbildeRoute />} />
			<Route path={routePatterns.oyeblikksbildePdf} element={<OyeblikksbildePdfRoute />} />
			<Route path={routePatterns.klagebehandling} element={<KlagebehandlingRoute />} />
			<Route path={routePatterns.arenaVedtakPdf} element={<ArenaVedtakPdfRoute />} />
			<Route path="*" element={<FallbackRedirect />} />
		</Routes>
	);
}
