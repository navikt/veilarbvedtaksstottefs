import React, {useEffect, useRef} from 'react';
import cls from 'classnames';
import {
	DialogMelding as DialogMeldingData,
	SystemMelding as SystemMeldingData
} from '../../../../rest/data/melding';
import './melding-liste.less';
import { MeldingType } from '../../../../utils/types/melding-type';
import { DialogMelding } from './dialog-melding/dialog-melding';
import { SystemMelding } from './system-melding/system-melding';

interface MeldingListeProps {
	meldinger: Array<DialogMeldingData | SystemMeldingData>;
	innloggetVeilederIdent: string;
	className?: string;
}

function mapMeldingTilDialogView(melding: DialogMeldingData, key: number, innloggetVeilederIdent: string) {
	const skrevetAvMeg = melding.opprettetAvIdent === innloggetVeilederIdent;

	const wrapperClasses = {
		'melding-wrapper--til-meg': !skrevetAvMeg,
		'melding-wrapper--fra-meg': skrevetAvMeg
	};

	return (
		<div className={cls('melding-wrapper', wrapperClasses)} key={key}>
			<DialogMelding
				dato={melding.opprettet}
				tekst={melding.melding}
				skrevetAvNavn={melding.opprettetAvNavn as string}
				skrevetAvMeg={skrevetAvMeg}
			/>
		</div>
	);
}

function mapMeldingTilSystemView(melding: SystemMeldingData, key: number) {

	return (
		<div className="melding-wrapper--system" key={key}>
			<SystemMelding systemMeldingType={melding.systemMeldingType}
						   utfortAvNavn={melding.utfortAvNavn}
			/>
		</div>
	);
}

export const MeldingListe = (props: MeldingListeProps) => {
	const { innloggetVeilederIdent, meldinger, className } = props;
	const listeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (listeRef.current) {
			listeRef.current.scrollTop = listeRef.current.scrollHeight;
		}
	}, [meldinger]);

    return (
    	<div ref={listeRef} className={cls('melding-liste', className)}>
		    {meldinger.map((melding, idx) => {
				melding.type === MeldingType.DIALOG_MELDING ?
		    			mapMeldingTilDialogView(melding as DialogMeldingData, idx, innloggetVeilederIdent)
					  : mapMeldingTilSystemView(melding as SystemMeldingData, idx);
			})}
	    </div>
    );
};
