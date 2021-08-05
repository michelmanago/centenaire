import { getMedia } from "../../model/media";

export default async function handler(req, res) {
    try {

        if (req.method === 'GET')  {
            
            const page_id = req.query.page_id
            const page_offset = req.query.page_offset
            const accepts = req.query.accepts ? req.query.accepts.split("-") : []
            
            const medias = await getMedia(page_id, page_offset, accepts)

            return res.json(medias);
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message })
    }
}