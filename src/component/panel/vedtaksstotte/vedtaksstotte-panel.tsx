import React from 'react';
import cls from 'classnames';

import { Detail, Heading, VStack } from '@navikt/ds-react';
import './vedtaksstotte-panel.css';
import { HovedsidePanelBox } from '../hovedside-panel/hovedside-panel.tsx';

interface VedtaksstottePanelProps {
	tittel: string;
	undertittel: string;
	detaljer?: string;
	ikon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	ikonClassName?: string;
	tekstKomponent: React.ReactNode;
	knappKomponent?: React.ReactNode;
	className?: string;
}

export function VedtaksstottePanel({
	tittel,
	undertittel,
	ikon: Ikon,
	ikonClassName,
	tekstKomponent,
	knappKomponent,
	className,
	detaljer
}: VedtaksstottePanelProps) {
	return (
		<HovedsidePanelBox className={className}>
			<Heading size="small" level="2" className="vedtakstottepanel__tittel">
				{tittel}
			</Heading>
			<div className="vedtakstottepanel__content">
				<Ikon className={cls('vedtakstottepanel__ikon', ikonClassName)} aria-hidden />
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
		</HovedsidePanelBox>
	);
}
