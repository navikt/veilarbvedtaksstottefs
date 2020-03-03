import React from 'react';
import cls from 'classnames';
import { DialogMelding } from '../../../rest/data/dialog-melding';
import { Melding, SkrevetAv } from './melding/melding';
import './melding-liste.less';
import { finnSkrevetAv } from '../../../utils';

interface MeldingListeProps {
	meldinger: DialogMelding[];
	innloggetVeilederIdent: string;
	className?: string;
}

function mapMeldingTilDialogView(melding: DialogMelding, skrevetAv: SkrevetAv) {
	const wrapperClasses = {
		'melding-wrapper--til-meg': skrevetAv === SkrevetAv.ANNEN,
		'melding-wrapper--fra-meg': skrevetAv === SkrevetAv.MEG,
		'melding-wrapper--system': skrevetAv === SkrevetAv.SYSTEM
	};

	return (
		<div className={cls('melding-wrapper', wrapperClasses)}>
			<Melding
				dato={melding.dato}
				tekst={melding.tekst}
				skrevetAvNavn={melding.skrevetAvNavn}
				skrevetAv={skrevetAv}
			/>
		</div>
	);
}

export const MeldingListe = (props: MeldingListeProps) => {
	const { innloggetVeilederIdent, meldinger, className } = props;
    return (
    	<div className={cls('melding-liste', className)}>
		    {meldinger.map((melding) => mapMeldingTilDialogView(melding, finnSkrevetAv(melding, innloggetVeilederIdent)))}
	    </div>
    );
};
