import React from 'react';
import { AppStoreProvider } from './app-store';
import { DataStoreProvider } from './data-store';
import { ViewStoreProvider } from './view-store';
import { ModalStoreProvider } from './modal-store';
import { SkjemaStoreProvider } from './skjema-store';
import { TilgangStoreProvider } from './tilgang-store';
import { VarselStoreProvider } from './varsel-store';
import { DialogSectionProvider } from './dialog-section-store';

interface StoreProviderProps {
	fnr: string;
	enhetId?: string;
	children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
	return (
		<AppStoreProvider fnr={props.fnr} enhetId={props.enhetId}>
			<DataStoreProvider>
				<TilgangStoreProvider>
					<ViewStoreProvider>
						<ModalStoreProvider>
							<VarselStoreProvider>
								<DialogSectionProvider>
									<SkjemaStoreProvider>{props.children}</SkjemaStoreProvider>
								</DialogSectionProvider>
							</VarselStoreProvider>
						</ModalStoreProvider>
					</ViewStoreProvider>
				</TilgangStoreProvider>
			</DataStoreProvider>
		</AppStoreProvider>
	);
};

export default StoreProvider;
