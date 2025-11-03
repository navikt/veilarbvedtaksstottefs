import { useState } from 'react';
import cls from 'classnames';
import { DialogMelding } from './dialog-melding/dialog-melding';
import { SystemMelding } from './system-melding/system-melding';
import './melding-liste.less';
import {
	DialogMelding as DialogMeldingData,
	SystemMelding as SystemMeldingData
} from '../../../../api/veilarbvedtaksstotte/meldinger';
import { MeldingType } from '../../../../util/type/melding-type';
import dayjs from 'dayjs';

interface MeldingListeProps {
	meldinger: (DialogMeldingData | SystemMeldingData)[];
	innloggetVeilederIdent: string;
}

function mapTilDialogMeldingView(
	melding: DialogMeldingData,
	key: number,
	isNewAfter: Date,
	innloggetVeilederIdent: string
) {
	const skrevetAvMeg = melding.opprettetAvIdent === innloggetVeilederIdent;
	const ariaLive = dayjs(melding.opprettet).isAfter(isNewAfter) ? 'polite' : undefined;

	const wrapperClasses = {
		'melding-wrapper--til-meg': !skrevetAvMeg,
		'melding-wrapper--fra-meg': skrevetAvMeg
	};

	return (
		<div aria-live={ariaLive} className={cls('melding-wrapper', wrapperClasses)} key={key}>
			<DialogMelding
				dato={melding.opprettet}
				tekst={melding.melding}
				skrevetAvNavn={melding.opprettetAvNavn as string}
				skrevetAvMeg={skrevetAvMeg}
			/>
		</div>
	);
}

function mapTilSystemMeldingView(melding: SystemMeldingData, key: number, isNewAfter: Date) {
	const ariaLive = dayjs(melding.opprettet).isAfter(isNewAfter) ? 'polite' : undefined;

	return (
		<div aria-live={ariaLive} className="melding-wrapper melding-wrapper--system" key={key}>
			<SystemMelding systemMeldingType={melding.systemMeldingType} utfortAvNavn={melding.utfortAvNavn} />
		</div>
	);
}

export const MeldingListe = (props: MeldingListeProps) => {
	// Brukes for å legge på aria-live for opplesing av nye meldinger
	const [mountTime] = useState(() => new Date());

	const { innloggetVeilederIdent, meldinger } = props;

	return (
		<>
			{meldinger.map((melding, idx) => {
				return melding.type === MeldingType.DIALOG_MELDING
					? mapTilDialogMeldingView(melding as DialogMeldingData, idx, mountTime, innloggetVeilederIdent)
					: mapTilSystemMeldingView(melding as SystemMeldingData, idx, mountTime);
			})}
		</>
	);
};
