import dayjs from 'dayjs';

export function fiksRegistreringsinfoJson(json: string | null): object | null {
	if (json == null) {
		return null;
	}

	const regInfo = JSON.parse(json);

	delete regInfo.type;

	const sisteStilling = regInfo.registrering && regInfo.registrering.sisteStilling;

	if (sisteStilling && sisteStilling.label) {
		regInfo.registrering.sisteStilling = {
			stilling: sisteStilling.label
		};
	}

	removeUnecessaryKeys(regInfo);
	formatConstValues(regInfo);
	removeNullValues(regInfo);
	formatDates(regInfo);
	translateKeysToNorwegian(regInfo);
	sorterSporsmalOgSvar(regInfo);

	return regInfo;
}

export function removeUnecessaryKeys(obj: any): void {
	deepForEach(obj, (parent, key, value) => {
		if (key === 'id') {
			delete parent[key];
		}
	});
}

export function formatConstValues(obj: any): void {
	deepForEach(obj, (parent, key, value) => {
		if (typeof value === 'string' && value.indexOf('_')) {
			parent[key] = capitalizeFirstLetter(value.replace('_', ' ').toLowerCase());
		}
	});
}

function capitalizeFirstLetter(input: string) {
	if (input != null && input.length > 1) {
		return input.charAt(0).toUpperCase() + input.slice(1);
	}
	return input;
}

export function fiksCvOgJobbprofil(json: string | null): object | null {
	if (json == null) {
		return null;
	}

	const cvOgJobbprofil = JSON.parse(json);

	removeNullValues(cvOgJobbprofil);
	formatDates(cvOgJobbprofil);
	translateKeysToNorwegian(cvOgJobbprofil);

	return cvOgJobbprofil;
}

export function fiksEgenvurderingJson(json: string | null, fnr?: string, enhetId?: string): object | null {
	if (json == null) {
		return null;
	}

	const egenvurdering = JSON.parse(json);

	removeNullValues(egenvurdering);
	cleanEgenvurderingSporsmal(egenvurdering, fnr, enhetId);
	formatDates(egenvurdering);
	translateKeysToNorwegian(egenvurdering);
	sorterSporsmalOgSvar(egenvurdering);

	return egenvurdering;
}

function sorterSporsmalOgSvar(obj: any): void {
	deepForEach(obj, (parent, key, value) => {
		if (typeof value === 'object' && value.svar != null && value.spørsmål != null) {
			// Dette fjerner også alle verdier bortsett fra 'spørsmål', 'svar' og eventuelt dialoglenke
			const { spørsmål, svar, dialoglenke } = value;
			parent[key] = dialoglenke ? { spørsmål, svar, dialoglenke } : { spørsmål, svar };
		}
	});
}

function formatDates(obj: any): void {
	const yearMonthDayRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$');
	const yearMonthRegex = new RegExp('^\\d{4}-\\d{2}$');

	// regex for uønskede konverteringer som dayjs anser som gyldige datoer
	const invalidDatesRegex = new RegExp('^\\d{4}$');

	deepForEach(obj, (parent, key, value) => {
		if (typeof value === 'string') {
			if (value.match(yearMonthDayRegex)) {
				parent[key] = dayjs(value).format('DD. MMMM YYYY');
			} else if (value.match(yearMonthRegex)) {
				parent[key] = dayjs(value).format('MMMM YYYY');
			} else if (!value.match(invalidDatesRegex) && dayjs(value).isValid()) {
				parent[key] = dayjs(value).format('DD. MMM YYYY kl. HH:mm');
			}
		}
	});
}

function cleanEgenvurderingSporsmal(obj: any, fnr?: string, enhetId?: string) {
	deepForEach(obj, (parent, key) => {
		if (key === 'spmId' || key === 'besvarelseId' || key === 'dato' || key === 'oppfolging') {
			delete parent[key];
		} else if (key === 'spm') {
			parent.sporsmal = parent[key];
			delete parent[key];
		} else if (key === 'dialogId') {
			if (fnr && enhetId) {
				parent.dialoglenke = `${window.location.origin}/${fnr}/${parent[key]}#visDialog?enhet=${enhetId}`;
			}
			delete parent[key];
		}
	});
}

function translateKeysToNorwegian(obj: any) {
	const dictionary = {
		forerkort: 'førerkort',
		sprak: 'språk',
		onsket: 'ønsket',
		sporsmal: 'spørsmål',
		Maneder: 'Måneder',
		utloper: 'utløper'
	};

	deepForEach(obj, (parent, key, value) => {
		Object.keys(dictionary).forEach(dictKey => {
			// @ts-ignore
			const dictValue = dictionary[dictKey];

			if (key.includes(dictKey)) {
				const newKey = key.replace(dictKey, dictValue);

				translateKeysToNorwegian(value);

				parent[newKey] = value;
				delete parent[key];
			}
		});
	});
}

function removeNullValues(obj: any) {
	deepForEach(obj, (parent, key, value) => {
		if (value == null) {
			delete parent[key];
		}
	});
}

function deepForEach(data: any, fn: (parent: any, key: any, value: any) => void): void {
	if (typeof data !== 'object' || data == null) {
		return data;
	}

	Object.keys(data).forEach(key => {
		fn(data, key, data[key]);

		if (typeof data[key] === 'object') {
			deepForEach(data[key], fn);
		}
	});
}
