// utils
import { fromTreedataToDBData } from "../../../utils/editor-menu-formats"


export default function MenuEditorSubmit({canSave, setCanSave, form, menuLocales}){

    // state

    // listener
    const onSubmitSave = async () => {
    
        if(confirm("Êtes vous sûr de vouloir sauvegarder les nouveaux menus ? ")){

            let menusData = form.map((menu, menuIndex) => ({
                locale: menuLocales[menuIndex],
                data: fromTreedataToDBData(menu)
            }))

            let promiseSettingMenu = menusData.map(menuDataItem => 
                fetch("/api/menu", {
                    method: "PUT",
                    body: JSON.stringify(menuDataItem) 
                })
                .then(response => {
                    if(response.ok){
                        return response.json()
                    } else {
                        throw new Error(response.statusText);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            )

            let responses = await Promise.all(promiseSettingMenu)
            
            setCanSave(false)

            alert("Menus sauvegardé")

        }
    }


    return (
        <div className="fixed bottom-0 left-0 w-full border-2 bg-white z-10 h-20 flex items-center justify-end pr-2">
            <button 
                onClick={onSubmitSave}
                disabled={!canSave}
                className={"bg-blue-700 rounded px-5 py-4 text-2xl text-white font-bold " + (
                    canSave ? 
                        "hover:bg-blue-800" 
                        : "bg-gray-300 opacity-50 cursor-not-allowed"
                )}
            >
                <span>Sauvegarder</span>
            </button>
        </div>
    )
}