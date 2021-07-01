// libs
import htmlParse from 'html-react-parser';

// utils

// components
import CarouselParam from '../../carouselParam';


export default function PageContent({pageName, blocks}){

    // prevent from mapping String
    const list = blocks && Array.isArray(blocks) ? blocks : null


    let blockList = ""

    if(!list && blocks){
        blockList = (
            <p className="text-red-600">Impossive d'afficher les blocks de cette page.</p>
        )
    } else {
        blockList = list && list.map((block, index) => {

            if (block.type === 'text') {
                return <div key={index}>{htmlParse(block.content)}</div>;
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