import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
  if (req.method === 'POST') {
    const {db} = await connectToDatabase()

    let availableMoon = await db.collection("moon-coin").find({})
        .sort({ unitPrice: 1 })
        .toArray()

    let updatedMoon = []
    const body = JSON.parse(req.body)
    let inputMoon = body.inputMoon
    let inputPrice = body.inputTHBT
    let userTHBT = body.userTHBT
    let inputTolerance = body.inputTolerance
    console.log(req.body)

    let price = 0
    for (let i = 0, moonNeeded = inputMoon; moonNeeded > 0; i++) {
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
    console.log('a', updatedMoon, price)

    if(price > inputPrice +  (inputPrice * 100 * inputTolerance)) {
      res.status(400).json({error: 'Actual price exceed tolerance.'})
      return
    } else if(userTHBT < price) {
      res.status(400).json({error: 'User doesn\'t have enough THBT'})
      return
    }

    for (const m of updatedMoon) {
      db.collection("moon-coin").update({_id: m._id}, m, {}, function (err, records) {
        console.log("Record added as " + records);
      });
    }
    const today = new Date()

    db.collection("history").insert({
      user_id: body.userId,
      date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()) + ' ' + (today.getHours()) + ':' + (today.getMinutes()),
      price: price,
      moon: inputMoon
    }, {}, function (err, records) {
      console.log("Record added as " + records);
    });

    res.status(200).json({price:price, moon: inputMoon})
  }
}
