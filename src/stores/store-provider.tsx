import React from 'react';
import { useAppStore } from './app-store';
import { useDataStore } from './data-store';
import { useDataFetcherStore } from './data-fetcher-store';
import { useViewStore } from './view-store';
import { useModalStore } from './modal-store';
import { useSkjemaStore } from './skjema-store';
import { useTilgangStore } from './tilgang-store';
import { SkjemaStoreSync } from './sync/skjema-store-sync';
import { DataStoreSync } from './sync/data-store-sync';
import { TilgangStoreSync } from './sync/tilgang-store-sync';

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
					<useTilgangStore.Provider>
						<useViewStore.Provider>
							<useModalStore.Provider>
								<useSkjemaStore.Provider>
									{props.children}
									<SkjemaStoreSync />
									<DataStoreSync />
									<TilgangStoreSync />
								</useSkjemaStore.Provider>
							</useModalStore.Provider>
						</useViewStore.Provider>
					</useTilgangStore.Provider>
				</useDataStore.Provider>
			</useDataFetcherStore.Provider>
		</useAppStore.Provider>
	);
};

export default StoreProvider;
