import { getMediaList, getMediaWithPages } from "../../model/media";

export default async function handler(req, res) {
    try {

        if (req.method === 'GET')  {
            
            const page_id = req.query.page_id
            const pageOffset = req.query.page_offset ? Number(req.query.page_offset) : 0
            const with_pages = req.query.with_pages
            
            let media = null

            if(with_pages){
                media = await getMediaWithPages(page_id, pageOffset)
            } else {
                media = await getMediaList(page_id, pageOffset)
            }
            

            return res.json(media);
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message })
    }
}