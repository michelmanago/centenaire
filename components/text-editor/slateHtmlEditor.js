// @refresh reset

// Import React dependencies.
import React, { useEffect, useRef } from 'react';
// Import the Slate editor factory.


export default function SlateEditor({block, setContent}) {
    const ref = useRef();
    console.log(ref);
    useEffect(() => {
        console.log(ref);
        ref.current.style.height = 'inherit';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
    }, [ref]);
    return (
        <>
            <textarea
                ref={ref}
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
