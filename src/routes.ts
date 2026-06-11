export const routes = {
	hovedside: '/',
	utkast: '/utkast',
	forhandsvisning: '/forhandsvisning',
	vedtak: (vedtakId: number) => `/vedtak/${vedtakId}`,
	vedtakPdf: (vedtakId: number) => `/vedtak/${vedtakId}/pdf`,
	oyeblikksbilde: (vedtakId: number) => `/vedtak/${vedtakId}/oyeblikksbilde`,
	oyeblikksbildePdf: (vedtakId: number, oyeblikksbildeType: string) =>
		`/vedtak/${vedtakId}/oyeblikksbilde/${oyeblikksbildeType}/pdf`,
	klagebehandling: (vedtakId: number) => `/vedtak/${vedtakId}/klage`,
	arenaVedtakPdf: (journalpostId: string, dokumentInfoId: string) => `/arena/${journalpostId}/${dokumentInfoId}`
} as const;

export const routePatterns = {
	hovedside: '/',
	utkast: '/utkast',
	forhandsvisning: '/forhandsvisning',
	vedtak: '/vedtak/:vedtakId',
	vedtakPdf: '/vedtak/:vedtakId/pdf',
	oyeblikksbilde: '/vedtak/:vedtakId/oyeblikksbilde',
	oyeblikksbildePdf: '/vedtak/:vedtakId/oyeblikksbilde/:oyeblikksbildeType/pdf',
	klagebehandling: '/vedtak/:vedtakId/klage',
	arenaVedtakPdf: '/arena/:journalpostId/:dokumentInfoId'
} as const;
