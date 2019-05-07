import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface NAVSPAScopeProps {
    [name: string]: NAVSPAApp;
}
type NAVSPAApp = (element: HTMLElement, props: any) => void; // tslint:disable-line

export default class NAVSPA {
    public static eksporter<PROPS>(name: string, component: React.ComponentType<PROPS>) {
        NAVSPA.scope[name] = (element: HTMLElement, props: PROPS) => {
            ReactDOM.render(React.createElement(component, props), element);
        };
    }

    public static importer<PROPS>(name: string): React.ComponentType<PROPS> {
        class NAVSPAImporter extends React.Component<PROPS> { // tslint:disable-line
            // @ts-ignore
            private el: HTMLElement;

            public componentWillUnmount() {
                ReactDOM.unmountComponentAtNode(this.el);
            }

            public componentDidMount() {
                NAVSPA.scope[name](this.el, this.props);
            }

            public render() {
                return <div ref={this.saveRef}/>;
            }

            private saveRef = (el: HTMLDivElement) => {
                this.el = el;
            }
        }

        return NAVSPAImporter;
    }

    public static render<PROPS>(name: string, element: HTMLElement, props: PROPS): void {
        NAVSPA.scope[name](element, props);
    }

    private static scope: NAVSPAScopeProps = (global as any)['NAVSPA'] = (global as any)['NAVSPA'] || {}; // tslint:disable-line
}