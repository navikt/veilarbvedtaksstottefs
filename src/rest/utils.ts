import { frontendlogger } from '../utils/frontend-logger';
import { useCallback, useMemo, useState } from 'react';
import { logger } from '../utils/logger';

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
	SUCCEEDED_WITH_DATA = 'SUCCEEDED_WITH_DATA',
	SUCCEEDED_NO_DATA = 'SUCCEEDED_NO_DATA',
	FAILED = 'FAILED'
}

interface StateNotStarted<D> {
	status: Status.NOT_STARTED;
}

interface StatePending {
	status: Status.PENDING;
}

interface StateSucceededWithData<D> {
	status: Status.SUCCEEDED_WITH_DATA;
	data: D;
}

interface StateSucceededNoData {
	status: Status.SUCCEEDED_NO_DATA;
}

interface StateFailed {
	status: Status.FAILED;
	error: any;
}

type State<D> = StateNotStarted<D> | StatePending | StateSucceededWithData<D> | StateSucceededNoData | StateFailed;


export function hasData<D>(status: State<D>) {
	return status.status === Status.SUCCEEDED_WITH_DATA;
}

export function hasFailed<D>(status: State<D>) {
	return status.status === Status.FAILED;
}

export const hasAnyFailed = (state: State<any> | Array<State<any>>): boolean => {
	if (Array.isArray(state)) {
		return state.some(s => hasFailed(s));
	}
	return hasFailed(state);
}

export function isNotStartedOrPending<D>(state: State<D>) {
	return state.status === Status.NOT_STARTED || state.status === Status.PENDING;
}

export const isAnyNotStartedOrPending = (state: State<any> | Array<State<any>>): boolean => {
	if (Array.isArray(state)) {
		return state.some(s => isNotStartedOrPending(s));
	}
	return isNotStartedOrPending(state);
}

export function useFetchResponsePromise<D>(): [State<D>, (promise: Promise<FetchResponse<D>>) => void] {
	const [state, setState] =  useState<State<D>>({ status: Status.NOT_STARTED })

	const evaluate = useCallback((promise: Promise<FetchResponse<D>>) => {
		setState({ status: Status.PENDING });

		promise
			.then(response => {
				if (response.error) {
					setState({ status: Status.FAILED, error: response.error });
				} else if (response.data) {
					setState({status:Status.SUCCEEDED_WITH_DATA, data: response.data});
				} else {
					setState({status:Status.SUCCEEDED_NO_DATA});
				}
			})
			.catch(responseError => {
				setState({ status: Status.FAILED, error: responseError });
			});
	}, []);

	return useMemo(
		() => ([state, evaluate]),
		[state, evaluate]);
}
