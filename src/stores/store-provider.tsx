import React from 'react';
import { useAppStore } from './app-store';
import { useFetchStore } from './fetch-store';
import { useViewStore } from './view-store';
import { useModalStore } from './modal-store';
import { useSkjemaStore } from './skjema-store';
import { useBeslutterStore } from './beslutter-store';
import { useTaOverVedtakStore } from './taover-stor';
import { useSkjemaTilgangStore } from './skjema-tilgang-store';

interface StoreProviderProps {
	fnr: string;
	enhetId?: string;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<useAppStore.Provider fnr={props.fnr} enhetId={props.enhetId}>
			<useBeslutterStore.Provider>
				<useTaOverVedtakStore.Provider>
					<useFetchStore.Provider>
						<useViewStore.Provider>
							<useModalStore.Provider>
								<useSkjemaTilgangStore.Provider>
									<useSkjemaStore.Provider>{props.children}</useSkjemaStore.Provider>
								</useSkjemaTilgangStore.Provider>
							</useModalStore.Provider>
						</useViewStore.Provider>
					</useFetchStore.Provider>
				</useTaOverVedtakStore.Provider>
			</useBeslutterStore.Provider>
		</useAppStore.Provider>
	);
};

export default StoreProvider;
