import { frontendlogger } from '../utils/frontend-logger';
import { useCallback, useMemo, useState } from 'react';
import { logger } from '../utils/logger';
import useFetchHook from 'react-fetch-hook';

export interface FetchResponse<D = any> {
	error?: any;
	data?: D;
	httpCode?: number;
}

export function fetchWithChecks<D>(input: RequestInfo, init?: RequestInit): Promise<Response> {
	return fetch(input, init)
		.then(res => {
		if (res.status >= 400) {
			res.clone()
				.text()
				.then(txt => {
					frontendlogger.logError({ error: txt });
				})
				.catch();

			throw new Error('Kall feilet med status ' + res.status);
		}

		return res;
	});
}

export function fetchJson<D>(input: RequestInfo, init?: RequestInit): Promise<FetchResponse<D>> {
	return fetch(input, init)
		.then(async (res) => {
			const status = res.status;
			try {
				if (status >= 300) {
					const error = await res.text();
					logger.error('API kall feilet med status ', status);
					return { error, httpCode: status };
				}
				const json = await res.json();
				return { data: json, httpCode: status };
			} catch (err) {
				return { error: err, httpCode: status };
			}
		})
		.catch(error => {
			return { error };
		});
}

export enum Status {
	NOT_STARTED = 'NOT_STARTED',
	PENDING = 'PENDING',
	SUCCEEDED = 'SUCCEEDED',
	FAILED = 'FAILED'
}

export interface PromiseStatusWithError {
	error: any;
	status: Status;
}

export interface PromiseStatusWithData<D> {
	data: D;
	status: Status;
}

export interface PromiseState<D> {
	data?: D;
	error?: any;
	status: Status;
}

interface PromiseStateWithEvaluate<D> extends PromiseState<D>{
	evaluate: (promise: Promise<FetchResponse<D>>) => void;
}

export function hasData<D>(status: PromiseState<D>): status is PromiseStatusWithData<D>  {
	return status.status === Status.SUCCEEDED && status.data !== undefined;
}

export function hasFailed<D>(status: PromiseState<D>): status is PromiseStatusWithError  {
	return status.status === Status.FAILED;
}

export function isNotStartedOrPending<D>(state: PromiseState<D>) {
	return state.status === Status.NOT_STARTED || state.status === Status.PENDING;
}

export const hasAnyFailed = (state: UseFetchState<any> | Array<UseFetchState<any>>): boolean => {
	if (Array.isArray(state)) {
		return state.some(s => s.error !== undefined);
	}
	return state.error !== undefined;
}

export const isAnyNotStartedOrPending = (state: UseFetchState<any> | Array<UseFetchState<any>>): boolean => {
	if (Array.isArray(state)) {
		return state.some(s => s.isLoading);
	}
	return state.isLoading;
}

export function useFetchResponsePromise<D>(): PromiseStateWithEvaluate<D> {
	const [data, setData] = useState<D>();
	const [error, setError] = useState<any>();
	const [status, setStatus] = useState<Status>(Status.NOT_STARTED);

	const evaluate = useCallback((promise: Promise<FetchResponse<D>>) => {
		setStatus(Status.PENDING);

		promise
			.then(response => {
				if (response.error) {
					setError(response.error)
					setStatus(Status.FAILED);
				} else {
					setData(response.data);
					setStatus(Status.SUCCEEDED);
				}
			})
			.catch(responseError => {
				setError(responseError);
				setStatus(Status.FAILED);
			});
	}, []);

	return useMemo<PromiseStateWithEvaluate<D>>(
		() => ({error, data, status, evaluate}),
		[error, data, status, evaluate]);
}

export type UseFetchState<T> = useFetchHook.FetchResult<T> & { refetch: () => void}
export function useFetch<T>(requestInfo: RequestInfo,
							options?: useFetchHook.HookOptions | useFetchHook.HookOptionsWithFormatter<T>,
							specialOptions?: useFetchHook.HookOptions): UseFetchState<T> {
	const [trigger, setTrigger] = useState(1);
	const dependsWithTrigger = options && options.depends ? [...options.depends, trigger] : [trigger];
	const fetchState = useFetchHook<T>(requestInfo, Object.assign(options || {}, {depends: dependsWithTrigger}), specialOptions);
	const refetch = useCallback(() => {
		setTrigger(prev => ++prev);
	}, []);

	return useMemo(() => ({...fetchState, refetch}), [fetchState, refetch]);
}
