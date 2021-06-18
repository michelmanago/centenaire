import { createPage, getPageById } from "../../../model/page";

export default async function handler(req, res) {
    try {

        // creation
        if (req.method === 'POST')  {
            
            // body
            const jsonBody = JSON.parse(req.body)
            
            const createdPageId = await createPage(jsonBody)

            if(createdPageId){

                const createdPage = await getPageById(createdPageId)

                if(createdPage){
                    return res.json(createdPage)
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