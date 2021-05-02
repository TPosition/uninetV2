import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


const handler = async (req, res) => {
    const { msgId, category } = req.body
    try {
        const results = await prisma.replies.findMany({
            where: {
                msgId: Number(msgId),
                category: category
            }
        })

        if (results[0]) {
            return res.json([results, { message: "replies returned" }])
        }

        return res
            .status(400)
            .json({ message: "No reply returned" })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
