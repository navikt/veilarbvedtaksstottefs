import { BodyShort, List, ReadMore } from '@navikt/ds-react';

export const BegrunnelseInfoboks = () => {
	return (
		<div className="begrunnelse__infoboks">
			<BodyShort size="small">
				Du må skrive begrunnelse for alle innsatsgrupper, bortsett fra «gode muligheter». Bruk hjelpespørsmålene
				når du skriver begrunnelsen og gjør vurderingene dine.
			</BodyShort>

			<ReadMore
				header="Spørsmål til hjelp i vurderingen"
				size="small"
				className="begrunnelse__read-more"
				defaultOpen={true}
			>
				<List size="small">
					<List.Item>
						Hva tenker denne personen selv om mulighetene sine til å være eller komme i jobb?
					</List.Item>
					<List.Item>
						Hvilke typer arbeid ønsker denne personen seg og hva er realistisk ut fra dagens arbeidsmarked?
					</List.Item>
					<List.Item>Hva slags veiledning trenger denne personen?</List.Item>
					<List.Item>Er jobbmulighetene begrenset, og hvorfor?</List.Item>
					<List.Item>Trenger denne personen arbeidsrettede aktiviteter og tiltak, og hvorfor?</List.Item>
				</List>
			</ReadMore>
		</div>
	);
};
