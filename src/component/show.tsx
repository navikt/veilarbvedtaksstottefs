interface ShowProps {
	if?: boolean | null;
	children?: React.ReactNode;
}

const Show = (props: ShowProps) => (props.if ? props.children : null);

export default Show;
