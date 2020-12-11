import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { veilarbvedtaksstotteUtkastHandlers } from './utkast';

export const veilarbvedtaksstotteHandlers: RequestHandlersList = [...veilarbvedtaksstotteUtkastHandlers];
