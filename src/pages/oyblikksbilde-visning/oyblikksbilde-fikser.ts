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

	removeNullValues(regInfo);
	formatDates(regInfo);
	fjernRegistreringSporsmalId(regInfo);
	translateKeysToNorwegian(regInfo);

	return regInfo;
}

export function fiksEgenvurderingJson(json: string | null): object | null {
	if (json == null) {
		return null;
	}

	const egenvurdering = JSON.parse(json);

	removeNullValues(egenvurdering);
	cleanEgenvurderingSporsmal(egenvurdering);
	formatDates(egenvurdering);
	translateKeysToNorwegian(egenvurdering);

	return egenvurdering;
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

function formatDates(obj: any): void {
	deepForEach(obj, (parent, key, value) => {
		if (typeof value === 'string') {
			if (dayjs(value).isValid()) {
				parent[key] = dayjs(value).format('DD. MMM YYYY kl. HH:mm');
			}
		}
	});
}

function fjernRegistreringSporsmalId(obj: any) {
	deepForEach(obj, (parent, key) => {
		if (key === 'sporsmalId') {
			delete parent[key];
		}
	})
}

function cleanEgenvurderingSporsmal(obj: any) {
	deepForEach(obj, (parent, key) => {
		if (key === 'spmId' || key === 'besvarelseId' || key === 'dato') {
			delete parent[key];
		} else if (key === 'spm') {
			parent.sporsmal = parent[key];
			delete parent[key];
		}
	})
}

function translateKeysToNorwegian(obj: any) {
	const dictionary = {
		'forerkort': 'førerkort',
		'sprak': 'språk',
		'onsket': 'ønsket',
		'sporsmal': 'spørsmål',
		'Maneder': 'Måneder',
		'utloper': 'utløper'
	};

	deepForEach(obj, (parent, key, value) => {
		Object.keys(dictionary).forEach((dictKey) => {
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

	Object.keys(data).forEach((key) => {
		fn(data, key, data[key]);

		if (typeof data[key] === 'object') {
			deepForEach(data[key], fn);
		}
	});

}