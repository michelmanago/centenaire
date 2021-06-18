// @refresh reset

// Import React dependencies.
import React, {useMemo, useCallback, useState} from 'react';

import isUrl from 'is-url';

// Import the Slate editor factory.
import {createEditor, Editor, Transforms, Range, Text, Element as SlateElement} from 'slate';

// Import the Slate components and React plugin.
import {Slate, Editable, withReact, useSelected, useFocused, ReactEditor, useSlateStatic} from 'slate-react';

import {serializer, deserialize} from '../../lib/Slate/serialize';
import CustomEditor from '../../lib/Slate/customEditor';

import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Link,
    ListBulleted,
    ListNumbered,
    AlignLeft,
    AlignRight,
    AlignCenter,
    AlignJustify,
    Image,
    Video,
    Music,
} from './icon';
import SelectImg from '../Popup/select-img';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const withLinks = editor => {
    const {insertData, insertText, isInline, isVoid} = editor;

    editor.isVoid = element => {
        return element.type === 'image' ? true : element.type === 'video' ? true : isVoid(element);
    };

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element);
    };

    editor.insertText = text => {
        // TODO: check if isUrl don't break the code
        if (text && false) {
            //&& isUrl(text)
            CustomEditor.wrapLink(editor, text);
        } else {
            insertText(text);
        }
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const {files} = data;

        if (text && isUrl(text)) {
            CustomEditor.wrapLink(editor, text);
        } else if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result;
                        CustomEditor.insertImage(editor, url);
                    });

                    reader.readAsDataURL(file);
                }
            }
        } else if (CustomEditor.isImageUrl(text)) {
            CustomEditor.insertImage(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

export default function SlateEditor({block, setContent, defuntId}) {
    const editor = useMemo(() => withLinks(withReact(createEditor())), []);

    let initValue = [
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ];
    if (typeof window !== 'undefined') {
        // Access localStorage
        //initValue = JSON.parse(localStorage.getItem('content')) || initValue;
        if (block) {
            const document = new DOMParser().parseFromString(block, 'text/html');
            const fragment = deserialize(document.body);
            initValue = fragment;
        }
    }

    const [value, setValue] = useState(initValue);

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'paragraph':
                return <ParagraphElement {...props} />;
            case 'code':
                return <CodeElement {...props} />;
            case 'h2':
                return <H2Element {...props} />;
            case 'h3':
                return <H3Element {...props} />;
            case 'div':
                return <DIVElement {...props} />;
            case 'bulleted-list':
                return <BulletedElement {...props} />;
            case 'numbered-list':
                return <NumberedElement {...props} />;
            case 'list-item':
                return <ListElement {...props} />;
            case 'link':
                return <LinkElement {...props} />;
            case 'image':
                return <ImageElement {...props} />;
            case 'video':
                return <VideoElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />;
    }, []);

    // TODO: remove if unsecesary
    const clickDeserializing = event => {
        const html = localStorage.getItem('contentSerialize');
        const document = new DOMParser().parseFromString(html, 'text/html');
        const fragment = deserialize(document.body);
        console.log(fragment);
    };

    const displayStruct = event => {
        event.preventDefault();
        console.log(value);
    };

    const sendImg = (editor, url) => {
        if (!url) return;
        CustomEditor.insertImage(editor, url);
    };

    // TODO: refactor Slate Tool barre
    return (
        <>
            {/*<button className="px-2 ml-2 text-black border border-gray-900 rounded" onClick={displayStruct}>
                Display Struct
            </button>*/}

            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value);

                    // Save the value to Local Storage.
                    const content = JSON.stringify(value);
                    localStorage.setItem('content', content);
                    const contentSerialize = serializer(value);
                    setContent(contentSerialize);
                    //console.log(contentSerialize)
                    localStorage.setItem('contentSerialize', contentSerialize);
                }}
            >
                <div className="px-2 py-2 border-b border-black">
                    <button
                        className="px-1"
                        onClick={event => {
                            event.preventDefault();
                            //CustomEditor.toggleBoldMark(editor)
                            CustomEditor.toggleMark(editor, 'bold');
                        }}
                    >
                        <Bold isActive={true} />
                    </button>
                    <button
                        className="px-1"
                        onClick={event => {
                            event.preventDefault();
                            //CustomEditor.toggleItalicMark(editor)
                            CustomEditor.toggleMark(editor, 'italic');
                        }}
                    >
                        <Italic isActive={true} />
                    </button>
                    <button
                        className="px-1"
                        onClick={event => {
                            event.preventDefault();
                            //CustomEditor.toggleUnderlineMark(editor)
                            CustomEditor.toggleMark(editor, 'underline');
                        }}
                    >
                        <Underline isActive={true} />
                    </button>
                    <button
                        className="px-1"
                        onClick={event => {
                            event.preventDefault();
                            //CustomEditor.toggleStrikethroughMark(editor)
                            CustomEditor.toggleMark(editor, 'strikethrough');
                        }}
                    >
                        <Strikethrough isActive={true} />
                    </button>
                    {/*<button
                        className="px-1"
                        onClick={event => {
                            event.preventDefault();
                            //CustomEditor.toggleStrikethroughMark(editor)
                            CustomEditor.toggleMark(editor, 'alignright');
                        }}
                    >
                        <AlignRight isActive={true} />
                    </button>*/}
                    <button
                        className="px-1 text-black"
                        onClick={event => {
                            event.preventDefault();
                            CustomEditor.toggleBlock(editor, 'h2');
                        }}
                    >
                        H2
                    </button>
                    <button
                        className="px-1 text-black"
                        onClick={event => {
                            event.preventDefault();
                            CustomEditor.toggleBlock(editor, 'h3');
                        }}
                    >
                        H3
                    </button>
                    <button
                        className="px-1 text-black"
                        onClick={event => {
                            event.preventDefault();
                            const url = window.prompt('Enter the URL of the link:');
                            if (!url) return;
                            CustomEditor.insertLink(editor, url);
                        }}
                    >
                        <Link isActive={true} />
                    </button>
                    <button
                        className="px-1 text-black"
                        onClick={event => {
                            event.preventDefault();
                            CustomEditor.toggleBlock(editor, 'numbered-list');
                        }}
                    >
                        <ListNumbered isActive={true} />
                    </button>
                    <button
                        className="px-1 text-black"
                        onClick={event => {
                            event.preventDefault();
                            CustomEditor.toggleBlock(editor, 'bulleted-list');
                        }}
                    >
                        <ListBulleted isActive={true} />
                    </button>
                    <SelectImg defuntId={defuntId} cb={sendImg} />
                    <button
                        className="px-1 text-black"
                        onClick={event => {
                            event.preventDefault();
                            const url = window.prompt('Enter the URL of the image:');
                            if (!url) return;
                            CustomEditor.insertVideo(editor, url);
                            //CustomEditor.toggleBlock(editor, 'bulleted-list')
                        }}
                    >
                        <Video isActive={true} />
                    </button>
                    {/*<button
                        className="px-1 text-black"
                        onMouseDown={event => {
                            event.preventDefault();
                            //const url = window.prompt('Enter the URL of the image:');
                            //if (!url) return;
                            //CustomEditor.insertVideo(editor, url);
                            //CustomEditor.toggleBlock(editor, 'bulleted-list')
                        }}
                    >
                        <Music isActive={true} />
                    </button>*/}
                </div>
                <Editable
                    className="max-h-full p-2 overflow-y-auto h-94"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        if (event.shiftKey) {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                //CustomEditor.toggleReturn()
                                console.log('Maj + Enter');
                            }
                        }
                        if (!event.ctrlKey) {
                            return;
                        }

                        // Replace the `onKeyDown` logic with our new commands.
                        switch (event.key) {
                            case '`': {
                                event.preventDefault();
                                CustomEditor.toggleCodeBlock(editor);
                                break;
                            }

                            case 'b': {
                                event.preventDefault();
                                CustomEditor.toggleBoldMark(editor);
                                break;
                            }
                        }
                    }}
                />
            </Slate>
        </>
    );
}

