import PageEditorInputImage from "../page-editor/sidebar/PageEditorInputImage";

export default function ImageSelector({}) {
    const onUpload = () => {

    }
    const onRemove = () => {

    }
    return (
        <div>
            <div>Selection d'image</div>
            <div className="flex flex-row">
                <div className="w-3/4">
                    <div>Média</div>
                </div>
                <div className="w-1/4">
                    <div>Upload</div>
                    <PageEditorInputImage onMediaUploaded={onUpload} onRemoveMedia={onRemove} mediaId={null} />
                </div>
            </div>
        </div>
    );
}
