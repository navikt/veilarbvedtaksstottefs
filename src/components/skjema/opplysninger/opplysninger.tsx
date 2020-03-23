import React, { useEffect, useState } from 'react';
import { VisOpplysning } from './vis-opplysning/vis-opplysning';
import { RedigerOpplysning } from './rediger-opplysning/rediger-opplysning';
import { LeggTilOpplysning } from './legg-til-opplysning/legg-til-opplysning';
import { Normaltekst } from 'nav-frontend-typografi';
import { OpplysningerHjelpetekster } from './opplysninger-hjelpetekster';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { lagSkjemaElementFeil, mergeMedDefaultOpplysninger } from '../skjema-utils';
import { useFetchStore } from '../../../stores/fetch-store';
import { MalformPanel } from './malform-panel/malform-panel';
import { useIsAfterFirstRender } from '../../../utils/hooks';
import './opplysninger.less';
import { useSkjemaTilgangStore } from '../../../stores/skjema-tilgang-store';

export interface Opplysning {
	navn: string;
	erValgt: boolean;
}

function Opplysninger() {
	const { malform } = useFetchStore();
	const { opplysninger: skjemaOpplysninger, setOpplysninger: setSkjemaOpplysninger, errors } = useSkjemaStore();
	const { isReadOnly } = useSkjemaTilgangStore();
	const [ opplysninger, setOpplysninger ] = useState<Opplysning[]>(mergeMedDefaultOpplysninger(skjemaOpplysninger));
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

	return (
		<SkjemaBolk className="opplysninger-skjema-bolk" id="opplysninger-scroll-to" tittel="Kilder" tittelId="kilder-tittel">
			<div className="opplysninger">
				<div>
					<Normaltekst className="blokk-xxs">Velg eller skriv inn kilder som vises i vedtaksbrevet.</Normaltekst>
					<div className="opplysninger__innhold">
						<SkjemaGruppe aria-labelledby="kilder-tittel" feil={lagSkjemaElementFeil(errors.opplysninger)}>
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
										disabled={isReadOnly}
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
								disabled={isReadOnly}
								leggTilOpplysning={() => {
									setVisLeggTilNyOpplysning(false);
									nullstilState();
								}}
							/>
						) : (
							<RedigerOpplysning
								opplysning={{ navn: '', erValgt: true }}
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
				<div className="opplysninger__malform-tips">
					<MalformPanel malform={malform.data && malform.data.malform}/>
					<OpplysningerHjelpetekster />
				</div>
			</div>
		</SkjemaBolk>
	);
}

export default Opplysninger;
