import React, { useEffect, useState } from 'react';
import { VisOpplysning } from './vis-opplysning/vis-opplysning';
import { RedigerOpplysning } from './rediger-opplysning/rediger-opplysning';
import { LeggTilOpplysning } from './legg-til-opplysning/legg-til-opplysning';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../../stores/skjema-store';
import { mergeMedDefaultOpplysninger } from '../../../../utils/skjema-utils';
import { useIsAfterFirstRender } from '../../../../utils/hooks';
import './opplysninger.less';
import { OpplysningerTipsInnhold } from './opplysninger-tips-innhold';
import { TipsPopover } from '../../../../components/tips-popover/tips-popover';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';

export interface Opplysning {
	navn: string;
	erValgt: boolean;
}

function Opplysninger() {
	const { opplysninger: skjemaOpplysninger, setOpplysninger: setSkjemaOpplysninger, errors } = useSkjemaStore();
	const [opplysninger, setOpplysninger] = useState<Opplysning[]>(mergeMedDefaultOpplysninger(skjemaOpplysninger));
	const [redigeringModusIndeks, setRedigeringModusIndeks] = useState<number>(-1);
	const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning] = useState<boolean>(true);
	const [sistEndretIndeks, setSistEndretIndeks] = useState<number>(-1);
	const isAfterFirstRender = useIsAfterFirstRender();

	function nullstilState() {
		setRedigeringModusIndeks(-1);
		setSistEndretIndeks(-1);
	}

	function handleOpplysningerChanged(index: number, opplysning: Opplysning) {
		if (!opplysning.navn.trim()) return;

		setSistEndretIndeks(index);

		setOpplysninger(prevState => {
			const opplysningerKopi = [...prevState];

			if (index === opplysninger.length) {
				opplysningerKopi.push(opplysning);
				return opplysningerKopi;
			}

			opplysningerKopi[index] = opplysning;
			return opplysningerKopi;
		});
	}

	function handleOpplysningDeleted(index: number) {
		setOpplysninger(prevState => [...prevState].filter((o, idx) => idx !== index));
	}

	function handleOpplysningerChecked(index: number, opplysning: Opplysning) {
		setOpplysninger(prevState => {
			const opplysningerKopi = [...prevState];
			opplysningerKopi[index] = opplysning;
			return opplysningerKopi;
		});
	}

	useEffect(() => {
		if (isAfterFirstRender) {
			const valgteOpplysninger = opplysninger
				.filter(opplysning => opplysning.erValgt)
				.map(opplysning => opplysning.navn);

			setSkjemaOpplysninger(valgteOpplysninger);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opplysninger]);

	const opplysningerTittel = (
		<div className="opplysninger__tittel">
			<Undertittel id="kilder-tittel">Kilder</Undertittel>
			<TipsPopover id="opplysninger-tips" tipsInnhold={<OpplysningerTipsInnhold/>} />
		</div>
	);

	return (
		<SkjemaBolk
			className="opplysninger-skjema-bolk"
			id="opplysninger-scroll-to"
			tittel={opplysningerTittel}
		>
			<div className="opplysninger">
				<Normaltekst className="blokk-xxs">Velg eller skriv inn kilder som vises i vedtaksbrevet.</Normaltekst>
				<div className="opplysninger__innhold">
					<SkjemaGruppe aria-labelledby="kilder-tittel"
								  feil={errors.opplysninger && <SkjemaelementFeilmelding>{errors.opplysninger}</SkjemaelementFeilmelding>}>
						{opplysninger.map((opplysning, index) =>
							redigeringModusIndeks !== index ? (
								<VisOpplysning
									opplysning={opplysning}
									handleOpplysning={() => {
										setRedigeringModusIndeks(index);
										setVisLeggTilNyOpplysning(true);
									}}
									key={index}
									onChange={(o) => handleOpplysningerChecked(index, o)}
									erSistEndretIndeks={index === sistEndretIndeks}
								/>
							) : (
								<RedigerOpplysning
									key={index}
									opplysning={opplysning}
									negativeBtn="DELETE"
									onTekstSubmit={endretOpplysning => {
										setRedigeringModusIndeks(-1);
										handleOpplysningerChanged(index, endretOpplysning);
									}}
									onTekstDeleteOrCancel={() => {
										handleOpplysningDeleted(index);
										nullstilState();
									}}
								/>
							)
						)}
					</SkjemaGruppe>
					{visLeggTilNyOpplysning ? (
						<LeggTilOpplysning
							leggTilOpplysning={() => {
								setVisLeggTilNyOpplysning(false);
								nullstilState();
							}}
						/>
					) : (
						<RedigerOpplysning
							opplysning={{navn: '', erValgt: true}}
							negativeBtn="CANCEL"
							onTekstSubmit={endretOpplysning => {
								handleOpplysningerChanged(opplysninger.length, endretOpplysning);
								setVisLeggTilNyOpplysning(true);
							}}
							onTekstDeleteOrCancel={() => {
								setVisLeggTilNyOpplysning(true);
							}}
						/>
					)}
				</div>
			</div>
		</SkjemaBolk>
	);
}

export default Opplysninger;
