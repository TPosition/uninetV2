
import { query } from '../../../lib/db'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const handler = async (req, res) => {
    const { id } = req.body
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        if (typeof parseInt(id.toString()) !== 'number') {
            return res.status(400).json({ message: '`id` must be a number' })
        }
        // const results = await query(
        //     `
        // DELETE FROM message
        // WHERE id = ?
        // `,
        //     id
        // )
        const results = await prisma.messages.delete({
            where: {
                id: id,
            },
        })
        res.json(results)

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler