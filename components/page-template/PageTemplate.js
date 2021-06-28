// libs
import htmlParse from 'html-react-parser'
import { getMediaLink } from '../../utils/utils-serveur-image'


export default function PageTemplate({page}){

    return (
        <div className="">
            
            {/* Banner */}
            {page.bandeau && (
                <div style={{height: 300}} className="border">
                    <img className="block h-full w-full object-cover" src={getMediaLink(page.bandeau.public_path)} alt="" />
                </div>
            )}

            {/* Content */}

            <div className="border max-w-screen-xl mx-auto py-10 px-10 bg-white">
                <h1 className="text-5xl font-bold mb-10">{page.pageName}</h1>

                {/* Render blocks */}
                {
                    page && page.blocks.map(block => (
                        htmlParse(block.content)
                    ))
                }

            </div>
        </div>
    )

}