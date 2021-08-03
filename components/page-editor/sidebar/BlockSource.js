import PageEditorSidebarBlock from "./page-editor-sidebar-block";

export default function BlockSource({ source, updatePages }) {

    const setSource = e => updatePages({ source: e.target.value });

    return (
        <PageEditorSidebarBlock title="Source">

            {/* Source */}
            <div className="flex items-center w-full mb-2">
                <textarea
                    className="flex-1 px-3 py-1 h-14 border rounded resize-none"
                    id="inputSource"
                    type="text"
                    value={source}
                    onChange={setSource}
                />
            </div>
        </PageEditorSidebarBlock>
    )

}