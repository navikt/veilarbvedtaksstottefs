import dayjs from 'dayjs';

export function formatDateTime(dateStr: string) {
	return dayjs(dateStr).format('DD. MMM. YYYY kl. HH:mm');
}

export function formatDateStr(dateStr: string) {
	return dayjs(dateStr).format('DD. MMM. YYYY');
}

export function formatDate(date: Date, format: string = 'DD.MM.YYYY') {
	return dayjs(date).format(format);
}

export function formaterBeslutterOppgaveDato(date: Date) {
	return dayjs(date).format('YYYY-MM-DD');
}

export function daysFromToday(date: Date): number {
	const today = dayjs();
	return today.diff(dayjs(date), 'day');
}