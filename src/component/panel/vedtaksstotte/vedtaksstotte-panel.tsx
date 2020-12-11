import React from 'react';
import cls from 'classnames';
import { HovedsidePanel } from '../hovedside-panel/hovedside-panel';
import { Undertittel } from 'nav-frontend-typografi';
import './vedtaksstotte-panel.less';

interface VedtaksstottePanelProps {
	tittel: string;
	undertittel: string;
	imgSrc: string;
	tekstKomponent: React.ReactNode;
	knappKomponent?: React.ReactNode;
	panelKlasse?: string;
	undertittelClassName?: string;
}

export function VedtaksstottePanel(props: VedtaksstottePanelProps) {
	const { tittel, undertittel, imgSrc, tekstKomponent, knappKomponent, panelKlasse, undertittelClassName } = props;
	return (
		<HovedsidePanel className={cls('vedtakstottepanel', panelKlasse)}>
			<div className="vedtakstottepanel__tittel">
				<Undertittel tag="h1">{tittel}</Undertittel>
			</div>
			<div className="vedtakstottepanel__content">
				<img src={imgSrc} className="vedtakstottepanel__ikon" alt="" />
				<div>
					<Undertittel className={cls('vedtakstottepanel__undertittel', undertittelClassName)}>
						{undertittel}
					</Undertittel>
					<div className="vedtakstottepanel__tekst">{tekstKomponent}</div>
					{knappKomponent}
				</div>
			</div>
		</HovedsidePanel>
	);
}
