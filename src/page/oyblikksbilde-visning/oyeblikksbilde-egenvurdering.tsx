import { useEffect, type JSX } from 'react';
import Spinner from '../../component/spinner/spinner';
import Card from '../../component/card/card';
import OyeblikksbildeType from '../../util/type/oyblikksbilde-type';
import { useAxiosFetcher } from '../../util/use-axios-fetcher';
import { hentEgenvurderingOyblikksbilde } from '../../api/veilarbvedtaksstotte/vedtak';
import { logMetrikk } from '../../util/logger';
import { useViewStore, ViewType } from '../../store/view-store';
import { formatDates } from './oyeblikksbilde-fikser';
import { EgenvurderingDto, EgenvurderingV2Dto } from './dto/EgenvurderingDto';
import { visEnkelVerdi } from './oyeblikksbilde-cv';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { IkkeKontaktMedBaksystemFeilmelding } from '../../component/feilmelding/ikke-kontakt-med-baksystem-feilmelding';
import { OyblikksbildeEgenvurdering } from '../../util/type/oyblikksbilde';

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
		return <IkkeKontaktMedBaksystemFeilmelding />;
	} else if (oyeblikksbildeFetcher.data) {
		return (
			<OyeblikksbildeEgenvurderingCard
				data={oyeblikksbildeFetcher.data.data}
				erJournalfort={oyeblikksbildeFetcher.data.journalfort}
				type={oyeblikksbildeFetcher.data.type}
				vedtakId={props.vedtakId}
			/>
		);
	} else {
		return <></>;
	}
}

interface OyeblikksbildeEgenvurderingInnholdProps {
	data: EgenvurderingDto | EgenvurderingV2Dto | null;
	erJournalfort: boolean;
	type: OyblikksbildeEgenvurdering['type'];
	vedtakId: number;
}

function isEgenvurderingV2AndHasData(
	type: OyeblikksbildeType,
	data: EgenvurderingDto | EgenvurderingV2Dto | null
): data is EgenvurderingV2Dto {
	return type === OyeblikksbildeType.EGENVURDERING_V2 && data != null;
}

function OyeblikksbildeEgenvurderingCard({
	data,
	erJournalfort,
	type,
	vedtakId
}: OyeblikksbildeEgenvurderingInnholdProps) {
	const { changeView } = useViewStore();

	const visOyeblikkbildePdf = (vedtakId: number, oyeblikksbildeType: string) => {
		changeView(ViewType.VEDTAK_OYEBLIKKSBILDE_PDF, { vedtakId: vedtakId, oyeblikksbildeType: oyeblikksbildeType });
		logMetrikk('vis-oyeblikksbilde-vedtak', { oyeblikksbildeType: oyeblikksbildeType });
	};

	const innhold = () => {
		if (!data) {
			return (
				<p>
					<b>Ingen registrerte data:</b> Personen har ikke registrert svar om behov for veiledning.
				</p>
			);
		}
		if (isEgenvurderingV2AndHasData(type, data)) {
			return (
				<>
					{data.sendtInnTidspunkt && (
						<>
							<span className="json-key">Sendt inn: </span>
							{formatDates(data.sendtInnTidspunkt)}
						</>
					)}
					<div className="json-array-wrapper">
						<h3 className="json-key">Svar</h3>
						<ul className="json-array">
							{data.sporsmal && visEnkelVerdi('Spørsmål', data.sporsmal)}
							{data.svar && visEnkelVerdi('Svar', data.svar)}
							{data.dialogId && visEnkelVerdi('DialogId', data.dialogId.toString())}
						</ul>
					</div>
				</>
			);
		}
		return (
			<>
				{data.sistOppdatert && (
					<>
						<span className="json-key">Sist oppdatert: </span>
						{formatDates(data.sistOppdatert)}
					</>
				)}
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
			</>
		);
	};

	return (
		<Card className="vedlegg-card">
			<Heading size="medium" level="2" spacing>
				Svarene dine om behov for veiledning
			</Heading>
			{innhold()}
			{erJournalfort && (
				<Button variant="tertiary" icon={<FilePdfIcon />} onClick={() => visOyeblikkbildePdf(vedtakId, type)}>
					Svarene_dine_om_behov_for_veiledning.pdf
				</Button>
			)}
		</Card>
	);
}
