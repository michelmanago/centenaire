import React, {useEffect, useState} from 'react';

import Editor from './Editor';
import SlateHtmlEditor from './slateHtmlEditor';

import 'reactjs-popup/dist/index.css';
import {deserialize, serializer} from '../../lib/Slate/serialize';
import SampleDocument from './SampleDocument';
import deepEqual from 'deep-equal';

/* Still bug when changing text then block position */
export default function CustomEditor({block, setContent, originalPageId, addAttributedMedia, position}) {
    const [isSlateView, setIsSlateView] = useState(true);
    const [slateContent, setSlateContent] = useState(() => SampleDocument);
    const [contentLoad, setContentLoad] = useState(false);

    if (typeof window === 'undefined') {
        return <div>Loading ...</div>;
    }

    useEffect(() => {
        console.log('mount');
        const document = new DOMParser().parseFromString(block, 'text/html');
        var blockContent = deserialize(document.body);
        if (block != '' && !contentLoad) {
            setContentLoad(true);

            setSlateContent(blockContent);
        } else if (block != '' && !deepEqual(blockContent, slateContent) ) {
            setSlateContent(blockContent);
            console.log('check not equal');
        }

        return () => {
            //setContentLoad(false);
            //console.log('unmount');
        };
    });
    const changeView = event => {
        event.preventDefault();
        setIsSlateView(!isSlateView);
    };

    const onChangeEditor = value => {
        setSlateContent(value);
        const valueSerialize = serializer(value);
        //console.log(valueSerialize);
        setContent(valueSerialize);
    };
    const onChangeHtmlEditor = value => {
        setContent(value);
        const document = new DOMParser().parseFromString(block, 'text/html');
        //console.log(document.body);
        const valueDeserialize = deserialize(document.body);
        setSlateContent(valueDeserialize);
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
                        <Editor
                            originalPageId={originalPageId}
                            document={slateContent}
                            onChange={onChangeEditor}
                            addAttributedMedia={addAttributedMedia}
                        />
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
                        <SlateHtmlEditor block={block} setContent={onChangeHtmlEditor} />
                    </div>
                </>
            )}
        </div>
    );
}
