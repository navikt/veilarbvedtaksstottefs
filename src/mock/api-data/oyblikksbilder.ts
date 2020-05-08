import { Oyblikksbilde } from '../../utils/types/oyblikksbilde';
import OyblikksbildeType from '../../utils/types/oyblikksbilde-type';
import { JSONArray } from 'yet-another-fetch-mock';

// tslint:disable max-line-length
const oyblikksbilder: Oyblikksbilde[] & JSONArray = [
	{
		oyeblikksbildeType: OyblikksbildeType.CV_OG_JOBBPROFIL,
		json: `{"sistEndret":"2019-01-28T18:36:16.647+01:00","synligForArbeidsgiver":true,"sistEndretAvNav":false,"sammendrag":"Svært liten arbeidserfaring. Vært til sjøs i ungdommen. Har satset på å livnære meg som forfatter. Det har ikke gått så bra økonimsik sett. Selv om jeg er en etablert lyriker. Men jeg har vanskelig for å se at jeg har noen andre muligheter. ","arbeidserfaring":[],"utdanning":[],"annenErfaring":[],"forerkort":[{"klasse":"B","fraDato":"1977-01-01","utloperDato":"2020-01-01"}],"kurs":[],"sertifikater":[],"sprak":[], "jobbprofil": {"sistEndret":"2019-01-28T18:36:16.666+01:00","onsketYrke":[{"tittel":"Barne- og ungdomsarbeider"},{"tittel":"Fritidsklubbassistent"}],"onsketArbeidssted":[{"stedsnavn":"Østfold"},{"stedsnavn":"Tromsø"},{"stedsnavn":"Aremark"}],"onsketAnsettelsesform":[{"tittel":"FAST"},{"tittel":"VIKARIAT"}],"onsketArbeidstidsordning":[{"tittel":"DAGTID"}],"heltidDeltid":{"heltid":true,"deltid":true},"kompetanse":[]}}`
	},
	{
		oyeblikksbildeType: OyblikksbildeType.REGISTRERINGSINFO,
		json: `{"type":"ORDINAER","registrering":{"manueltRegistrertAv":null,"id":884,"opprettetDato":"2020-01-16T12:59:46.883561+01:00","besvarelse":{"utdanning":"VIDEREGAENDE_GRUNNUTDANNING","utdanningBestatt":"JA","utdanningGodkjent":"JA","helseHinder":"NEI","andreForhold":"NEI","sisteStilling":"INGEN_SVAR","dinSituasjon":"DELTIDSJOBB_VIL_MER","fremtidigSituasjon":null,"tilbakeIArbeid":null},"teksterForBesvarelse":[{"sporsmalId":"sisteStilling","sporsmal":"Hva er din siste jobb?","svar":"Salgsmedarbeider i supermarked"},{"sporsmalId":"utdanning","sporsmal":"Hva er din høyeste fullførte utdanning?","svar":"Videregående grunnutdanning (1 til 2 år)"},{"sporsmalId":"utdanningBestatt","sporsmal":"Er utdanningen din bestått?","svar":"Ja"},{"sporsmalId":"utdanningGodkjent","sporsmal":"Er utdanningen din godkjent i Norge?","svar":"Ja"},{"sporsmalId":"dinSituasjon","sporsmal":"Velg den situasjonen som passer deg best","svar":"Har deltidsjobb, men vil jobbe mer"},{"sporsmalId":"helseHinder","sporsmal":"Har du helseproblemer som hindrer deg i å søke eller være i jobb?","svar":"Nei"},{"sporsmalId":"andreForhold","sporsmal":"Har du andre problemer med å søke eller være i jobb?","svar":"Nei"}],"sisteStilling":{"label":"Salgsmedarbeider i supermarked","konseptId":45518,"styrk08":"5223"},"profilering":{"jobbetSammenhengendeSeksAvTolvSisteManeder":true,"alder":30,"innsatsgruppe":"STANDARD_INNSATS"}}}`
	},
	{
		oyeblikksbildeType: OyblikksbildeType.EGENVURDERING,
		json: `{"besvarelseId":681,"sistOppdatert":"2020-02-07T12:45:51.342+01:00","svar":[{"spmId":"kontakt-fra-nav-veileder","besvarelseId":681,"svar":"Ja","spm":"Ønsker du å kontakte veilederen din for å komme videre med jobbsøkingen?","dato":"2020-02-07T12:45:25.329+01:00"},{"spmId":"hvilken-veiledning-trengs","besvarelseId":681,"svar":"Jeg trenger å bli bedre på å skrive CVer","spm":"Hva trenger du hjelp til i jobbsøkingen?","dato":"2020-02-07T12:45:51.342+01:00"}]}`
	}
];

export default oyblikksbilder;
