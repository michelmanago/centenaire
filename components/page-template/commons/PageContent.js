// libs
import htmlParse from 'html-react-parser';

// utils

// components
import CarouselParam from '../../carouselParam';
import TexteAnnote from '../../Popup/texteannote';


export default function PageContent({pageName, blocks}){

    // prevent from mapping String
    const list = blocks && Array.isArray(blocks) ? blocks : null


    // Helpers
    const sortedBlocks = (blocks) => {

        const sortedBlocks = [...blocks]
        sortedBlocks.sort((a, b) => a.position - b.position)

        return sortedBlocks

    }


    let blockList = ""

    if(!list && blocks){
        blockList = (
            <p className="text-red-600">Impossive d'afficher les blocks de cette page.</p>
        )
    } else {

        blockList = list && sortedBlocks(list).map((block, index) => {

            if (block.type === 'text') {
                return (
                    <div 
                        key={index}
                    >
                        {htmlParse(block.content, {
                            replace: domNode => {

                                // Render Tooltip {TexteAnnote}
                                if(domNode.attribs && domNode.attribs["data-js-tooltip"] !== undefined){

                                    
                                    if(domNode.firstChild && domNode.firstChild.type === "text"){

                                        const text = domNode.firstChild.data
                                        const note = domNode.attribs["data-note"]

                                        return <TexteAnnote  texte={text} note={note} />

                                    } else {
                                        console.warn("First child is not type text")
                                    }

                                }
                            }
                        })}
                    </div>
                )
            } else if (block.type === 'carousel') {
                return (
                    <div key={block.id}>
                        <CarouselParam imgList={block.content.data} legende={block.content.legende} id={block.id} />
                    </div>
                );
            }
        })
    }

    return (
        <div className="pagecontent">

            {/* Title */}
            <h1 className="mb-10 text-5xl font-bold">{pageName}</h1>

            {/* Render blocks */}
            {
                blockList
            }
        </div>
    )

}