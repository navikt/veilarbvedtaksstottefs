import { List } from '@navikt/ds-react';

export const BegrunnelseTipsInnhold = () => {
	return (
		<List size="small">
			<List.Item>Hva tenker denne personen selv om mulighetene sine til å være eller komme i jobb?</List.Item>
			<List.Item>
				Hvilke typer arbeid ønsker denne personen seg og hva er realistisk ut fra dagens arbeidsmarked?
			</List.Item>
			<List.Item>Hva slags veiledning trenger denne personen?</List.Item>
			<List.Item>Er arbeidsevnen nedsatt, og hvorfor?</List.Item>
			<List.Item>
				Trenger denne personen:
				<List size="small" className="tips__sub-liste">
					<List.Item>yrkes- og/eller karriereveiledning?</List.Item>
					<List.Item>arbeidsrettede aktiviteter og tiltak?</List.Item>
					<List.Item>behandling eller oppfølging fra helsevesenet?</List.Item>
				</List>
			</List.Item>
			<List.Item>Hva har dere blitt enige om?</List.Item>
		</List>
	);
};
