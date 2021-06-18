// Import the Slate editor factory.
import {createEditor, Editor, Transforms, Range, Text, Element as SlateElement} from 'slate';

import isUrl from 'is-url';

// Import the Slate components and React plugin.
import {Slate, Editable, withReact, useSelected, useFocused, ReactEditor, useSlateStatic} from 'slate-react';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

// Define our own custom set of helpers.
const CustomEditor = {
    isMarkActive(editor, format) {
        const marks = Editor.marks(editor);
        return marks ? marks[format] === true : false;
    },

    // Check if block type 'format' is active
    isBlockActive(editor, format) {
        const [match] = Editor.nodes(editor, {
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
        });

        return !!match;
    },

    isLinkActive(editor) {
        const [link] = Editor.nodes(editor, {
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        });
        return !!link;
    },

    toggleMark(editor, format) {
        const isActive = CustomEditor.isMarkActive(editor, format);

        if (isActive) {
            Editor.removeMark(editor, format);
        } else {
            Editor.addMark(editor, format, true);
        }
    },

    toggleBlock(editor, format) {
        const isActive = CustomEditor.isBlockActive(editor, format);
        const isList = LIST_TYPES.includes(format);

        Transforms.unwrapNodes(editor, {
            match: n => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
            split: true,
        });
        const newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        };
        Transforms.setNodes(editor, newProperties);

        if (!isActive && isList) {
            const block = {type: format, children: []};
            Transforms.wrapNodes(editor, block);
        }
    },

    insertLink(editor, url) {
        if (editor.selection) {
            CustomEditor.wrapLink(editor, url);
        }
    },

    unwrapLink(editor) {
        Transforms.unwrapNodes(editor, {
            match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        });
    },

    wrapLink(editor, url) {
        if (CustomEditor.isLinkActive(editor)) {
            CustomEditor.unwrapLink(editor);
        }

        const {selection} = editor;
        const isCollapsed = selection && Range.isCollapsed(selection);
        const link = {
            type: 'link',
            url,
            children: isCollapsed ? [{text: url}] : [],
        };

        if (isCollapsed) {
            Transforms.insertNodes(editor, link);
        } else {
            Transforms.wrapNodes(editor, link, {split: true});
            Transforms.collapse(editor, {edge: 'end'});
        }
    },
    insertImage(editor, url) {
        const text = {text: ''};
        const image = {type: 'image', url, children: [text]};
        Transforms.insertNodes(editor, image);
    },
    isImageUrl(url) {
        if (!url) return false;
        if (!isUrl(url)) return false;
        const ext = new URL(url).pathname.split('.').pop();
        return imageExtensions.includes(ext);
    },
    insertVideo(editor, url) {
        const text = {text: ''};
        const image = {type: 'video', url, children: [text]};
        Transforms.insertNodes(editor, image);
    },
    /*toggleReturnBlock(editor) {
        const 
    }*/
};

export default CustomEditor;