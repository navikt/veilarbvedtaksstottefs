import React, { useEffect, useRef } from 'react';
import cls from 'classnames';
import { DialogMelding as DialogMeldingData } from '../../../../rest/data/dialog-melding';
import { isNothing } from '../../../../utils';
import { SystemMelding } from './system-melding/system-melding';
import { DialogMelding } from './dialog-melding/dialog-melding';
import './melding-liste.less';

interface MeldingListeProps {
	meldinger: DialogMeldingData[];
	innloggetVeilederIdent: string;
	className?: string;
}

function mapMeldingTilDialogView(melding: DialogMeldingData, key: number, innloggetVeilederIdent: string) {
	const erSystemMelding = isNothing(melding.opprettetAvIdent);
	const skrevetAvMeg = melding.opprettetAvIdent === innloggetVeilederIdent;

	const wrapperClasses = {
		'melding-wrapper--til-meg': !skrevetAvMeg,
		'melding-wrapper--fra-meg': skrevetAvMeg,
		'melding-wrapper--system': erSystemMelding
	};

	return (
		<div className={cls('melding-wrapper', wrapperClasses)} key={key}>
			{erSystemMelding
				? <SystemMelding meldingtype={melding.melding}
								 utfortAvNavn={melding.opprettetAvNavn as string}
				/>
				: (
					<DialogMelding
						dato={melding.opprettet}
						tekst={melding.melding}
						skrevetAvNavn={melding.opprettetAvNavn as string}
						skrevetAvMeg={skrevetAvMeg}
					/>
				)
			}
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
