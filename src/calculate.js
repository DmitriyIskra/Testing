function calculateTotal(purchases, applyDiscount) {
    let summ = purchases.reduce( (acc, i) => {
        return acc += i.price * i.count;
    },0)

    if(applyDiscount) {    // Если applyDiscount true то возвращаем сумму пополам
        return summ * 0.5;
    }

    return summ;  // Вернем когда applyDiscount false
}

module.exports = {
    calculateTotal
} 


// ------------------------------------------------------------------------------- 

// const cashback = {
//     regular: {
//       bound:1000,
//       percent: 1,
//     },
//     silver: {
//       bound: 10000,
//       percent: 2,
//     },
//     gold: {
//       bound: 100000,
//       percent: 5,
//     },
// };


// export default function calculateCashback(amount) { // amount - сумма покупок
//     if(amount >= cashback.gold.bound) {
//         return Math.ceil(amount * cashback.gold.percent / 100);
//     };

//     if(amount >= cashback.silver.bound) {
//         return Math.ceil(amount * cashback.silver.percent / 100);
//     };

//     if(amount >= cashback.regular.bound) {
//         return Math.ceil(amount * cashback.regular.percent / 100);
//     };

//     return 0;
// };