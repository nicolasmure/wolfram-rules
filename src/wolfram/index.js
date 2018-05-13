export const BLACK = false;
export const WHITE = true;

const stringify = cell => BLACK === cell ? 'B' : 'W'

export const computeNextLine = (map, cells) => {
    let newLine = [WHITE];

    cells.forEach((cell, i) => {
        let left = undefined !== cells[i - 1]
            ? cells[i - 1]
            : WHITE

        let right = undefined !== cells[i + 1]
            ? cells[i + 1]
            : WHITE

        let key = stringify(left) + stringify(cell) + stringify(right)

        newLine.push(map[key])
    })

    newLine.push(WHITE)

    return newLine;
}
