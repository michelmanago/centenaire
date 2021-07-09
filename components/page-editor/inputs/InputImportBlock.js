// libs
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";

// components
import IconClose from "../../icons/IconClose";

export default function InputImportBlock({pages, currentPage, updateCurrentPage}){


    // utils
    const currentPageIdOrTempId = currentPage.id || currentPage.temp_id
    const pagesExceptCurrent = pages.filter(page => {
        const pageIdOrTempId = page.id || page.temp_id
        return pageIdOrTempId !== currentPageIdOrTempId
    })
    const formatBlockListForState = page => {
        const blocks = page.blocks.map(block => {
            return {
                ...block,
                selected: true
            }
        })

        return blocks
    }



    // states
    const [open, setOpen] = useState(false)
    const [blockList, setBlockList] = useState(formatBlockListForState(pagesExceptCurrent[0]))


    // others
    const selectedBlocks = blockList.filter(b => b.selected)
    const selectedCount = selectedBlocks.length
    const canSave = !!selectedCount

    // methods

    const submitAddBlocs = () => {

        const newBlocks = [...currentPage.blocks]

        // add imported blocks with correct positions
        selectedBlocks.forEach(block => {
            newBlocks.push({
                ...block,
                position: newBlocks.length + 1
            })
        })

        // update current page
        updateCurrentPage({blocks: newBlocks})
        
        // close modal
        onClose()
    }

    const onClose = () => {
        setOpen(false)
    }
    
    const onChooseTranslation = e => {

        const language = e.target.value
        console.log(language)
        const translation = pagesExceptCurrent.find(page => page.language === e.target.value)
        
        if(translation){
            setBlockList(formatBlockListForState(translation))
        }
    }

    const selectOneBlock = index => event => {

        setBlockList(blockList.map((block, blockIndex) => {
            if(blockIndex === index){
                return {
                    ...block,
                    selected: !block.selected
                }
            } else {
                return block
            }
        }))
    }

    useEffect(() => {
        
        console.log("mount")

        return () => {
            console.log("unmount")
        }

    }, [])
    
    return (
        <div className="mt-5">

            {/* Trigger */}
            <button onClick={e => setOpen(true)} className="bg-gray-200 border-2 border-gray-300 text-gray-700 px-2 py-1 rounded">Importer des blocs</button>

            <Popup
                open={open}
                modal
                onClose={onClose}
            >

                <div className="p-5 flex flex-col">

                        {/* Close */}
                        <button onClick={onClose} className="absolute text-gray-700 hover:text-gray-800 right-2 top-2">
                            <IconClose/>
                        </button>

                        {/* Which translations ? */}
                        <div className="">
                            <label className="text-lg block mb-2 font-medium" htmlFor="translation">Choisir depuis quel traductions :</label>
                            <select onChange={onChooseTranslation} id="translation" className="block border-2 rounded w-1/3 px-2 py-1">
                                {
                                    pagesExceptCurrent.map(page => {

                                        const pageIdOrTempId = page.id || page.temp_id

                                        return (
                                            <option value={page.language} className="" key={pageIdOrTempId}>Version {page.language.toUpperCase()}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        {/* Block list */}
                        {
                            blockList.length === 0 ? (
                                <p className="border-2 mt-5 py-2 bg-gray-100 rounded text-center">Il n'y a pas encore de blocs dans cette page.</p>
                            ) : (
                                <div className="mt-5">
                                    <p className="block font-medium" htmlFor="translation">Choisir les blocs à importer :</p>
                                    <div className="border-2 w-2/3 self-center pt-2 px-3">

                                        {
                                            blockList.map((block, blockIndex) => {

                                                const key = "block-" + block.position
                                                const selected = block.selected

                                                return (
                                                    <button type="button" key={key} onClick={selectOneBlock(blockIndex)} className={`flex w-full py-1 px-5 items-center border-dashed rounded border-2 border-transparent mb-2 hover:bg-green-100 ${selected ? "border-green-400" : ""}`}>
                                                        
                                                        {/* Position */}
                                                        <span className="inline-block text-left select-none flex-shrink -0 font-medium text-xl w-1/4">#{block.position}</span>
                                                        
                                                        {/* Type */}
                                                        <span className="inline-block text-left select-none flex-shrink-0 font-medium text-xl capitalize w-1/3 mr-auto">{block.type}</span>
                                                    
                                                        {/* Checkbox */}
                                                        <Checkbox checked={selected}/>
                                                    </button>
                                                )

                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }

                        {/* Valider importation */}
                        <button onClick={submitAddBlocs} disabled={!canSave} type="button" className={`mt-5 bg-blue-600 text-white py-2 rounded text-lg flex items-center justify-center ${canSave ? "" : "opacity-50 cursor-not-allowed"}`}>
                            <span className="">Importer les blocs</span>
                            {
                                selectedCount ? <span className="ml-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-900 bg-white rounded-full">{selectedCount}</span> : ""
                            }
                        </button>

                </div>

            </Popup>

        </div>
    )

}

const Checkbox = ({checked}) => (
    <div className={`border-2 flex justify-center items-center rounded text-green-700 text-sm font-semibold border-gray-300 w-6 h-6  ${checked ? "border-green-500" : ""}`}>
        {checked ? "✓" : ""}
    </div>
)