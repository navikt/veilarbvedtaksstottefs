import dayjs from 'dayjs';

export function formatDateTime(dateStr: string) {
    return dayjs(dateStr).format('DD. MMM. YYYY kl. HH:mm');
}

export function formatDate(dateStr: string) {
    return dayjs(dateStr).format('DD. MMM. YYYY');
}
