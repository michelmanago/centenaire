import { getMedias } from "../../dao/media";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET')  {
        
            const medias = await getMedias()

            return res.json(medias);
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}