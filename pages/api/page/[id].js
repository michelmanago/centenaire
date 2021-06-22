import { getPageById, updatePage } from "../../../model/page";

export default async function handler(req, res) {
    try {
    
        // update
        if (req.method === 'PUT')  {

            const {id} = req.query
            
            // body
            const jsonBody = JSON.parse(req.body)
            
            const updatedPageId = await updatePage(id, jsonBody)

            if(updatedPageId){

                const updatedPage = await getPageById(id)

                if(updatedPage){
                    return res.json(updatedPage)
                }

            }

            return res.status(500).json({message: "Operation did not work."})

        } 

        else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message })
    }
}