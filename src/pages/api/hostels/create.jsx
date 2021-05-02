import Filter from 'bad-words'
import { query } from '../../../lib/db'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const filter = new Filter()

const handler = async (req, res) => {
    var { user, tag, rentFee, bed, contact, water, electricity, wifi, bathroom, furniture, unit, description } = req.body

    rentFee = Number(rentFee)
    bed = Number(bed)
    bathroom = Number(bathroom)
    water = Boolean(water)
    electricity = Boolean(electricity)
    wifi = Boolean(wifi)
    user = String(user)

    try {
        if (!tag || !rentFee || !bed || !contact || !bathroom || !furniture || !unit || !description) {
            return res
                .status(400)
                .json({ message: 'Please fill in all information.' })
        }

        // const results = await query(
        //     `
        // INSERT INTO hostels (tag, rent_fee, unit, description)
        // VALUES (?, ?,?,?)
        // `,
        //     [tag, rent_fee, filter.clean(unit), filter.clean(description)]
        // )
        const results = await prisma.hostels.create({
            data: {
                tag: tag,
                rentFee: rentFee,
                bed: bed,
                contact: contact,
                water: water,
                wifi: wifi,
                bathroom: bathroom,
                furniture: furniture,
                unit: unit,
                description: description,
                electricity: electricity,
                user: user,
            },
        })

        results['message'] = "Message is added."

        return res.json(results)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
