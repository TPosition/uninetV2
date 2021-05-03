import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const handler = async (req, res) => {
    const { id, anonymous, type, password } = req.body
    try {
        if (!id || !anonymous || !type || !password) {
            return res
                .status(400)
                .json({ message: 'Please fill in all information.' })
        }

        const results = await prisma.user.create({
            data: {
                id,
                anonymous,
                type: Number(type),
                password,

            },
        })

        results['message'] = "User is added."

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
