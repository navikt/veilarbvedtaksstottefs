import dialogMsgBilde from './dialog-msg.svg';
import dialogNewMsgBilde from './dialog-new-msg.svg';
import './dialog-section-minified.less';
import { useDialogSection } from '../../../store/dialog-section-store';

export function DialogSectionMinified() {
	const { harNyeMeldinger } = useDialogSection();

	let bilde;
	let bildeAlt;

	if (harNyeMeldinger) {
		bilde = dialogNewMsgBilde;
		bildeAlt = 'Du har en eller flere nye meldinger';
	} else {
		bilde = dialogMsgBilde;
		bildeAlt = 'Du har ingen nye meldinger';
	}

	return (
		<div className="dialog-section-minified">
			<img src={bilde} alt={bildeAlt} className="dialog-section-minified__dialog-img" />
		</div>
	);
}
