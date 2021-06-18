export const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code className={props.element.className}>{props.children}</code>
        </pre>
    );
};

export const H2Element = props => {
    return (
        <pre {...props.attributes}>
            <h2 className={props.element.className}>{props.children}</h2>
        </pre>
    );
};

export const H3Element = props => {
    return (
        <pre {...props.attributes}>
            <h3 className={props.element.className}>{props.children}</h3>
        </pre>
    );
};

export const DIVElement = props => {
    return (
        <pre {...props.attributes}>
            <div className={props.element.className}>{props.children}</div>
        </pre>
    );
};

export const BulletedElement = props => {
    return (
        <ul className={props.element.className} {...props.attributes}>
            {props.children}
        </ul>
    );
};

export const NumberedElement = props => {
    return (
        <ol className={props.element.className} {...props.attributes}>
            {props.children}
        </ol>
    );
};

export const ListElement = props => {
    return (
        <li className={props.element.className} {...props.attributes}>
            {props.children}
        </li>
    );
};

export const LinkElement = props => {
    return (
        <a className={`${props.element.className ? props.element.className : ''} link`} href={props.element.url} {...props.attributes}>
            {props.children}
        </a>
    );
};

export const ImageElement = ({attributes, children, element}) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={element.url}
                    alt={element.url}
                    className={`block max-w-full max-h-80 ${selected && focused ? 'shadow-lg' : 'shadow-none'}`}
                />
            </div>
            {children}
        </div>
    );
};

export const VideoElement = ({attributes, children, element}) => {
    //const editor = useSlateStatic();
    const {url} = element;
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <div
                    style={{
                        position: 'relative',
                    }}
                >
                    <iframe
                        width="368"
                        height="208"
                        src={`${url}`}
                        frameborder="0"

                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </div>
            {children}
        </div>
    );
};

export const ParagraphElement = props => {
    return (
        <p className={props.element.className} {...props.attributes}>
            {props.children}
        </p>
    );
};

export const DefaultElement = props => {
    return (
        <span className={props.element.className} {...props.attributes}>
            {props.children}
        </span>
    );
};

export const Leaf = props => {
    const bold = props.leaf.bold ? 'font-bold ' : '';
    const underline = props.leaf.underline ? 'underline ' : '';
    const strikethrough = props.leaf.strikethrough ? 'line-through ' : '';
    const italic = props.leaf.italic ? 'italic ' : '';
    //const alignRight = props.leaf.AlignRight ? 'text-right ' : '';
    const cssClass = `${bold}${underline}${strikethrough}${italic}`;
    return (
        <span {...props.attributes} className={cssClass}>
            {props.children}
        </span>
    );
};
