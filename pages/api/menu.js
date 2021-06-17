import { setMenu } from "../../model/menu";

export default async function handler(req, res) {
    try {
        if (req.method === 'PUT')  {
            
            // body
            let jsonBody = JSON.parse(req.body)
            const {data, locale} = jsonBody

            // set 
            let affectedRows = await setMenu(data, locale)

            return res.json(1);
        } else {
            return res.status(405).json({ message: 'wrong http method' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}