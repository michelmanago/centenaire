import { useEffect, useRef, useState } from "react"

const defaultRenderResult = data => {
    return data
}

export default function SelectSearch({inputPlaceholder = "", value, setValue, results = [], renderResult = defaultRenderResult, getKey, onSelect}){

    // ref
    const popupRef = useRef()

    // states
    const [open, setOpen] = useState(false)

    // open modal when there is results
    useEffect(() => {

        if(results && results.length){
            setOpen(true)
        } else {
            setOpen(false)
        }

        return () => {
            setOpen(false)
        }

    }, [results])

    // onClickOutside
    useEffect(() => {

        const onClickOutside = event => {

            const modal = popupRef.current
    
            if(modal){

                const closestModalParent = event.target.closest("#select-search-wrapper")

                if(closestModalParent){
                    setOpen(true)
                    return;
                }
            } 


            setOpen(false)

        }

        window.addEventListener("click", onClickOutside)

        return () => {
            window.removeEventListener("click", onClickOutside)
        }
        
    }, [popupRef])

    return (
        <div id="select-search-wrapper" ref={popupRef} className="relative">
            
            {/* Select */}
            <input 
                placeholder={inputPlaceholder}
                type="text" 
                value={value}
                onChange={e => setValue(e.target.value)}
                className="w-full px-2 h-8 text-sm rounded border"
            />

            {/* Results */}
            {
                open && (
                    (results && results.length) ? (
                        <div className="max-h-64 overflow-auto absolute z-20 left-0 w-full bg-white shadow shadow-lg border rounded top-10">
                            <div className="border">
                                {
                                    results.map((item, index) => {
    
                                        const key = getKey ? getKey(item) : index
    
                                        return (
                                            <button 
                                                key={key} 
                                                onClick={() => {
                                                    onSelect(item)
                                                    setOpen(false)
                                                }} 
                                                className="w-full text-left border px-3 py-1 hover:bg-gray-200"
                                            >
                                                {
                                                    renderResult(item)
                                                }
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : ""
                )
            }

        </div>
    )

}