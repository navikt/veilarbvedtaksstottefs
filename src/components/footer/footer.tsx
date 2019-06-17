import React from 'react';
import cls from 'classnames';
import { Document, Page, pdfjs } from 'react-pdf';
import './footer.less';

interface FooterProps {
    className?: string;
    children?: React.ReactNode;
}

function Footer(props: FooterProps) {
    return (
        <footer className={cls("vedtaksstotte-footer", props.className)}>
            {props.children}
        </footer>
    );
}

export default Footer;
