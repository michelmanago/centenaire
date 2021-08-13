import { getPagesByName } from "../../../model/page";


export default async function handler(req, res) {
    try {

        if(req.method === 'GET'){

            if(!req.query || (req.query && req.query.name === undefined)){
                return res.status(400).json({ message: 'no query found' })
            }

            const name = req.query.name
            const pages = await getPagesByName(name)

            // we must return empty array for getAvailableSlugs()
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