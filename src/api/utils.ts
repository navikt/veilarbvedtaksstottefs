import axios, { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import { APP_NAME } from '../util/constants';

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: { 'Nav-Consumer-Id': APP_NAME }
});
export const journalpostIdHarRiktigFormat = (id: string) => /^\d{9}$/.test(id.replace(/\s/g, ''));
export function isAnyLoading(...fetchers: { loading: boolean }[]): boolean {
	return fetchers.some(f => f.loading);
}

export function hasAnyFailed(...fetchers: { error?: AxiosError }[]): boolean {
	return fetchers.some(f => f.error);
}

export function ifResponseHasData<T>(callback: (data: T) => void): (res: AxiosResponse<T>) => AxiosPromise<T> {
	return (res: AxiosResponse<T>) => {
		if (res.status < 300 && res.data) {
			callback(res.data);
		}
		return Promise.resolve(res);
	};
}
