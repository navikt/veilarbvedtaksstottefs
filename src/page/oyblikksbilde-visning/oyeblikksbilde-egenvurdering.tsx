import { useEffect } from 'react';
import Spinner from '../../component/spinner/spinner';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentEgenvurderingOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { logMetrikk } from '../../util/logger';
import { useViewStore, ViewType } from '../../store/view-store';
import { formatDates } from './oyeblikksbilde-fikser';
import { EgenvurderingDto } from './dto/EgenvurderingDto';
import { visEnkelVerdi } from './oyeblikksbilde-cv';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading } from '@navikt/ds-react';

export function OyeblikksbildeEgenvurdering(props: { vedtakId: number }): JSX.Element {
	const oyeblikksbildeFetcher = useAxiosFetcher(hentEgenvurderingOyblikksbilde);

	useEffect(() => {
		oyeblikksbildeFetcher.fetch(props.vedtakId);
		logMetrikk('vis-oyblikksbilde-egenvurdering');
		// eslint-disable-next-line
	}, [props.vedtakId]);

	if (oyeblikksbildeFetcher.loading) {
		return <Spinner />;
	} else if (oyeblikksbildeFetcher.error) {
		return (
			<Alert variant="error" className="vedtaksstotte-alert">
				Det oppnås for tiden ikke kontakt med alle baksystemer. Vi jobber med å løse saken. Vennligst prøv igjen
				senere.
			</Alert>
		);
	} else if (oyeblikksbildeFetcher.data) {
		return (
			<OyeblikksdataEgenvurderingInnhold
				data={oyeblikksbildeFetcher.data.data}
				erJournalfort={oyeblikksbildeFetcher.data.journalfort}
				vedtakId={props.vedtakId}
			/>
		);
	} else {
		return <></>;
	}
}

function OyeblikksdataEgenvurderingInnhold(props: {
	data: EgenvurderingDto | null;
	erJournalfort: boolean;
	vedtakId: number;
}) {
	const { changeView } = useViewStore();

	const visOyeblikkbildePdf = (vedtakId: number, oyeblikksbildeType: string) => {
		changeView(ViewType.VEDTAK_OYEBLIKKSBILDE_PDF, { vedtakId: vedtakId, oyeblikksbildeType: oyeblikksbildeType });
		logMetrikk('vis-oyeblikksbilde-vedtak', { oyeblikksbildeType: oyeblikksbildeType });
	};

	const data = props.data;

	return (
		<Card className="vedlegg-card">
			<Heading size="medium" level="2" spacing>
				Svarene dine om behov for veiledning
			</Heading>
			{(data == null || data.sistOppdatert == null) && (
				<>
					<b>Ingen registrerte data:</b> Personen har ikke registrert svar om behov for veiledning.
				</>
			)}
			{data?.sistOppdatert && (
				<>
					<span className="json-key">Sist oppdatert: </span>
					{formatDates(data.sistOppdatert)}
				</>
			)}
			{data?.svar && data?.svar.length > 0 && (
				<div className="json-array-wrapper">
					<h3 className="json-key">Svar</h3>
					<ul className="json-array">
						{data.svar.map((svar, i) => (
							<li key={'svar-' + i}>
								{svar.spm && visEnkelVerdi('Spørsmål', svar.spm)}
								{svar.svar && visEnkelVerdi('Svar', svar.svar)}
								{svar.dialogId && visEnkelVerdi('DialogId', svar.dialogId)}
							</li>
						))}
					</ul>
				</div>
			)}
			{props.erJournalfort && (
				<Button
					variant="tertiary"
					icon={<FilePdfIcon />}
					onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.EGENVURDERING)}
				>
					Svarene_dine_om_behov_for_veiledning.pdf
				</Button>
			)}
		</Card>
	);
}
