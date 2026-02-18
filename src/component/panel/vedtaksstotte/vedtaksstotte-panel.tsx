import React from 'react';
import cls from 'classnames';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import { Detail, Heading, VStack } from '@navikt/ds-react';
import './vedtaksstotte-panel.css';

interface VedtaksstottePanelProps {
	tittel: string;
	undertittel: string;
	detaljer?: string;
	imgSrc: string;
	tekstKomponent: React.ReactNode;
	knappKomponent?: React.ReactNode;
	panelKlasse?: string;
}

export function VedtaksstottePanel({
	tittel,
	undertittel,
	imgSrc,
	tekstKomponent,
	knappKomponent,
	panelKlasse,
	detaljer
}: VedtaksstottePanelProps) {
	return (
		<HovedsidePanel className={cls('vedtakstottepanel', panelKlasse)}>
			<Heading size="small" level="2" className="vedtakstottepanel__tittel">
				{tittel}
			</Heading>
			<div className="vedtakstottepanel__content">
				<img src={imgSrc} className="vedtakstottepanel__ikon" alt="" />
				<VStack gap="space-8" align="start">
					<hgroup>
						<Heading size="small" level="3">
							{undertittel}
						</Heading>
						{detaljer && <Detail textColor="subtle">{detaljer}</Detail>}
					</hgroup>
					<div>{tekstKomponent}</div>
					{knappKomponent}
				</VStack>
			</div>
		</HovedsidePanel>
	);
}
