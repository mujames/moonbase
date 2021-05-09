import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
  if (req.method === 'GET') {
    const {db} = await connectToDatabase()
    for (let i = 1000, b = 50; i > 0; i = i - 100, b = b + b * 0.1) {
      db.collection("moon-coin").insert({unitPrice: b, amount: 50}, {}, function (err, records) {
        console.log("Record added as " + records);
      });
    }

    res.status(200).json({name: 'John Doe'})
  }
}
