import React from 'react';
import cls from 'classnames';
import './image-button.less';

interface ImageButtonProps extends React.HTMLProps<HTMLButtonElement> {
	src: string;
	alt: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	imgClassName?: string;
}

function ImageButton(props: ImageButtonProps) {
	const { src, alt, onClick, className, imgClassName, type, ...rest } = props;
	return (
		<button type="button" className={cls(className, 'image-button')} onClick={onClick} {...rest}>
			<img src={src} alt={alt} className={imgClassName} />
		</button>
	);
}

export default ImageButton;
