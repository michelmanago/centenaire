// @refresh reset

// Import React dependencies.
import React, {useEffect, useMemo, useCallback, useState} from 'react';
// Import the Slate editor factory.
import {createEditor, Editor, Transforms, Range, Text, Element as SlateElement} from 'slate';

// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from 'slate-react';

import {serializer, deserialize} from '../../lib/Slate/serialize';

export default function SlateEditor({block, setContent}) {
    const editor = useMemo(() => withReact(createEditor()), []);

    let initValue = [
        {
            type: 'paragraph',
            children: [{text: '<p>A line of text in a paragraph.</p>'}],
        },
    ];
    if (block) {
        initValue = [
            {
                children: [{text: block}],
            },
        ];
    }
    const [value, setValue] = useState(initValue);

    const clickDeserializing = event => {
        const html = localStorage.getItem('contentSerialize');
        const document = new DOMParser().parseFromString(html, 'text/html');
        const fragment = deserialize(document.body);
        console.log(fragment);

        localStorage.setItem('content', JSON.stringify(fragment));
    };

    const displayStruct = event => {
        event.preventDefault();
        console.log(value);
    };

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'paragraph':
                return <ParagraphElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />;
    }, []);

    return (
        <>
            {/*<button className="px-2 text-black border border-gray-900 rounded" onClick={displayStruct}>
                Display Struct
            </button>*/}

            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value);

                    console.log(value);
                    
                    // Save the value to Local Storage.
                    let content = '';
                    content = value[0].children[0].text;
                    /*value.forEach((elt, i) => {
                        let textElt = elt.children[0].text;
                        if (elt.children[0].text === '') textElt = '</br>';
                        else if (i != 0) textElt = `<p>${elt.children[0].text}</p>`;
                        content = `${content} ${textElt}`;
                    });*/
                    setContent(content);
                    localStorage.setItem('contentSerialize', content);
                    const html = content;
                    const document = new DOMParser().parseFromString(html, 'text/html');
                    const fragment = deserialize(document.body);
                    localStorage.setItem('content', JSON.stringify(fragment));
                }}
            >
                <Editable
                    placeholder="Enter some plain text..."
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    className="p-2 overflow-y-auto h-5/6"
                />
            </Slate>
        </>
    );
}

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
