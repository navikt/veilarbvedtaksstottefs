import React from 'react';
import { useAppStore } from './app-store';
import { useDataStore } from './data-store';
import { useDataFetcherStore } from './data-fetcher-store';
import { useViewStore } from './view-store';
import { useModalStore } from './modal-store';
import { useSkjemaStore } from './skjema-store';
import { useInnloggetVeilederStore } from './innlogget-veileder-store';

interface StoreProviderProps {
	fnr: string;
	enhetId?: string;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<useAppStore.Provider fnr={props.fnr} enhetId={props.enhetId}>
			<useDataFetcherStore.Provider>
				<useDataStore.Provider>
					<useInnloggetVeilederStore.Provider>
						<useViewStore.Provider>
							<useModalStore.Provider>
								<useSkjemaStore.Provider>
									{props.children}
								</useSkjemaStore.Provider>
							</useModalStore.Provider>
						</useViewStore.Provider>
					</useInnloggetVeilederStore.Provider>
				</useDataStore.Provider>
			</useDataFetcherStore.Provider>
		</useAppStore.Provider>
	);
};

export default StoreProvider;
