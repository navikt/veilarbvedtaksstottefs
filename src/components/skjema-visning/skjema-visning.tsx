import React from 'react';
import { VedtakData } from '../../rest/data/vedtak';
import { HovedmalVisning } from './hovedmal-visning';
import { BegrunnelseVisning } from './begrunnelse-visning';
import { InnsatsgruppeVisning } from './innsatsgruppe-visning';
import { OpplysningerVisning } from './opplysninger-visning';
import { useViewStore, ViewType } from '../../stores/view-store';
import './skjema-visning.less';

export function SkjemaVisning(props: { vedtak: VedtakData }) {
	const { changeView } = useViewStore();
	const { id, hovedmal, opplysninger, innsatsgruppe, begrunnelse, beslutterNavn } = props.vedtak;

	return (
		<>
			<InnsatsgruppeVisning innsatsgruppe={innsatsgruppe} beslutterNavn={beslutterNavn} />
			<HovedmalVisning hovedmal={hovedmal} />
			<BegrunnelseVisning begrunnelse={begrunnelse} />
			<OpplysningerVisning opplysninger={opplysninger} />
			<button
				className="lenke oyblikksbilde-lenke"
				onClick={() => changeView(ViewType.VEDLEGG, { vedtakId: id })}
			>
				Brukerinformasjon på vedtakstidspunktet
			</button>
		</>
	);
}
