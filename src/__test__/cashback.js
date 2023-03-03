const calculateCashback = require('../cashback.js'); 

test('cashback at sum: 500', () => {
    const result = calculateCashback(500);

    expect(result).toBe(0)
})

const dataList = [      //   Массив из массивов в которых которые будут передаваться в функцию 
    ['gold', 100000, 5000],
    ['silver', 10000, 200],
    ['regular', 1000, 10],
    ['no', 500, 0]
]

const handler = test.each(dataList);

//handler(prefix, (status, amount, expected)             прим:      gold   100000  5000
handler('testing cashback function with %s status and %i amount', (_, amount, expected) => {// так как status нигде не задействован можно ее заменить на например нижнее подчеркивание, что бы обозначить для себя что она никак не задействуется    
    const result = calculateCashback(amount); // Вставляем общую сумму покупок
    
    expect(result).toBe(expected);
})                                                  

// названия параметров можно называть произвольно
// prefix это какая то емкая фраза которая будет характеризовать конкретный тест, так как тестов
// в одной функции будет несколько, выглядит как конструкция в которую будут подставляться данные

// %s - в качестве строки вставляем первый параметр, напр gold
// %i - второй параметр %i, напр  100000
// prefix понимает что когда вставлять очень просто, по порядку первый параметр первый в массиве, второй это второй

//Функция each это по сути цикл, как бы по порядку разбирает массивы по очереди как спред и передает как параметры

// чаще всего запись где все разделено не пишут, а объединяют, как написано ниже
// test.each(
//     [
//       ['gold', 100000, 5000],
//       ['silver', 10000, 200],
//       ['regular', 1000, 10],
//       ['no', 500, 0]
//     ]
//   )(
//     ('should calculate cashback for %s level with %i amount'),
//     (level, amount, expected) => {
//       const result = calculateCashback(amount);

//       expect(result).toBe(expected);
//     }
// )
