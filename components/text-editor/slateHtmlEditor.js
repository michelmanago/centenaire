// @refresh reset

// Import React dependencies.
import React from 'react';
// Import the Slate editor factory.


export default function SlateEditor({block, setContent}) {
    return (
        <>
            <textarea
                className="w-full"
                value={block}
                onInput={e => {
                    e.target.style.height = 'inherit';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onChange={e => {
                    var valueNoNewLine = e.currentTarget.value.replace(/\n\s{2,}/g, ' ');
                    setContent(valueNoNewLine.replace(/>\s+</g, '><'));
                }}
            />
        </>
    );
}
