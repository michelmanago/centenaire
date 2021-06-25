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
                <label className="font-semibold w-1/3" htmlFor="inputLabel">
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
                <label className="font-semibold w-1/3" htmlFor="inputHref">
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

            {/* Submit */}
            <button
                type="button"
                onClick={onSubmit}
                className="bg-green-400 hover:bg-green-500 p-3 rounded text-white font-semibold text-lg mt-10"
            >
                {formSubmitLabel}
            </button>

            {afterSubmit}
        </form>
    );
};

export default MenuEditorLink