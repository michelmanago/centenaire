import { dissociateMediaFromPage } from "../../model/media_page";

export default async function handler(req, res) {
    try {

        if (req.method === 'DELETE')  {
            
            const page = req.query.page
            const media = req.query.media

            // delete association
            await dissociateMediaFromPage(media, page)

            return res.json("ok");
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}