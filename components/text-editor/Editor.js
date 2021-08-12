import {useCallback, useMemo, useState} from 'react';
import {createEditor} from 'slate';
import {Editable, Slate, withReact} from 'slate-react';
import isUrl from 'is-url';
import Toolbar from './Toolbar';
import useEditorConfig from './useEditorConfig';
import useSelection from './useSelection';
import { withHistory } from 'slate-history'

import {wrapLink, insertImage, isImageUrl} from './EditorUtils';

const withLinks = editor => {
    const {insertData, insertText, isInline} = editor;

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element);
    };

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertText(text);
        }
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');

        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

const withImages = editor => {
    const {insertData, isVoid} = editor;

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element);
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const {files} = data;

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result;
                        insertImage(editor, url);
                    });

                    reader.readAsDataURL(file);
                }
            }
        } else if (isImageUrl(text)) {

            insertImage(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};

const withPDF = editor => {
    const {isVoid} = editor;

    editor.isVoid = element => {
        return element.type === 'pdf' ? true : isVoid(element);
    }

    return editor;
}

export default function Editor({document, onChange, originalPageId, addAttributedMedia, currentPage}) {


    console.warn("using useState instead of useMemo Editor.js (to avoid fast-refresh crash with <Editable/>)")
    // NOTE: When refreshing code using useState doesn't cause Error https://github.com/ianstormtaylor/slate/issues/4081
    const [editor] = useState(withPDF(withLinks(withImages(withHistory(withReact(createEditor()))))), []);
    // const editor = useMemo(() => withPDF(withLinks(withImages((withReact(createEditor()))))), []);


    const {renderElement, renderLeaf, onKeyDown} = useEditorConfig(editor);
    const [selection, setSelection] = useSelection(editor);
    const [previousSelection, setPreviousSelection] = useState(editor);

    const onChangeHandler = useCallback(
        newDocument => {
            if (newDocument != document) onChange(newDocument);
            setSelection(editor.selection);
        },
        [editor.selection, onChange, setSelection],
    );
    
    return (
        <div className="pagecontent">
            <Slate editor={editor} value={document} onChange={onChangeHandler}>
                <Toolbar
                    originalPageId={originalPageId}
                    selection={selection}
                    addAttributedMedia={addAttributedMedia}
                    currentPage={currentPage}
                />
                <Editable className="px-5 py-5" renderElement={renderElement} renderLeaf={renderLeaf} onKeyDown={onKeyDown} />
            </Slate>
        </div>
    );
}
