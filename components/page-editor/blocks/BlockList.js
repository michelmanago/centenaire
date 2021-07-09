// components
import { blockFormat } from '../../../utils/page-editor-formats';
import BlockContentEditor from '../blocks/BlockContentEditor';

// utils
import InputAddBlock from '../inputs/InputAddBlock';
import InputImportBlock from '../inputs/InputImportBlock';

export default function BlockList({blockList, updateCurrentPage, originalPageId, pages, currentPage}){

    // utils

    const sortedBlocks = (blocks) => {

        const sortedBlocks = [...blocks]
        sortedBlocks.sort((a, b) => a.position - b.position)

        return sortedBlocks

    }

    // listeners

    const addBlockContent = type => {

        // if blocks are draggable we must count each items's postions to compute a new position
        const newPosition = blockList.length + 1
        const newBlock = blockFormat(type, newPosition)

        updateCurrentPage({
            blocks: [
                ...blockList,
                newBlock
            ]
        })

    };

    const setBlockContent = blockPosition => value => {
        
        let blocks = blockList.map(block => {

            if(block.position === blockPosition){
                return {
                    ...block,
                    content: value
                }
            } else {
                return block
            }

        })

        updateCurrentPage({blocks})   
    }

    const removeBlockContent = initialBlock => e => {
        
        let blocks = blockList.filter(block => block.position !== initialBlock)
        
        // reorder
        blocks = blocks.map(block => {

            if(block.position > initialBlock){
                return {
                    ...block,
                    position: block.position - 1
                }
            } else {
                return block
            }

        })
        

        updateCurrentPage({blocks})   
    }

    const setBlockPosition = initialPosition => direction => {

        const newPosition = initialPosition + direction

        if(newPosition <= blockList.length && newPosition > 0){ 

            const blocks = blockList.map(block => {

                if(block.position === initialPosition){
                    return {
                        ...block,
                        position: newPosition,
                    }
                } 
                
                else if(block.position === newPosition){
                    return {
                        ...block,
                        position: initialPosition
                    }
                }
                
                else {
                    return {
                        ...block
                    }
                }

            })

            updateCurrentPage({blocks})   

        } else {
            console.log("OUT")
        }
        

    }

    // prevent from mapping String
    const list = blockList && Array.isArray(blockList) ? blockList : []

    return (
        <div className="">
            
            {/* Actions */}
            <div className="flex">
                {/* Input - add block */}
                <InputAddBlock addBlock={addBlockContent} />

                {/* Import */}
                <InputImportBlock updateCurrentPage={updateCurrentPage} pages={pages} currentPage={currentPage}/>
            </div>
            
            {/* List */}
            {
                list && (
                    sortedBlocks(list).map((block, blockIndex) => {
                        
                        return (
                            <BlockContentEditor 
                                key={"block-" + block.position} 
                                type={block.type}
                                content={block.content}
                                position={block.position}
                                originalPageId={originalPageId}
    
                                // actions
                                setContent={setBlockContent(block.position)}
                                removeBlockContent={removeBlockContent(block.position)}
                                setBlockPosition={setBlockPosition(block.position)}
                            />
                        )
    
                    })
                )
            }
        </div>
    )

}