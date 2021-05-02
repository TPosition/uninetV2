import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const handler = async (req, res) => {
    const { id, password } = await req.body
    try {

        if (!id || !password) {
            return res
                .status(400)
                .json({ message: "Student id and password is required" })
        }

        const results = await prisma.user.findFirst({
            where: {
                id: id,
                password: password,
            },
        })

        if (results) {
            return res.json(results)
        }

        return res
            .status(400)
            .json({ message: "Your ID or password is incorrect" })

    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
