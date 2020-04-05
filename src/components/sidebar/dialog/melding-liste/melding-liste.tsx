import React, { useEffect, useRef } from 'react';
import cls from 'classnames';
import { DialogMelding as DialogMeldingData } from '../../../../rest/data/dialog-melding';
import { SystemMelding } from './system-melding/system-melding';
import { DialogMelding } from './dialog-melding/dialog-melding';
import './melding-liste.less';
import { MeldingType } from '../../../../utils/types/dialog-melding-type';
import Show from "../../../show";

interface MeldingListeProps {
	meldinger: DialogMeldingData[];
	innloggetVeilederIdent: string;
	className?: string;
}

function mapMeldingTilDialogView(melding: DialogMeldingData, key: number, innloggetVeilederIdent: string) {
	const erSystemMelding = melding.meldingType === MeldingType.SYSTEM;
	const skrevetAvMeg = melding.opprettetAvIdent === innloggetVeilederIdent;

	const wrapperClasses = {
		'melding-wrapper--til-meg': !skrevetAvMeg,
		'melding-wrapper--fra-meg': skrevetAvMeg,
		'melding-wrapper--system': erSystemMelding
	};

	return (
		<div className={cls('melding-wrapper', wrapperClasses)} key={key}>
			<Show if={erSystemMelding}>
				<SystemMelding meldingtype={melding.meldingUnderType}
							   utfortAvNavn={melding.opprettetAvNavn as string}
				/>
			</Show>
			<Show if={!erSystemMelding}>
				<DialogMelding
						dato={melding.opprettet}
						tekst={melding.melding}
						skrevetAvNavn={melding.opprettetAvNavn as string}
						skrevetAvMeg={skrevetAvMeg}
				/>
			</Show>
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
		    {meldinger.map((melding, idx) => mapMeldingTilDialogView(melding, idx, innloggetVeilederIdent))}
	    </div>
    );
};
