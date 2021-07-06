import Popup from "reactjs-popup"

export default function TexteAnnote({texte, note}) {
    console.log("texte="+texte)
    return (
        <Popup
            trigger={open => (
                <span className="pointille">{texte}</span>
            )}
            position="bottom center"
            on={["hover", "focus"]}
        >
            <span className="text-white bg-gray-500 inline-block py-8 px-8 max-w-sm   rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"> 
            {note}</span>
    </Popup>

    )
}