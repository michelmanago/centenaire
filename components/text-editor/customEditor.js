import React, {useEffect, useState} from 'react';

import Editor from './Editor';
import SlateHtmlEditor from './slateHtmlEditor';

import 'reactjs-popup/dist/index.css';
import {deserialize, serializer} from '../../lib/Slate/serialize';
import SampleDocument from './SampleDocument';
import deepEqual from 'deep-equal';

/* Still bug when changing text then block position */
export default function CustomEditor({block, setContent, originalPageId, addAttributedMedia, currentPage}) {
    const [isSlateView, setIsSlateView] = useState(true);
    const [slateContent, setSlateContent] = useState(() => SampleDocument);
    const [contentLoad, setContentLoad] = useState(false);

    if (typeof window === 'undefined') {
        return <div>Loading ...</div>;
    }

    useEffect(() => {
        
        const document = new DOMParser().parseFromString(block, 'text/html');
        var blockContent = deserialize(document.body);

        if (block != '' && !contentLoad) {
            setContentLoad(true);
            setSlateContent(blockContent);
        } else if (block != '' && !deepEqual(blockContent, slateContent) ) {
            setSlateContent(blockContent);
        }
    });

    // Methods
    const changeView = event => {
        event.preventDefault();
        setIsSlateView(!isSlateView);
    };

    const onChangeEditor = value => {
        setSlateContent(value);
        const valueSerialize = serializer(value);
        setContent(valueSerialize);
    };
    const onChangeHtmlEditor = value => {
        setContent(value);
        const document = new DOMParser().parseFromString(block, 'text/html');
        const valueDeserialize = deserialize(document.body);
        setSlateContent(valueDeserialize);
    };

    return (
        <div>

            {/* Switch editors */}
            <div className="flex justify-end">
                <SwitchButton
                    onClick={changeView}
                    label="Editeur HTML"
                    isActive={!isSlateView}
                />
                <SwitchButton
                    onClick={changeView}
                    label="Editeur Visuel"
                    isActive={isSlateView}
                />
            </div>


            {/* Editors */}
            {
                // VISUAL EDITOR
                isSlateView ? (
                    <div className="bg-white border border-black h-screen-90">
                        {/*<Editor block={block} setContent={setContent} defuntId={defuntId} />*/}
                        <Editor
                            originalPageId={originalPageId}
                            document={slateContent}
                            onChange={onChangeEditor}
                            addAttributedMedia={addAttributedMedia}
                            currentPage={currentPage}
                        />
                    </div>
                ) : 
                // CODE EDITOR
                
                (
                    <div className="h-full bg-white border border-black">
                        <SlateHtmlEditor block={block} setContent={onChangeHtmlEditor} />
                    </div>
                )
            }
        
        </div>
    )
}


const SwitchButton = ({isActive, onClick, label}) => (
    <button
        className={`px-3 py-1 text-gray-900 border-t border-l border-r border-gray-900 rounded-t ${isActive ? "bg-gray-400 cursor-not-allowed" : ""}`}
        onClick={onClick}
        disabled={isActive}
    >
        {label}
    </button>
)