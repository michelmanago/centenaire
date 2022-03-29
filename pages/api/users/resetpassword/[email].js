import {v4 as uuidv4} from 'uuid';
import {query} from '../../../../lib/db';
import {sendResetPasswordEmail} from '../../../../lib/emailSender';
export default async function Handler(req, res) {
    const {email} = req.query;

    if (req.method === 'GET') {
        if (!email) {
            return res.status(400).json({message: '`id` required'});
        }
        const users = await query(
            `
                SELECT id, username, email, role FROM user_table where email like ?
            `,
            email,
        );

        if (users.length === 0)
            return res.status(400).json({message: "Cet email n'est pas enregistré dans notre base de donnée"});

        const newHash = uuidv4();

        const results = await query(
            `
            UPDATE user_table
            SET hash = ?
            WHERE id = ?
            `,
            [newHash, users[0].id],
        );

        await sendResetPasswordEmail({toUser: users[0], hash: newHash});

        return res.json(users[0]);
    } else {
        console.log('error http method');
        res.status(405).json({message: 'Wrong HTTP method'});
    }
}
