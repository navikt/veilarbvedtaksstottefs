import React from 'react';
import { useAppStore } from './app-store';
import { useDataStore } from './data-store';
import { useViewStore } from './view-store';
import { useModalStore } from './modal-store';
import { useSkjemaStore } from './skjema-store';
import { useTilgangStore } from './tilgang-store';

interface StoreProviderProps {
	fnr: string;
	enhetId?: string;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<useAppStore.Provider fnr={props.fnr} enhetId={props.enhetId}>
				<useDataStore.Provider>
					<useTilgangStore.Provider>
						<useViewStore.Provider>
							<useModalStore.Provider>
								<useSkjemaStore.Provider>
									{props.children}
								</useSkjemaStore.Provider>
							</useModalStore.Provider>
						</useViewStore.Provider>
					</useTilgangStore.Provider>
				</useDataStore.Provider>
		</useAppStore.Provider>
	);
};

export default StoreProvider;
