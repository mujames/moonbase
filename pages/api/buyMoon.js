import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
  if (req.method === 'GET') {
    const {db} = await connectToDatabase()

    let availableMoon = await db.collection("moon-coin").find({})
        .sort({ unitPrice: 1 })
        .toArray()

    let updatedMoon = []
    let moon = 110
    let inputPrice = 100
    let inputTolerance = 5
    let price = 0
    for (let i = 0, moonNeeded = moon; moonNeeded > 0; i++) {
      if(availableMoon[i].amount > 0) {
        console.log(availableMoon[i].unitPrice)
        if(availableMoon[i].amount > moonNeeded) {
          price = price + moonNeeded * availableMoon[i].unitPrice
          availableMoon[i].amount = availableMoon[i].amount - moonNeeded
          moonNeeded = 0
        } else {
          price = price + availableMoon[i].amount * availableMoon[i].unitPrice
          moonNeeded = moonNeeded - availableMoon[i].amount
          availableMoon[i].amount = 0
        }
        updatedMoon.push(availableMoon[i])
      }
    }
    if(price > inputPrice* (100*inputTolerance)) {
      //res.status(200).json({name: 'John Doe'})
    }

    for (const m of updatedMoon) {
      db.collection("moon-coin").update({_id: m._id}, m, {}, function (err, records) {
        console.log("Record added as " + records);
      });
    }
    console.log(updatedMoon)
    res.status(200).json({name: 'John Doe'})
  }
}
