import { frontendlogger } from '../utils/frontend-logger';
import { useCallback, useMemo, useState } from 'react';

export type FetchInfo = RequestInit & { url: string };

export enum FetchStatus {
	NOT_STARTED = 'NOT_STARTED',
	PENDING = 'PENDING',
	FINISHED = 'FINISHED'
}

export interface FetchState<D = any> {
	status: FetchStatus;
	error: any;
	data: D;
	httpCode: number;
}

export const isAnyNotStartedOrPending = (fetch: FetchState | FetchState[]): boolean => {
	if (Array.isArray(fetch)) {
		return fetch.some(f => isNotStartedOrPending(f));
	}

	return isNotStartedOrPending(fetch);
};

export const hasAnyFailed = (fetch: FetchState | FetchState[]): boolean => {
	if (Array.isArray(fetch)) {
		return fetch.some(f => hasFailed(f));
	}

	return hasFailed(fetch);
};

export const isNotStarted = (fetch: FetchState): boolean => {
	return fetch.status === FetchStatus.NOT_STARTED;
};

export const isNotStartedOrPending = (fetch: FetchState): boolean => {
	return fetch.status === FetchStatus.NOT_STARTED || fetch.status === FetchStatus.PENDING;
};

export const hasFinished = (fetch: FetchState): boolean => {
	return fetch.status === FetchStatus.FINISHED;
};

export const hasFinishedWithData = (fetch: FetchState): boolean => {
	return hasFinished(fetch) && hasData(fetch);
};

export const hasFailed = (fetch: FetchState): boolean => {
	return fetch.error != null || fetch.httpCode >= 400;
};

export const hasOkStatus = (fetch: FetchState): boolean => {
	return fetch.httpCode >= 200 && fetch.httpCode < 300;
};

// export const hasData = (fetch: FetchState): boolean => {
// 	return fetch.data != null;
// };

export const fetchWithInfo = (fetchInfo: FetchInfo) => {
	const { url, ...rest } = fetchInfo;
	return fetch(url, rest).then(res => {
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
};

export interface FetchResponse<D = any> {
	error?: any;
	data?: D;
	httpCode?: number;
}

export function fetchJson<D>(input: RequestInfo, init?: RequestInit): Promise<FetchResponse<D>> {
	return fetch(input, init)
		.then(async (res) => {
			const httpCode = res.status;
			try {
				if (httpCode >= 300) {
					const error = await res.text();
					return { error, httpCode };
				}
				const json = await res.json();
				return { data: json, httpCode };
			} catch (err) {
				return { error: err, httpCode };
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
	evaluate: (promise: Promise<D>) => void;
}

export function hasData<D>(status: PromiseState<D>): status is PromiseStatusWithData<D>  {
	return status.status === Status.SUCCEEDED;
}

export function hasError<D>(status: PromiseState<D>): status is PromiseStatusWithError  {
	return status.status === Status.FAILED;
}

export function usePromise<D>(): PromiseStateWithEvaluate<D> {
	const [data, setData] = useState<D>();
	const [error, setError] = useState<any>();
	const [status, setStatus] = useState<Status>(Status.NOT_STARTED);

	const evaluate = useCallback((promise: Promise<D>) => {
		setStatus(Status.PENDING);

		promise
			.then(responseData => {
				setData(responseData);
				setStatus(Status.SUCCEEDED);
			})
			.catch(responseError => {
				setError(responseError);
				setStatus(Status.FAILED);
			});
	}, []);

	return useMemo<PromiseStateWithEvaluate<D>>(() => ({ error, data, status, evaluate }), [error, data, status, evaluate]);
}

export function useFetchJsonPromise<D>(): PromiseStateWithEvaluate<D> {
	const [data, setData] = useState<D>();
	const [error, setError] = useState<any>();
	const [status, setStatus] = useState<Status>(Status.NOT_STARTED);

	const evaluate = useCallback((promise: Promise<FetchResponse<D>>) => {
		setStatus(Status.PENDING);

		promise
			.then(responseData => {
				setData(responseData.data);
				setStatus(Status.SUCCEEDED);
			})
			.catch(responseError => {
				setError(responseError);
				setStatus(Status.FAILED);
			});
	}, []);

	return useMemo<PromiseStateWithEvaluate<D>>(() => ({ error, data, status, evaluate }), [error, data, status, evaluate]);
}