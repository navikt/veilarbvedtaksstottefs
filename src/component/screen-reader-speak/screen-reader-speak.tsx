import './screen-reader-speak.css';

export function ScreenReaderSpeak(props: { tekst: string }) {
	return (
		<div className="sr-only" role="alert">
			{props.tekst}
		</div>
	);
}
