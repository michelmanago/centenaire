import { validateMediaLegende } from "../../../components/validate/media"
import { updateMedia } from "../../../model/media"

export default async function handler(req, res) {

    try {

        // creation
        if (req.method === 'PUT')  {
            
            // body
            const id = req.query.id
            const fields = req.body

            console.log("ff", fields)
            
            if(!id){
                return res.status(400).json({
                    message: "Vous devez specifiez l'id du media."
                })
            }

            // Validate
            if(fields.legende && !validateMediaLegende(fields.legende)){
                return res.status(400).json("legende is invalid")
            } 

            // do
            const results = await updateMedia(id, fields)

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