import React, { useEffect, useState } from 'react';
import { VisOpplysning } from './vis-opplysning/vis-opplysning';
import { RedigerOpplysning } from './rediger-opplysning/rediger-opplysning';
import { LeggTilOpplysning } from './legg-til-opplysning/legg-til-opplysning';
import { Normaltekst } from 'nav-frontend-typografi';
import { OpplysningerHjelpeTekster } from './hjelpetekst-opplysninger';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import { lagSkjemaElementFeil, mergeMedDefaultOpplysninger } from '../skjema-utils';
import './opplysninger.less';
import { useFetchStore } from '../../../stores/fetch-store';
import { finnUtkast } from '../../../utils';

export interface Opplysning {
	navn: string;
	erValgt: boolean;
}

function Opplysninger() {
	const { vedtak } = useFetchStore();
	const { opplysninger: skjemaOpplysninger, setOpplysninger: setSkjemaOpplysninger, errors } = useSkjemaStore();
	const [ opplysninger, setOpplysninger ] = useState<Opplysning[]>([]);
	const [redigeringModusIndeks, setRedigeringModusIndeks] = useState<number>(-1);
	const [visLeggTilNyOpplysning, setVisLeggTilNyOpplysning] = useState<boolean>(true);
	const [sistEndretIndeks, setSistEndretIndeks] = useState<number>(-1);

	const utkast = finnUtkast(vedtak.data);

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
		const harIkkeInitialisertOpplysninger = Object.keys(opplysninger).length === 0;
		const harInitialisertSkjemaOpplysninger = utkast.opplysninger.length === skjemaOpplysninger.length;

		// Siden useEffecten i vedtaksskjema-side kjører etter at denne blir mountet, så må vi gjøre en ekstra sjekk på
		// om skjemaOpplysninger har blitt initialisert ved å sammenligne de med opplysningene fra utkastet
		if (harIkkeInitialisertOpplysninger && harInitialisertSkjemaOpplysninger) {
			setOpplysninger(mergeMedDefaultOpplysninger(skjemaOpplysninger));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [skjemaOpplysninger]);

	useEffect(() => {
		const valgteOpplysninger = opplysninger
			.filter(opplysning => opplysning.erValgt)
			.map(opplysning => opplysning.navn);

		setSkjemaOpplysninger(valgteOpplysninger);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [opplysninger]);

	return (
		<SkjemaBolk id="opplysninger-scroll-to" tittel="Kilder" tittelId="kilder-tittel">
			<div className="opplysninger">
				<Normaltekst>Velg eller skriv inn kilder som vises i vedtaksbrevet.</Normaltekst>
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
				<OpplysningerHjelpeTekster />
			</div>
		</SkjemaBolk>
	);
}

export default Opplysninger;
