import {hash} from 'bcryptjs';
import prisma from '../../../../lib/prisma';
import {getUserByHash} from '../../../../model/user';

export default async function handler(req, res) {
    const {userhash} = req.query;
    const {password} = req.body;

    try {
        if (!userhash) {
            return res.status(400).json({message: '`hash` required'});
        }
        if (req.method === 'PUT') {
            // const users = await query(`SELECT * FROM user_table WHERE hash LIKE ?`, [userhash]);
            const user = await getUserByHash(userhash);
            // console.log(users, users.length);
            // if (!users || users.length === 0) return res.status(500).json({message: 'user not found'});
            if (!user) return res.status(500).json({message: 'user not found'});
            hash(password, 10, async function (err, hash) {
                if (err) res.status(500).json({message: err.message});
                // const results = await query(
                //     `
                //     UPDATE user_table
                //     SET password = ?,
                //     hash = ?
                //     WHERE id = ?
                //     `,
                //     [hash, null, users[0].id],
                // );
                const results = await prisma.user_table.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        password: hash,
                        hash: null,
                    },
                });
                return res.json({message: 'password update'});
            });
        } else {
            res.status(405).json({message: 'Method Not Allowed'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message});
    }
}
