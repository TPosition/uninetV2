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
        const results = await prisma.dashboard.delete({
            where: {
                id: Number(id),
            },
        })
        res.json(results)

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
