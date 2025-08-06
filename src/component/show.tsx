interface ShowProps {
	if?: boolean;
	children?: React.ReactNode;
}

const Show = (props: ShowProps) => (props.if ? props.children : null);

export default Show;
