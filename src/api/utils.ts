import axios, { AxiosError } from 'axios';
import { APP_NAME } from '../util/constants';

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: { 'Nav-Consumer-Id': APP_NAME }
});

export function isAnyLoading(...fetchers: { loading: boolean }[]): boolean {
	return fetchers.some(responseValue => responseValue.loading);
}

export function hasAnyFailed(...fetchers: { error?: AxiosError }[]): boolean {
	return fetchers.some(responseValue => responseValue.error);
}
