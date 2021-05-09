const {calculateMoon} = require("../../../pages/api/utils/calculateUtil");

describe('calculateMoon', () => {

  test('test calculate next moon amount with min unit price', () => {

    let result = calculateMoon([{
        amount: 50,
        unitPrice: 10
      },{
        amount: 50,
        unitPrice: 20
      }], 70)
    expect(result.price).toBe(900);
    expect(result.moonNeeded).toBe(0);
    expect(result.updatedList[0].amount).toBe(0)
    expect(result.updatedList[0].unitPrice).toBe(10)
    expect(result.updatedList[1].amount).toBe(30)
    expect(result.updatedList[1].unitPrice).toBe(20)

    // test case moon exceed
    result = calculateMoon([{
      amount: 50,
      unitPrice: 10
    },{
      amount: 50,
      unitPrice: 20
    }], 300)

    expect(result.moonNeeded).toBe(200);

  });

});