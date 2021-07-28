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
                    var valueArray = e.currentTarget.value.split('\n');
                    var value = '';
                    for (const val of valueArray) {
                        value += val;
                    }
                    setContent(value.replace(/\s{2,}/g, ''));
                }}
            />
        </>
    );
}
