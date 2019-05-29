import React from 'react';
import './json-viewer.less';
import { func } from 'prop-types';

interface JsonViewerProps {
    json: string | null;
}

export default function JsonViewer(props: JsonViewerProps) {
    if (!props.json) {
        return <p>Ingen data</p>;
    }

    return objToReact(JSON.parse(props.json));
}

function objToReact(obj: {}) {
    return (
        <>
            {Object.entries(obj).map(([key, value], idx) => {

                if (isType(value, 'string', 'boolean', 'number')) {
                    return (
                        <div key={idx} className="json-key-wrapper">
                            <span className="json-key">{prettifyKey(key)}: </span><span>{scalarToString(value as any)}</span>
                        </div>
                    );
                } else if (Array.isArray(value)) {
                    return (
                        <div key={idx} className="json-array-wrapper">
                            <JsonKey keyText={key}/>
                            {value.length > 0 ?
                                <ul className="json-array">
                                    {value.map((arrVal, index) => <li key={index}>{objToReact(arrVal)}</li>)}
                                </ul>
                                :
                                <p className="json-array-empty">Ingen oppføringer</p>
                            }
                        </div>
                    );
                } else if (isType(value, 'object')) {
                    return (
                        <div key={key}>
                            <JsonKey keyText={key}/>
                            <div className="json-obj">
                                {objToReact(value)}
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </>
    );
}

function JsonKey({keyText}: { keyText: string }) {
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