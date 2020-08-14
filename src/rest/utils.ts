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
