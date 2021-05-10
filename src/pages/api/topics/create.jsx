import Filter from 'bad-words'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const filter = new Filter()

const handler = async (req, res) => {
    const { title, content, user, isAnonymous, tag } = req.body
    try {
        if (!title || !content || !user || !tag) {
            return res
                .status(400)
                .json({ message: 'Title and Content are required' })
        }
        const results = await prisma.topics.create({
            data: {
                user,
                isAnonymous,
                tag,
                title: filter.clean(title),
                content: filter.clean(content),
            },
        })

        results['message'] = "Message is added."

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
