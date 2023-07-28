import './screen-reader-speak.less';

export function ScreenReaderSpeak(props: { tekst: string }) {
	return (
		<div className="sr-only" role="alert">
			{props.tekst}
		</div>
	);
}
