import dayjs from 'dayjs';

export function formatDate(dateStr: string) {
    return dayjs(dateStr).format('DD. MMM. YYYY kl. HH:mm');
}
