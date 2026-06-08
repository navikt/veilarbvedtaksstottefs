import { InfoCard, Link, List } from '@navikt/ds-react';

export function AAPvarsel(className?: string) {
	return (
		<InfoCard data-color="info" size="small" className={className}>
			<InfoCard.Header>
				<InfoCard.Title>
					Gjør dette når bruker skal ha AAP under vurdering for uføretrygd (§ 11-18):
				</InfoCard.Title>
			</InfoCard.Header>
			<InfoCard.Content>
				<List size="small">
					<List.Item>
						<b>Arena-sak:</b> Send Gosys-oppgave til Nav arbeid og ytelser, se{' '}
						<Link
							href="https://navno.sharepoint.com/sites/fag-og-ytelser-regelverk-og-rutiner/SitePages/Arbeidsevnen%20avklart%20mot%20varig%20tilpasset%20innsats.aspx?web=1"
							target="_blank"
							rel="noopener noreferrer"
						>
							servicerutine på Navet
						</Link>
						.
					</List.Item>
					<List.Item>
						<b>Kelvin-sak:</b> Opprett revurderingsoppgave, se{' '}
						<Link
							href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsavklaringspenger/SitePages/Vurdering-for-uf%C3%B8retrygd.aspx"
							target="_blank"
							rel="noopener noreferrer"
						>
							Kelvinrutine på Navet
						</Link>
						.
					</List.Item>
				</List>
			</InfoCard.Content>
		</InfoCard>
	);
}