// TODO: refactor code to a new file
const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code className={props.element.className}>{props.children}</code>
        </pre>
    );
};

const H2Element = props => {
    return (
        <pre {...props.attributes}>
            <h2 className={props.element.className}>{props.children}</h2>
        </pre>
    );
};

const H3Element = props => {
    return (
        <pre {...props.attributes}>
            <h3 className={props.element.className}>{props.children}</h3>
        </pre>
    );
};

const DIVElement = props => {
    return (
        <pre {...props.attributes}>
            <div className={props.element.className}>{props.children}</div>
        </pre>
    );
};

const BulletedElement = props => {
    return (
        <ul className={props.element.className} {...props.attributes}>
            {props.children}
        </ul>
    );
};

const NumberedElement = props => {
    return (
        <ol className={props.element.className} {...props.attributes}>
            {props.children}
        </ol>
    );
};

const ListElement = props => {
    return (
        <li className={props.element.className} {...props.attributes}>
            {props.children}
        </li>
    );
};

const LinkElement = props => {
    return (
        <a className={`${props.element.className} link`} href={props.element.url} {...props.attributes}>
            {props.children}
        </a>
    );
};

const ImageElement = ({attributes, children, element}) => {
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

const VideoElement = ({attributes, children, element}) => {
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

const ParagraphElement = props => {
    return (
        <p className={props.element.className} {...props.attributes}>
            {props.children}
        </p>
    );
};

const DefaultElement = props => {
    return (
        <span className={props.element.className} {...props.attributes}>
            {props.children}
        </span>
    );
};

const Leaf = props => {
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
