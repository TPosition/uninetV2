import Filter from 'bad-words'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const filter = new Filter()

const handler = async (req, res) => {
    const { content, msgId, user, category } = req.body
    try {
        if (!content || !msgId || !user) {
            return res
                .status(400)
                .json({ message: 'content are required' })
        }
        const results = await prisma.replies.create({
            data: {
                content: filter.clean(content),
                msgId: Number(msgId),
                user: user,
                category: category
            },
        })

        results['message'] = "Reply is added."
        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
