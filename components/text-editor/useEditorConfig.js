import {useCallback} from 'react';
import Link from 'next/link';
import {DefaultElement} from 'slate-react';
import {isHotkey} from 'is-hotkey';
import {toggleStyle} from './EditorUtils';
const KeyBindings = {
    onKeyDown: (editor, event) => {
        if (isHotkey('mod+b', event)) {
            toggleStyle(editor, 'bold');
            return;
        }
        if (isHotkey('mod+i', event)) {
            toggleStyle(editor, 'italic');
            return;
        }
        if (isHotkey('mod+c', event)) {
            toggleStyle(editor, 'code');
            return;
        }
        if (isHotkey('mod+u', event)) {
            toggleStyle(editor, 'underline');
            return;
        }
    },
};

export default function useEditorConfig(editor) {
    const onKeyDown = useCallback(event => KeyBindings.onKeyDown(editor, event), [editor]);
    return {renderElement, renderLeaf, onKeyDown};
}

function getClassForEffect(effect) {
    switch (effect) {
        case 'align-left':
            return 'text-left';
        case 'align-center':
            return 'text-center';
        case 'align-right':
            return 'text-right';
        default:
            break;
    }
}

function renderElement(props) {
    const {element, children, attributes} = props;
    const classEffect = getClassForEffect(element.effect);
    var newAttributes = {...attributes};
    newAttributes.className = classEffect;
    switch (element.type) {
        case 'paragraph':
            return <p {...newAttributes}>{children}</p>;
        case 'h1':
            return <h1 {...newAttributes}>{children}</h1>;
        case 'h2':
            return <h2 {...newAttributes}>{children}</h2>;
        case 'h3':
            return <h3 {...newAttributes}>{children}</h3>;
        case 'h4':
            return <h4 {...newAttributes}>{children}</h4>;
        case 'bulleted-list':
            return <ul {...newAttributes}>{children}</ul>;
        case 'numbered-list':
            return <ol {...newAttributes}>{children}</ol>;
        case 'list-item':
            return <li {...newAttributes}>{children}</li>;
        case 'link':
            return (
                <Link href={element.url} {...newAttributes}>
                    <a className="link">{children}</a>
                </Link>
            );
        default:
            // For the default case, we delegate to Slate's default rendering.
            return <DefaultElement {...props} />;
    }
}

function renderLeaf({attributes, children, leaf}) {
    let el = <>{children}</>;

    if (leaf.bold) {
        el = <strong>{el}</strong>;
    }

    if (leaf.code) {
        el = <code>{el}</code>;
    }

    if (leaf.italic) {
        el = <em>{el}</em>;
    }

    if (leaf.underline) {
        el = <u>{el}</u>;
    }

    return <span {...attributes}>{el}</span>;
}
