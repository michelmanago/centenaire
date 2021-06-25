export const RemoveButton = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="flex items-center justify-center bg-red-600 text-white border rounded px-3 py-0 hover:bg-red-800"
        >
            Retirer
        </button>
    );
};

export const UpdateButton = ({onClick, label = 'Modifier'}) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="flex items-center justify-center bg-gray-600 text-white border rounded px-3 py-0 hover:bg-gray-700"
        >
            {label}
        </button>
    );
};
