const {calculateTotal} = require('../calculate');

test('basic test', () => {
    let result = 4;
    expect(result).toBe(4) // result должен быть 4
})


test('calculateTotal sum', () => {
    const list = [
        {
            id: 45,
            name: "Война и мир",
            count: 3,
            price: 400
        },
        {
            id: 23,
            name: "JavaScript",
            count: 1,
            price: 1400 
        }
    ] 

    const result = calculateTotal(list);

    expect(result).toBe(2600)
});


// --------------------------------------------------------------------------
// import calculateCashback from '../cashback.js';

// test('cashback at sum: 500', () => {
//     const result = calculateCashback(500);

//     expect(result).toBe(0)
// })

// const dataList = [      //   Массив из массивов в которых которые будут передаваться в функцию 
//     ['gold', 100000, 5000],
//     ['silver', 10000, 200],
//     ['regular', 1000, 10],
//     ['no', 500, 0]
// ]

// const handler = test.each(dataList);

//handler(prefix, (status, amount, expected)             прим:      gold   100000  5000
// handler('testing cashback function with %s status and %i amount', (status, amount, expected) => {    
//     const result = calculateCashback(amount); // Вставляем общую сумму покупок
    
//     expect(result).toBe(expected);
// })



// ----------------------------------------------------------------


const {loadUser} = require('../user');
const {httpGet} = require('../http');
jest.mock('../http'); // говорим что этот файл должен стать моком

beforeEach(() => { // Перед каждым тестом сбрасываем все моки и все изначальные данные которые в них могли бы быть
    jest.resetAllMocks();
});
test('should call loadUser once', () => {
    httpGet.mockReturnValue(JSON.stringify({})); // говорим что httpGet должен вернуть в строковом эквиваленте объект
    loadUser(1); // единичка будет с помощью функции loadUser подставлена в строку
    expect(httpGet).toBeCalledWith('http://server:8080/users/1'); // убеждаемся что функция httpGet была вызвана (toBeCalledWith) с параметром users/1
});