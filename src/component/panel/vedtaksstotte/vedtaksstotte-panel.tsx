import React from 'react';
import cls from 'classnames';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import { Detail, Heading, VStack } from '@navikt/ds-react';
import './vedtaksstotte-panel.css';

interface VedtaksstottePanelProps {
	tittel: string;
	undertittel: string;
	innsatsgruppe?: string;
	imgSrc: string;
	tekstKomponent: React.ReactNode;
	knappKomponent?: React.ReactNode;
	panelKlasse?: string;
}

export function VedtaksstottePanel(props: VedtaksstottePanelProps) {
	const { tittel, undertittel, imgSrc, tekstKomponent, knappKomponent, panelKlasse, innsatsgruppe } = props;
	return (
		<HovedsidePanel className={cls('vedtakstottepanel', panelKlasse)}>
			<Heading size="small" level="2" className="vedtakstottepanel__tittel">
				{tittel}
			</Heading>
			<div className="vedtakstottepanel__content">
				<img src={imgSrc} className="vedtakstottepanel__ikon" alt="" />
				<VStack gap="2" align="start">
					<hgroup>
						<Heading size="small" level="3">
							{undertittel}
						</Heading>
						{innsatsgruppe && <Detail textColor="subtle">{innsatsgruppe}</Detail>}
					</hgroup>
					<div>{tekstKomponent}</div>
					{knappKomponent}
				</VStack>
			</div>
		</HovedsidePanel>
	);
}
