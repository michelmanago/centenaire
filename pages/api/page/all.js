import { getAllPages } from "../../../model/page";

export default async function handler(req, res) {
    try {
        if(req.method === 'GET'){

            // query
            const locale = req.query.locale

            // model
            const pages = await getAllPages(locale)

            return res.json(pages || [])
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