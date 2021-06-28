const MenuEditorLink = ({
    formTitle,
    formSubmitLabel,

    onSubmit,

    label,
    onLabelChange,
    href,
    onHrefChange,

    afterSubmit
}) => {
    return (
        <form>

            {/* Label */}
            <div className="flex items-center mb-5">
                <label className="font-medium w-1/3" htmlFor="inputLabel">
                    Label
                </label>
                <input
                    value={label}
                    onChange={event => onLabelChange(event.target.value)}
                    className="ml-auto bg-gray-100 p-3 rounded w-full"
                    type="text"
                    id="inputLabel"
                    placeholder="Titre de page"
                />
            </div>

            {/* URL */}
            <div className="flex items-center">
                <label className="font-medium w-1/3" htmlFor="inputHref">
                    URL
                </label>
                <input
                    value={href}
                    onChange={event => onHrefChange(event.target.value)}
                    className="ml-auto bg-gray-100 p-3 rounded w-full"
                    type="text"
                    id="inputHref"
                    placeholder="https://"
                />
            </div>

            {/* Actions*/}
            <div className="flex mt-5">

                {/* Submit */}
                <button
                    type="button"
                    onClick={onSubmit}
                    className="h-10 bg-green-400 hover:bg-green-500 px-3 py-1 rounded text-white font-medium text-md mr-3"
                >
                    {formSubmitLabel}
                </button>

                {/* After */}
                {afterSubmit}
            </div>
        </form>
    );
};

export default MenuEditorLink