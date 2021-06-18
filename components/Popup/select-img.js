import {useEffect, useState} from 'react';
import {useSlate} from 'slate-react';
import Popup from 'reactjs-popup';
import {Image} from '../Slate/icon';

export default function Toolbar({defuntId, cb}) {
    const editor = useSlate();
    const [open, setOpen] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [defuntPj, setDefuntPj] = useState(null);
    const [selection, setSelection] = useState(null);

    const pjUrl = `${process.env.NEXT_PUBLIC_UPLOAD_SERVER_HOST}/uploads/`;

    // fetch data
    useEffect(() => {
        fetch(`/api/defunts/pj/${defuntId}`)
            .then(res => res.json())
            .then(data => setDefuntPj(data));
    }, []);

    const handleImg = e => {
        e.preventDefault();
        if (!imgUrl) return;
        //CustomEditor.insertImage(editor, url);
        console.log(selection);
        let editorTmp = {...editor};
        editorTmp.selection = selection;
        cb(editorTmp, imgUrl);
        setOpen(false);
        //CustomEditor.toggleBlock(editor, 'bulleted-list')
    };

    return (
        <>
            <button
                className="px-1 text-black"
                onClick={e => {
                    e.preventDefault();
                    console.log(editor);
                    if (editor.selection != null) {
                        setSelection(editor.selection);
                        setOpen(true);
                    }
                }}
            >
                <Image isActive={true} />
            </button>
            <Popup
                open={open}
                position="top center"
                modal="true"
                closeOnDocumentClick
                onClose={e => {
                    setOpen(false);
                }}
            >
                <input
                    className="px-1 border border-black rounded"
                    type="text"
                    value={imgUrl}
                    placeholder="url de l'image"
                    onChange={e => {
                        setImgUrl(e.target.value);
                    }}
                />

                <div className="w-full my-2 border border-black"></div>

                {defuntPj ? (
                    <div>
                        {defuntPj.map(pj =>
                            pj.categorie === 'image' ? (
                                <img
                                    className="w-40 cursor-pointer"
                                    onClick={e => {
                                        setImgUrl(`${pjUrl}${pj.url}`);
                                    }}
                                    src={`${pjUrl}${pj.url}`}
                                    alt={pj.url}
                                    key={pj.id}
                                />
                            ) : null,
                        )}
                    </div>
                ) : null}

                <button className="px-1 text-black border border-black" onClick={handleImg}>
                    Ajouter
                </button>
            </Popup>
        </>
    );
}
