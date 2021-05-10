import Filter from 'bad-words'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const filter = new Filter()

const handler = async (req, res) => {
    const { user, tag, contact, salary, perPeriod, workingHour, workingDuration, position, scope, requirement, description, company, address } = req.body
    try {
        if (!tag || !contact || !salary || !perPeriod || !position || !company || !address) {
            return res
                .status(400)
                .json({ message: 'Contact, salary, position, company, address are required' })
        }
        const results = await prisma.jobs.create({
            data: {
                user, tag, contact, salary: String(salary), perPeriod, workingHour, workingDuration, position, scope, requirement, description, company, address
            },
        })

        results['message'] = "Message is added."

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
