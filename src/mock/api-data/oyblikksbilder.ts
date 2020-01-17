import { Oyblikksbilde } from '../../utils/types/oyblikksbilde';
import OyblikksbildeType from '../../utils/types/oyblikksbilde-type';
import { JSONArray } from 'yet-another-fetch-mock';

// tslint:disable max-line-length
const oyblikksbilder: Oyblikksbilde[] & JSONArray = [
	{
		oyblikksbildeType: OyblikksbildeType.CV_OG_JOBBPROFIL,
		json: `{"sistEndret":"2019-01-28T18:36:16.647+01:00","synligForArbeidsgiver":true,"sistEndretAvNav":false,"sammendrag":"Svært liten arbeidserfaring. Vært til sjøs i ungdommen. Har satset på å livnære meg som forfatter. Det har ikke gått så bra økonimsik sett. Selv om jeg er en etablert lyriker. Men jeg har vanskelig for å se at jeg har noen andre muligheter. ","arbeidserfaring":[],"utdanning":[],"annenErfaring":[],"forerkort":[{"klasse":"B","fraDato":"1977-01-01","utloperDato":"2020-01-01"}],"kurs":[],"sertifikater":[],"sprak":[], "jobbprofil": {"sistEndret":"2019-01-28T18:36:16.666+01:00","onsketYrke":[{"tittel":"Barne- og ungdomsarbeider"},{"tittel":"Fritidsklubbassistent"}],"onsketArbeidssted":[{"stedsnavn":"Østfold"},{"stedsnavn":"Tromsø"},{"stedsnavn":"Aremark"}],"onsketAnsettelsesform":[{"tittel":"FAST"},{"tittel":"VIKARIAT"}],"onsketArbeidstidsordning":[{"tittel":"DAGTID"}],"heltidDeltid":{"heltid":true,"deltid":true},"kompetanse":[]}}`
	},
	{
		oyblikksbildeType: OyblikksbildeType.REGISTRERINGSINFO,
		json: `{"type":"ORDINAER","registrering":{"manueltRegistrertAv":null,"id":884,"opprettetDato":"2020-01-16T12:59:46.883561+01:00","besvarelse":{"utdanning":"VIDEREGAENDE_GRUNNUTDANNING","utdanningBestatt":"JA","utdanningGodkjent":"JA","helseHinder":"NEI","andreForhold":"NEI","sisteStilling":"INGEN_SVAR","dinSituasjon":"DELTIDSJOBB_VIL_MER","fremtidigSituasjon":null,"tilbakeIArbeid":null},"teksterForBesvarelse":[{"sporsmalId":"sisteStilling","sporsmal":"Hva er din siste jobb?","svar":"Salgsmedarbeider i supermarked"},{"sporsmalId":"utdanning","sporsmal":"Hva er din høyeste fullførte utdanning?","svar":"Videregående grunnutdanning (1 til 2 år)"},{"sporsmalId":"utdanningBestatt","sporsmal":"Er utdanningen din bestått?","svar":"Ja"},{"sporsmalId":"utdanningGodkjent","sporsmal":"Er utdanningen din godkjent i Norge?","svar":"Ja"},{"sporsmalId":"dinSituasjon","sporsmal":"Velg den situasjonen som passer deg best","svar":"Har deltidsjobb, men vil jobbe mer"},{"sporsmalId":"helseHinder","sporsmal":"Har du helseproblemer som hindrer deg i å søke eller være i jobb?","svar":"Nei"},{"sporsmalId":"andreForhold","sporsmal":"Har du andre problemer med å søke eller være i jobb?","svar":"Nei"}],"sisteStilling":{"label":"Salgsmedarbeider i supermarked","konseptId":45518,"styrk08":"5223"},"profilering":{"jobbetSammenhengendeSeksAvTolvSisteManeder":true,"alder":30,"innsatsgruppe":"STANDARD_INNSATS"}}}`
	}
];

export default oyblikksbilder;
