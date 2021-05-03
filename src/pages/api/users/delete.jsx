import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const handler = async (req, res) => {
    const { id } = req.body
    try {
        if (!id) {
            return res.status(400).json({ message: '`id` required' })
        }
        const results = await prisma.user.delete({
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
