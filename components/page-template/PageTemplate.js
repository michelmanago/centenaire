// libs
import htmlParse from 'html-react-parser'


export default function PageTemplate({page}){

    return (
        <div>

            <h1 className="text-3xl font-bold mb-10">{page.pageName}</h1>

            {/* Render blocks */}
            {
                page && page.blocks.map(block => (
                    htmlParse(block.content)
                ))
            }

        </div>
    )

}