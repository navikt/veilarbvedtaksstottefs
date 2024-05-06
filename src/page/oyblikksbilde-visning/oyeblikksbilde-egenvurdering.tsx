import { Systemtittel } from 'nav-frontend-typografi';
import { Alert, BodyShort, Link } from '@navikt/ds-react';
import Card from '../../component/card/card';
import OyblikksbildeType from '../../util/type/oyblikksbilde-type';
import { ReactComponent as FilePdfIkon } from './icons/filepdficon.svg';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentEgenvurderingOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { useEffect } from 'react';
import Spinner from '../../component/spinner/spinner';
import { logMetrikk } from '../../util/logger';
import { useViewStore, ViewType } from '../../store/view-store';
import { formatDates } from './oyblikksbilde-fikser';
import './css/json-viewer.less';
import { EgenvurderingDto } from './dto/EgenvurderingDto';

export function OyeblikksbildeEgenvurdering(props: { vedtakId: number }): JSX.Element {
	const oyeblikksbildeFetcher = useAxiosFetcher(hentEgenvurderingOyblikksbilde);

	useEffect(() => {
		oyeblikksbildeFetcher.fetch(props.vedtakId);
		logMetrikk('vis-oyblikksbilde-registering');
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
			<Systemtittel tag="h2" className="vedlegg-card__header">
				Svarene dine om behov for veiledning
			</Systemtittel>
			<div className="innhold">
				{data == null && (
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
				{data?.svar && (
					<>
						<div className="json-array-wrapper">
							<h3 className="json-key">Svar</h3>
							<ul className="json-array">
								{data.svar.map((svar, i) => (
									<li key={i}>
										{svar.spm && (
											<div className="json-key-wrapper">
												<span className="json-key">Spørsmål: </span>
												<span>{svar.spm}</span>
											</div>
										)}
										{svar.svar && (
											<div className="json-key-wrapper">
												<span className="json-key">Svar: </span>
												<span>{svar.svar}</span>
											</div>
										)}
										{svar.dialogId && (
											<div className="json-key-wrapper">
												<span className="json-key">DialogId: </span>
												<span>{svar.dialogId}</span>
											</div>
										)}
									</li>
								))}
							</ul>
						</div>
					</>
				)}
			</div>
			{props.erJournalfort && (
				<div className="oyeblikk-pdf">
					<Link onClick={() => visOyeblikkbildePdf(props.vedtakId, OyblikksbildeType.EGENVURDERING)}>
						<div className="oyblikksbilde-visning-pdf-ikon">
							<FilePdfIkon title="a11y-title" height="1em" width="1em" fontSize="1.75rem" />
						</div>
						<BodyShort size="small" className="file_tittel">
							Svarene_dine_om_behov_for_veiledning.pdf
						</BodyShort>
					</Link>
				</div>
			)}
		</Card>
	);
}
