import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { DialogTipsInnhold } from './dialog-tips-innhold';
import { PopoverOrientering } from 'nav-frontend-popover';
import './dialog-section.less';
import { OrNothing } from '../../../util/type/ornothing';
import { TipsPopover } from '../../../component/tips-popover/tips-popover';
import Show from '../../../component/show';
import { Label, LabelType } from '../../../component/label/label';
import { DialogToggleBtn } from '../dialog-section-minified/dialog-toggle-btn';
import Lenke from 'nav-frontend-lenker';
import tilOversiktBilde from './til-oversikt.svg';
import { useTilgangStore } from '../../../store/tilgang-store';
import env from '../../../util/environment';

interface DialogPanelHeaderProps {
	beslutterNavn?: OrNothing<string>;
}

function utledOversiktUrl(): string {
	if (env.isRunningOnGhPages || env.isDevelopment) {
		return 'https://navikt.github.io/beslutteroversikt';
	} else if (env.erITestMiljo) {
		return 'https://app-q1.adeo.no/beslutteroversikt';
	} else {
		return 'https://app.adeo.no/beslutteroversikt';
	}
}

export function DialogSectionHeader(props: DialogPanelHeaderProps) {
	const { erBeslutter } = useTilgangStore();

	return (
		<header className="dialog-section-header">
			<div className="dialog-section-header__toggle-btn-wrapper">
				<DialogToggleBtn />
			</div>

			<div className="dialog-section-header__innhold">
				<Undertittel className="dialog-section-header__tittel">Kvalitetssikring</Undertittel>
				<TipsPopover
					id="dialog-tips"
					className="dialog-section-header__tips"
					tipsInnhold={<DialogTipsInnhold />}
					ariaLabel="Tips for kvalitetssikring"
					orientering={PopoverOrientering.UnderHoyre}
				/>
				<Show if={props.beslutterNavn}>
					<Label titleText="Ansvarlig" valueText={props.beslutterNavn} labelType={LabelType.SMALL} />
				</Show>

				<Show if={erBeslutter}>
					<Lenke
						title="Til kvalitetssikring oversikt for 14a"
						href={utledOversiktUrl()}
						className="dialog-section-header__oversikt-lenke"
					>
						<img src={tilOversiktBilde} alt="Til kvalitetssikring oversikt for 14a" />
					</Lenke>
				</Show>
			</div>
		</header>
	);
}
