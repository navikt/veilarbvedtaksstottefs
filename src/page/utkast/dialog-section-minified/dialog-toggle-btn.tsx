import { useDialogSection } from '../../../store/dialog-section-store';
import { Button } from '@navikt/ds-react';
import { ChevronLeftDoubleIcon, ChevronRightDoubleIcon } from '@navikt/aksel-icons';

export function DialogToggleBtn() {
	const { showSection, setShowSection } = useDialogSection();

	function onClickToggleDialogSection() {
		setShowSection(prevShow => !prevShow);
	}

	return (
		<Button
			variant="tertiary"
			icon={
				showSection ? (
					<ChevronRightDoubleIcon title="Lukk dialog-seksjon" />
				) : (
					<ChevronLeftDoubleIcon title="Åpne dialog-seksjon" />
				)
			}
			className="dialog-section__toggle_btn"
			onClick={onClickToggleDialogSection}
		/>
	);
}
