import Filter from 'bad-words'
import { query } from '../../../lib/db'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const filter = new Filter()

const handler = async (req, res) => {
    const { title, content, user, tag } = req.body
    try {
        if (!title || !content || !tag || !user) {
            return res
                .status(400)
                .json({ message: 'title, content, tag and user are required' })
        }

        // const results = await query(
        //     `
        // INSERT INTO topics (title, content, user, tag)
        // VALUES (?, ?, ?, ?)
        // `,
        //     [filter.clean(title), filter.clean(content), user, tag]
        // )
        const results = await prisma.topics.create({
            data: {
                user: user,
                tag: tag,
                title: filter.clean(title),
                content: filter.clean(content),
            },
        })

        results['message'] = "Topic is added."

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
