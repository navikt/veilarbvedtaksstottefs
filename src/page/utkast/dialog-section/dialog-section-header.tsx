import { Undertittel } from 'nav-frontend-typografi';
import { DialogTipsInnhold } from './dialog-tips-innhold';
import { OrNothing } from '../../../util/type/ornothing';
import { TipsPopover } from '../../../component/tips-popover/tips-popover';
import { Label, LabelType } from '../../../component/label/label';
import { DialogToggleBtn } from '../dialog-section-minified/dialog-toggle-btn';
import { useTilgangStore } from '../../../store/tilgang-store';
import env from '../../../util/environment';
import { Button } from '@navikt/ds-react';
import { TasklistIcon } from '@navikt/aksel-icons';
import './dialog-section.less';

interface DialogPanelHeaderProps {
	beslutterNavn?: OrNothing<string>;
}

function utledOversiktUrl(): string {
	if (env.isRunningOnGhPages || env.isDevelopment) {
		return 'https://navikt.github.io/beslutteroversikt';
	} else if (env.erITestMiljo) {
		return 'https://beslutteroversikt.intern.dev.nav.no';
	} else {
		return 'https://beslutteroversikt.intern.nav.no';
	}
}

export function DialogSectionHeader(props: DialogPanelHeaderProps) {
	const { erBeslutter } = useTilgangStore();

	return (
		<header className="dialog-section-header">
			<DialogToggleBtn />

			<div className="dialog-section-header__innhold">
				<Undertittel className="dialog-section-header__tittel">Kvalitetssikring</Undertittel>
				<TipsPopover
					id="dialog-tips"
					className="dialog-section-header__tips"
					tipsInnhold={<DialogTipsInnhold />}
					ariaLabel="Tips for kvalitetssikring"
					placement="bottom"
				/>

				{props.beslutterNavn && (
					<Label titleText="Ansvarlig" valueText={props.beslutterNavn} labelType={LabelType.SMALL} />
				)}

				{erBeslutter && (
					<Button
						as="a"
						size="small"
						variant="tertiary"
						icon={<TasklistIcon />}
						href={utledOversiktUrl()}
						title="Oversikt § 14 a kvalitetssikring"
						className="dialog-section-header__oversikt-lenke"
					/>
				)}
			</div>
		</header>
	);
}
