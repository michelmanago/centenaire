import { selectPageBySlug } from "../../../dao/page";
import { createNewPage, updateTranslations } from "../../../model/page";
import { getPageModelById } from "../../../model/page_model";

export default async function handler(req, res) {
    try {

        // creation
        if (req.method === 'POST')  {
            
            // body

            const jsonBody = JSON.parse(req.body)

            const ids = await createNewPage(jsonBody)

            // retrived created pages
            const pages = await Promise.all(ids.map(id => getPageModelById(id)))

            return res.json(pages)
        } 

        else if(req.method === "PUT"){

            const updatedPageId = await updateTranslations(req.body)            
            return res.json(updatedPageId)
        }

        else if(req.method === 'GET'){


            if(!req.query || (req.query && req.query.slug === undefined)){
                return res.status(400).json({ message: 'no query found' })
            }

            const slug = req.query.slug
            const page = await selectPageBySlug(slug)

            // we must return empty array for getAvailableSlugs()
            return res.json(page || [])
        }
        
        else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        console.log(e)

        if(e.status){
            res.status(e.status)
        } else {
            res.status(500)
        }
        
        return res.json({ message: e.message })
    }
}