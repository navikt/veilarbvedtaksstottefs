import './json-viewer.less';
import Lenke from 'nav-frontend-lenker';

interface JsonViewerProps {
	json: string | object | null;
	className?: string;
}

export default function JsonViewer(props: JsonViewerProps) {
	const obj = props.json ? (typeof props.json === 'string' ? JSON.parse(props.json) : props.json) : null;

	return <div className={props.className}>{objToReact(obj)}</div>;
}

function objToReact(obj: {} | null) {
	if (obj == null || typeof obj !== 'object') {
		return <p>Ingen data</p>;
	}

	return (
		<>
			{Object.entries(obj).map(([key, value], idx) => {
				if (isType(value, 'string', 'boolean', 'number')) {
					const element = isType(value, 'string') && checkIfLink(value as string, key, idx);
					return element ? (
						element
					) : (
						<div key={idx} className="json-key-wrapper">
							<span className="json-key">{prettifyKey(key)}: </span>
							<span>{scalarToString(value as any)}</span>
						</div>
					);
				} else if (Array.isArray(value)) {
					return (
						<div key={idx} className="json-array-wrapper">
							<JsonKey keyText={key} />
							{value.length > 0 ? (
								<ul className="json-array">
									{value.map((arrVal, index) => (
										<li key={index}>{objToReact(arrVal)}</li>
									))}
								</ul>
							) : (
								<p className="json-array-empty">Ingen oppføringer</p>
							)}
						</div>
					);
				} else if (isType(value, 'object')) {
					return (
						<div key={key}>
							<JsonKey keyText={key} />
							<div className="json-obj">{objToReact(value as object)}</div>
						</div>
					);
				}

				return null;
			})}
		</>
	);
}

function checkIfLink(value: string, key: string, idx: number) {
	if (!key.includes('lenke')) {
		return;
	}

	return (
		<div key={idx} className="json-key-wrapper">
			<span className="json-key">{prettifyKey(key)}: </span>
			<Lenke href={value} target="_blank" rel="noopener noreferrer">
				{value}
			</Lenke>
		</div>
	);
}

function JsonKey({ keyText }: { keyText: string }) {
	return <h3 className="json-key">{prettifyKey(keyText)}</h3>;
}

function isType(val: any, ...types: string[]): boolean {
	const type = typeof val;
	return types.findIndex(t => t === type) >= 0;
}

function scalarToString(scalar: number | boolean | string) {
	if (isType(scalar, 'boolean')) {
		return scalar ? 'Ja' : 'Nei';
	}

	return scalar.toString();
}

function prettifyKey(key: string): string {
	let str = key.replace(/([A-Z])/g, ' $1').toLowerCase();

	if (str.charAt(0) === str.charAt(0).toLowerCase()) {
		str = str.charAt(0).toUpperCase() + str.substr(1);
	}

	return str;
}
