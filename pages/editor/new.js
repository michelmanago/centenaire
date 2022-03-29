import Editor from '../../components/text-editor/Editor';
import ExampleDocument from '../../components/text-editor/ExampleDocument';
import {useState} from 'react';
import CustomEditor from '../../components/text-editor/customEditor';

export default function NewEditor() {
    const [document, updateDocument] = useState('');
    return (
        <>
            <div>WYSIWYG Editor</div>
            <button>Display Block</button>
            <div className="w-5/6 px-2 mx-auto bg-white">

                <CustomEditor block={document} setContent={updateDocument} />
            </div>
        </>
    );
}
