import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './footer.less';

interface FooterProps {
    children?: React.ReactNode;
}

function Footer(props: FooterProps) {
    return (
        <footer className="vedtaksstotte-footer">
            {props.children}
        </footer>
    );
}

export default Footer;
