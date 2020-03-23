import dayjs from 'dayjs';

export function formatDayMonthTime(dateStr: string) {
	return dayjs(dateStr).format('DD.MM HH:mm');
}

export function formatDateTime(dateStr: string) {
	return dayjs(dateStr).format('DD. MMM YYYY kl. HH:mm');
}

export function formatDateStr(dateStr: string) {
	return dayjs(dateStr).format('DD. MMM YYYY');
}

export function formatDate(date: Date, format: string = 'DD.MM.YYYY') {
	return dayjs(date).format(format);
}

export function daysFromToday(date: Date): number {
	const today = dayjs();
	return today.diff(dayjs(date), 'day');
}

// Oldest -> newest
export function sortDatesAsc(dateStr1: string, dateStr2: string): number {
	const d1 = dayjs(dateStr1);
	const d2 = dayjs(dateStr2);
	return d1.isBefore(d2) ? -1 : 1;
}

// Newest -> oldest
export function sortDatesDesc(dateStr1: string, dateStr2: string): number {
	return sortDatesAsc(dateStr1, dateStr2) * -1;
}

export function lagVedtakDatoTekst(dateStr: string): string {
	const date = dayjs(dateStr).toDate();
	const days = daysFromToday(date);

	if (days <= 0) {
		return 'i dag';
	} else if (days < 30) {
		return `${days} dager siden`;
	}

	return formatDate(date);
}
