import { Opplysning } from '../utils/types/opplysning';
import { OpplysningType } from '../components/skjema/opplysninger/opplysninger';

const opplysninger: Opplysning[] = [
    { opplysningsType: OpplysningType.CV, json: `{"sistEndret":"2019-01-28T18:36:16.647+01:00","synligForArbeidsgiver":true,"sistEndretAvNav":false,"sammendrag":"Svært liten arbeidserfaring. Vært til sjøs i ungdommen. Har satset på å livnære meg som forfatter. Det har ikke gått så bra økonimsik sett. Selv om jeg er en etablert lyriker. Men jeg har vanskelig for å se at jeg har noen andre muligheter. ","arbeidserfaring":[],"utdanning":[],"annenErfaring":[],"forerkort":[{"klasse":"B","fraDato":"1977-01-01","utloperDato":"2020-01-01"}],"kurs":[],"sertifikater":[],"sprak":[]}`,
    },
    { opplysningsType: OpplysningType.JOBBPROFIL, json: `{"sistEndret":"2019-01-28T18:36:16.666+01:00","onsketYrke":[{"tittel":"Barne- og ungdomsarbeider"},{"tittel":"Fritidsklubbassistent"}],"onsketArbeidssted":[{"stedsnavn":"Østfold"},{"stedsnavn":"Tromsø"},{"stedsnavn":"Aremark"}],"onsketAnsettelsesform":[{"tittel":"FAST"},{"tittel":"VIKARIAT"}],"onsketArbeidstidsordning":[{"tittel":"DAGTID"}],"heltidDeltid":{"heltid":true,"deltid":true},"kompetanse":[]}`,
    },
];

export default opplysninger;
