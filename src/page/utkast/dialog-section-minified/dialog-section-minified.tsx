import { ChatIcon, ChatExclamationmarkIcon } from '@navikt/aksel-icons';
import './dialog-section-minified.less';
import { useDialogSection } from '../../../store/dialog-section-store';

export function DialogSectionMinified() {
	const { harNyeMeldinger } = useDialogSection();

	const DialogIkon = harNyeMeldinger ? ChatExclamationmarkIcon : ChatIcon;
	const bildeAlt = harNyeMeldinger ? 'Du har en eller flere nye meldinger' : 'Du har ingen nye meldinger';

	return (
		<div className="dialog-section-minified">
			<DialogIkon title={bildeAlt} className="dialog-section-minified__dialog-img" />
		</div>
	);
}
