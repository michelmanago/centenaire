import {validateMediaLegende} from '../../../components/validate/media';
import {deleteMedia, getSingleMedia, updateMedia} from '../../../model/media';

export default async function handler(req, res) {
    try {
        // creation
        if (req.method === 'PUT') {
            // body
            const id = req.query.id;
            const fields = req.body;

            if (!id) {
                return res.status(400).json({
                    message: "Vous devez specifiez l'id du media.",
                });
            }

            // Validate
            if (fields.legende && !validateMediaLegende(fields.legende)) {
                return res.status(400).json('legende is invalid');
            }

            // update media
            await updateMedia(id, fields);

            // get fresh new media
            const newMedia = await getSingleMedia(id);

            return res.json(newMedia);
        } else if (req.method === 'GET') {
            const id = req.query.id;
            const results = await getSingleMedia(id);

            return res.json(results);
        } else if (req.method === 'DELETE') {
            const id = req.query.id;
            let mediaDelete = await deleteMedia(id);
            return res.json({msg: 'Media delete'});
        } else {
            return res.status(405).json({message: 'wrong http method'});
        }
    } catch (e) {
        console.log(e);

        if (e.status) {
            res.status(e.status);
        } else {
            res.status(500);
        }

        return res.json({message: e.message});
    }
}
