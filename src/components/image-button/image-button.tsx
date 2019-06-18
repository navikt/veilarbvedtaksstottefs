import React from 'react';
import './image-button.less';

interface ImageButtonProps {
    src: string;
    alt: string;
    onClick?: () => void;
    imgClassName?: string;
}

function ImageButton(props: ImageButtonProps) {
    return (
        <button type="button" className="image-button" onClick={props.onClick}>
            <img  src={props.src} alt={props.alt} className={props.imgClassName}/>
        </button>
    );
}

export default ImageButton;
