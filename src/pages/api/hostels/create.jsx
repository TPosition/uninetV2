import Filter from 'bad-words'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const filter = new Filter()

const handler = async (req, res) => {
    const { user, tag, rentFee, bed, contact, water, electricity, wifi, bathroom, furniture, unit, description } = req.body
    try {
        if (!tag || !rentFee || !bed || !contact || !bathroom || !unit) {
            return res
                .status(400)
                .json({ message: 'All information are required' })
        }
        const results = await prisma.hostels.create({
            data: {
                user,
                tag,
                description: filter.clean(description),
                rentFee: Number(rentFee),
                bed: Number(bed),
                contact: filter.clean(contact),
                water: Boolean(water),
                electricity: Boolean(electricity),
                wifi: Boolean(wifi),
                bathroom: Number(bathroom),
                furniture: furniture,
                unit: unit,
            },
        })

        results['message'] = "Message is added."

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
