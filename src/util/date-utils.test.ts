import { lagVedtakDatoTekst } from './date-utils';
import dayjs from 'dayjs';

test('riktig antall dager siden', () => {
	const today = dayjs();

	const treDagerSiden = today.subtract(3, 'day');

	expect(lagVedtakDatoTekst(treDagerSiden.startOf('day').toString())).toEqual('3 dager siden');
	expect(lagVedtakDatoTekst(treDagerSiden.endOf('day').toString())).toEqual('3 dager siden');
});
