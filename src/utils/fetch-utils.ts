export enum Status {
    NOT_STARTED = 'NOT_STARTED',
    LOADING = 'LOADING',
    DONE = 'DONE',
    ERROR = 'ERROR'
}

export interface FetchState<T> {
    data: T;
    status: Status;
}

export const initialFetchState: FetchState<any> = {
    status: Status.LOADING,
    data: null
};

export const isAnyLoading = (...statuses: Status[]): boolean  => {
    return statuses.findIndex(s => s === Status.LOADING || s === Status.NOT_STARTED) >= 0;
};

export const isAnyFailed = (...statuses: Status[]): boolean  => {
    return statuses.findIndex(s => s === Status.ERROR) >= 0;
};
