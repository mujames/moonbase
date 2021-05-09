import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
  if (req.method === 'GET') {
    const {client, db} = await connectToDatabase()

    let moon = await db.collection("moon-coin").find({amount: {$ne: 0}})
        .sort({unitPrice: 1})
        .limit(1)
        .toArray()
    moon = JSON.parse(JSON.stringify(moon))
    res.status(200).json(JSON.parse(JSON.stringify(moon)))
  }
}
