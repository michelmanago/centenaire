import { removePage } from "../../../model/page";

export default async function handler(req, res) {
    try {

        // creation
        if (req.method === 'DELETE')  {
            
            // body
            const id = req.query.id
            
            if(!id){
                return res.status(400).json({
                    message: "Vous devez specifiez l'id de la page."
                })
            }

            // 

            const results = await removePage(id)

            return res.json(results)
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