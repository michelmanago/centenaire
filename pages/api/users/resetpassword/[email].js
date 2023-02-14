import {v4 as uuidv4} from 'uuid';
import {sendResetPasswordEmail} from '../../../../lib/emailSender';
import prisma from '../../../../lib/prisma';
import {getUserByEmail} from '../../../../model/user';
export default async function Handler(req, res) {
    const {email} = req.query;

    if (req.method === 'GET') {
        if (!email) {
            return res.status(400).json({message: '`id` required'});
        }
        // const users = await query(
        //     `
        //         SELECT id, username, email, role FROM user_table where email like ?
        //     `,
        //     email,
        // );
        const user = await getUserByEmail(email);

        if (user === null)
            return res.status(400).json({message: "Cet email n'est pas enregistré dans notre base de donnée"});

        const newHash = uuidv4();

        // const results = await query(
        //     `
        //     UPDATE user_table
        //     SET hash = ?
        //     WHERE id = ?
        //     `,
        //     [newHash, users[0].id],
        // );
        const results = await prisma.user_table.update({
            where: {id: user.id},
            data: {
                hash: newHash,
            },
        });

        // await sendResetPasswordEmail({toUser: users[0], hash: newHash});
        await sendResetPasswordEmail({toUser: user, hash: newHash});

        return res.json(user);
    } else {
        console.log('error http method');
        res.status(405).json({message: 'Wrong HTTP method'});
    }
}
