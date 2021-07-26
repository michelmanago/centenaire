import { getMedias } from "../../dao/media";

export default async function handler(req, res) {
    try {

        if (req.method === 'GET')  {
            
            const page_id = req.query.page
            const get_associated_page = req.query.get_associated_page
            
            const medias = await getMedias(page_id, get_associated_page)

            return res.json(medias);
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}