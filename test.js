const ins = [2, 3, 4, 5, 6, 7, 8, 9, 10]

console.time('timer')

console.log(ins.map((a) => {
    for (let i = 2; i < 9e7; i++) {
        a += a / i

    }

    return a
}))

console.timeEnd('timer')


// {
//     "inputs": [2, 3, 4, 5, 6, 7, 8, 9, 10],
//     "handle": "(ins) => ins.map((a) => { for (let i = 2; i < 9e7; i++) { a += a / i } return a })"
// }