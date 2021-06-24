const PageEditorSidebarBlock = ({title, children}) => {
    return (
        <div className="py-3 mb-5 border rounded-sm">
            
            {/* Header */}
            <div className="px-4 pb-2 mb-4 border-b">
                <h3 className="text-2xl font-semibold">{title}</h3>
            </div>

            {/* Block */}
            <div className="px-4">{children}</div>
        </div>
    );
};

export default PageEditorSidebarBlock