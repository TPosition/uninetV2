import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const handler = async (req, res) => {
    try {
        const results = await prisma.topics.findMany()

        if (results[0]) {
            return res.json(results)
        }

        return res
            .status(400)
            .json({ message: "No message returned" })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
