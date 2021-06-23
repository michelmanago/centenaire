import { createNewPage, createPage, getPageById, getPageBySlug } from "../../../model/page";
import { createPageModel, getPageModelById } from "../../../model/page_model";

export default async function handler(req, res) {
    try {

        // creation
        if (req.method === 'POST')  {
            
            // body

            const jsonBody = JSON.parse(req.body)

            const ids = await createNewPage(jsonBody)
            const pages = await Promise.all(ids.map(id => getPageModelById(id)))
            console.log(pages)

            return res.json(pages)
        } 

        else if(req.method === 'GET'){

            if(!req.query || (req.query && req.query.slug === undefined)){
                return res.status(400).json({ message: 'no query found' })
            }

            const slug = req.query.slug
            const page = await getPageBySlug(slug)

            return res.json(page)
        }
        
        else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message })
    }
}