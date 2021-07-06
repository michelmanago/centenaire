import React, {useRef, useEffect, useState} from 'react';

import Editor from './Editor';
import SlateHtmlEditor from './slateHtmlEditor';

import 'reactjs-popup/dist/index.css';
import {deserialize, serializer} from '../../lib/Slate/serialize';
import SampleDocument from './ExampleDocument';

export default function CustomEditor({block, setContent}) {
    const [isSlateView, setIsSlateView] = useState(true);
    const changeView = event => {
        event.preventDefault();
        setIsSlateView(!isSlateView);
    };
    if (typeof window === 'undefined') {
        return (
            <div>Loading ...</div>
        )
    }
    var blockContent = block;
    if (isSlateView && block === '') {
        blockContent = SampleDocument;
    } else if (isSlateView) {
        const document = new DOMParser().parseFromString(block, 'text/html');
        blockContent = deserialize(document.body);
    }

    const onChangeEditor = value => {
        const valueSerialize = serializer(value);
        setContent(valueSerialize);
    };
    return (
        <div className="">
            {isSlateView ? (
                <>
                    <div className="flex justify-end">
                        <button
                            className="px-2 border-t border-l border-r border-gray-900 rounded-t text-pdarkblue"
                            onClick={changeView}
                        >
                            Editeur HTML
                        </button>
                        <button
                            className="px-2 ml-2 text-white bg-gray-400 border-t border-l border-r border-gray-900 rounded-t cursor-not-allowed"
                            onClick={changeView}
                            disabled
                        >
                            Editeur Visuel
                        </button>
                    </div>
                    <div className="bg-white border border-black h-screen-90">
                        {/*<Editor block={block} setContent={setContent} defuntId={defuntId} />*/}
                        <Editor document={blockContent} onChange={onChangeEditor} />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-end">
                        <button
                            className="px-2 text-white bg-gray-400 border-t border-l border-r border-gray-900 rounded-t cursor-not-allowed"
                            onClick={changeView}
                            disabled
                        >
                            Editeur HTML
                        </button>
                        <button
                            className="px-2 ml-2 border-t border-l border-r border-gray-900 rounded-t text-pdarkblue"
                            onClick={changeView}
                        >
                            Editeur Visuel
                        </button>
                    </div>
                    <div className="h-full bg-white border border-black">
                        <SlateHtmlEditor block={block} setContent={setContent} />
                    </div>
                </>
            )}
        </div>
    );
}
