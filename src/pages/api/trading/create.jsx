import Filter from 'bad-words'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const filter = new Filter()

const handler = async (req, res) => {
    const { title, description, user, tag, contact, image } = req.body
    try {
        if (!title || !description || !user || !tag || !contact) {
            return res
                .status(400)
                .json({ message: 'Please fill in all information.' })
        }

        const results = await prisma.trading.create({
            data: {
                user: user,
                tag: tag,
                title: filter.clean(title),
                description: filter.clean(description),
                contact: filter.clean(contact),
                image: image,
            },
        })

        results['message'] = "Topic is added."

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
