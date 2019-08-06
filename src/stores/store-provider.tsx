import React from 'react';
import { useAppStore } from './app-store';
import { useFetchStore } from './fetch-store';
import { useViewStore } from './view-store';
import { useModalStore } from './modal-store';
import { useSkjemaStore } from './skjema-store';

interface StoreProviderProps {
	fnr: string;
	enhetId?: string;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<useAppStore.Provider fnr={props.fnr} enhetId={props.enhetId}>
			<useFetchStore.Provider>
				<useViewStore.Provider>
					<useModalStore.Provider>
						<useSkjemaStore.Provider>{props.children}</useSkjemaStore.Provider>
					</useModalStore.Provider>
				</useViewStore.Provider>
			</useFetchStore.Provider>
		</useAppStore.Provider>
	);
};

export default StoreProvider;
