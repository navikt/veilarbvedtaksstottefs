import dayjs from 'dayjs';

export function formatLongDate(dateStr: string) {
    return dayjs(dateStr).format('DD. MMM. YYYY kl. HH:mm');
}

export function formatShortDate(dateStr: string) {
    return dayjs(dateStr).format('DD. MMM. YYYY');
}
