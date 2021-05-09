import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
  if (req.method === 'GET') {
    const result = []
    const {db} = await connectToDatabase()
    for (let amountLeft = req.query.amount, price = Number(req.query.initPrice); amountLeft > 0; amountLeft = amountLeft - req.query.riseEvery, price = Number(price) + Number(price) * 0.1) {
      let item = {unitPrice: price, amount: Number(amountLeft >  req.query.riseEvery ? req.query.riseEvery : amountLeft)}
      result.push(item)
      db.collection("moon-coin").insert(item, {});
    }

  res.status(200).json(JSON.parse(JSON.stringify(result)))
  }
}
