const keyboard = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

const getPosition = (letra: string) => {
    let i = 0
    let j = 0
    // console.log('letra: ', letra)
    while (i <= 3) {
        j = 0
        while (j <= 9) {
            const comp = letra.toLowerCase() === keyboard[i][j]
            // console.log(`${letra.toLowerCase()}${comp ? '===' : '!=='}${keyboard[i][j]}`)
            // console.log(`i[${i}], j[${j}], k[${keyboard[i][j]}]`)
            if (!comp) {
                j += 1
            } else {
                const pos = { linha: i, coluna: j }
                // console.log('pos: ', pos)
                return pos
            }
            // console.log(`i=${i}, j=${j}`)

        }
        i += 1
        // console.log(`i=${i}, j=${j}`)
    }
    // console.log(`i=${i}, j=${j}`)

    const pos = { linha: i, coluna: j }
    // console.log('pos: ', pos)
    return pos
}

export const getQwertyDistance = (letra1: string, letra2: string) => {
    const lp1 = getPosition(letra1)
    const lp2 = getPosition(letra2)
    const dLinha = Math.abs(lp1.linha - lp2.linha)
    const dColuna = Math.abs(lp1.coluna - lp2.coluna)
    // console.log(`lp1[${letra1}]: `, lp1)
    // console.log(`lp2[${letra2}]: `, lp2)
    // console.log('dLinha: ', dLinha)
    // console.log('dColuna: ', dColuna)
    return dLinha + dColuna
}