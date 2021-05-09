import { connectToDatabase } from '../../utils/mongodb'
import {calculateMoon, formatDate} from "./utils/calculateUtil";

export default async (req, res) => {
  if (req.method === 'POST') {
    const {db} = await connectToDatabase()

    let availableMoon = await db.collection("moon-coin").find({})
        .sort({ unitPrice: 1 })
        .toArray()

    const body = JSON.parse(req.body)
    let inputMoon = body.inputMoon
    let inputPrice = body.inputTHBT
    let userTHBT = body.userTHBT
    let inputTolerance = body.inputTolerance
    console.log(req.body)

    const calculateResult = calculateMoon(availableMoon, inputMoon)

    if(calculateResult.moonNeeded !== 0) {
      res.status(400).json({error: 'Moon coin have not enough amount to sell.'}); return
    } else if(calculateResult.price > inputPrice +  (inputPrice * 100 * inputTolerance)) {
      res.status(400).json({error: 'Actual price exceed tolerance.'}); return
    } else if(userTHBT < calculateResult.price) {
      res.status(400).json({error: 'User does not have enough THBT'}); return
    }

    for (const m of calculateResult.updatedList) {
      db.collection("moon-coin").update({_id: m._id}, m, {}, function (err, records) {
        console.log("Record added as " + records);
      });
    }

    db.collection("history").insert({
      user_id: body.userId,
      date: formatDate(new Date()),
      price: calculateResult.price,
      moon: inputMoon
    }, {}, function (err, records) {
      console.log("Record added as " + records);
    });

    res.status(200).json({price:calculateResult.price, moon: inputMoon})
  }
}