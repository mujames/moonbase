import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
  if (req.method === 'GET') {
    const {db} = await connectToDatabase()
    let moon =  await db.collection("history").find({})
        .sort({ date: -1 })
        .toArray()
    console.log(moon)

    res.status(200).json(JSON.parse(JSON.stringify(moon)))
  }
}
