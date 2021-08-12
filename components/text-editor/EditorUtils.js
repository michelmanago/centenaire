// src/utils/EditorUtils.js

import isUrl from 'is-url';
import {Editor, Range, Transforms, Element as SlateElement} from 'slate';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export function isLinkActive(editor) {
    const [link] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
    return !!link;
}

export function getActiveStyles(editor) {
    //console.log('Editor: ', Editor.marks(editor));
    //return new Set();
    return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export function toggleStyle(editor, style) {
    const activeStyles = getActiveStyles(editor);
    if (activeStyles.has(style)) {
        Editor.removeMark(editor, style);
    } else {
        Editor.addMark(editor, style, true);
    }
}

export function toggleTooltip(editor, note) {
    const activeStyles = getActiveStyles(editor);
    if (activeStyles.has('tooltip')) {
        Editor.removeMark(editor, 'tooltip');
    } else {
        Editor.addMark(editor, 'tooltip', note);
    }
}

export function getActiveEffect(editor) {
    const selection = editor.selection;
    //console.log('selection', selection);
    if (selection == null) {
        return null;
    }
    // gives the forward-direction points in case the selection was
    // was backwards.
    const [start, end] = Range.edges(selection);

    //path[0] gives us the index of the top-level block.
    let startTopLevelBlockIndex = start.path[0];
    const endTopLevelBlockIndex = end.path[0];

    let blockEffect = null;
    while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
        const [node, _] = Editor.node(editor, [startTopLevelBlockIndex]);
        if (blockEffect == null) {
            blockEffect = node.effect;
        } else if (blockEffect !== node.effect) {
            return 'multiple';
        }
        startTopLevelBlockIndex++;
    }

    return blockEffect;
}

export function toggleBlockEffect(editor, blockEffect) {
    const currentBlockEffect = getActiveEffect(editor);
    const changeTo = currentBlockEffect === blockEffect ? '' : blockEffect;
    Transforms.setNodes(editor, {effect: changeTo}, {at: editor.selection, match: n => Editor.isBlock(editor, n)});
}

export function getTextBlockStyle(editor) {
    const selection = editor.selection;
    if (selection == null) {
        return null;
    }
    // gives the forward-direction points in case the selection was
    // was backwards.
    const [start, end] = Range.edges(selection);

    //path[0] gives us the index of the top-level block.
    let startTopLevelBlockIndex = start.path[0];
    const endTopLevelBlockIndex = end.path[0];

    let blockType = null;
    while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
        const [node, _] = Editor.node(editor, [startTopLevelBlockIndex]);
        if (blockType == null) {
            blockType = node.type;
        } else if (blockType !== node.type) {
            return 'multiple';
        }
        startTopLevelBlockIndex++;
    }

    return blockType;
}

export function toggleBlockType(editor, blockType) {
    const currentBlockType = getTextBlockStyle(editor);

    const isActive = currentBlockType === blockType;
    const isList = LIST_TYPES.includes(blockType);

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
        split: true,
    });

    const changeTo = isActive ? 'paragraph' : isList ? 'list-item' : blockType;
    Transforms.setNodes(
        editor,
        {type: changeTo},
        // Node filtering options supported here too. We use the same
        // we used with Editor.nodes above.
        {at: editor.selection, match: n => Editor.isBlock(editor, n)},
    );

    if (!isActive && isList) {
        const block = {type: blockType, children: []};
        Transforms.wrapNodes(editor, block);
    }
}

export function insertLink(editor, url) {
    if (editor.selection) {
        wrapLink(editor, url);
    }
}

export function unwrapLink(editor) {
    Transforms.unwrapNodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    });
}

export function wrapLink(editor, url) {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
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
}

export function insertImage(editor, url, legende, credit) {
    const text = {text: ''};
    // insert a paragraph after image so we can insert something after image
    const image = [
        {type: 'image', url, legende, credit, children: [text]},
        {
            type: "paragraph",
            children: [text]
        }
    ];
    Transforms.insertNodes(editor, image);
}
export function isImageUrl(url) {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop();
    return imageExtensions.includes(ext);
}
export function insertVideo(editor, url) {
    const text = {text: ''};
    const image = {type: 'video', url, children: [text]};
    Transforms.insertNodes(editor, image);
}
export function insertVideoModal(editor, url, isModal) {
    const text = {text: ''};
    const videoModal = {type: 'video', modal: isModal, url, children: [text]};
    Transforms.insertNodes(editor, videoModal);
}

export function insertAudio(editor, url) {
    const text = {text: ''};
    const audio = {type: 'audio', url, children: [text]};
    Transforms.insertNodes(editor, audio);
}

export function insertPdf(editor, url, textValue) {
    const text = {text: ''};
    const pdf = {type: 'pdf', url, dataText: textValue != '' ? textValue : 'Test PDF Download', children: [text]};
    Transforms.insertNodes(editor, pdf);
}
