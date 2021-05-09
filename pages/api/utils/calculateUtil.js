export function formatDate(date) {
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()) + ' ' + (date.getHours()) + ':' + (date.getMinutes())
}

export function calculateMoon(availableMoon, inputMoon){
    let price = 0
    let updatedList = []
    let moonNeeded = inputMoon
    console.log(moonNeeded,  availableMoon.length )
    for (let i = 0; moonNeeded > 0 && i < availableMoon.length ; i++) {
        console.log(i,  availableMoon.length)
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
            updatedList.push(availableMoon[i])
        }
    }

    return { updatedList, price, moonNeeded }
}