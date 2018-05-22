import { BLACK } from './wolfram'

export const build = (id, width, height) => {
    const canvas = document.getElementById(id)
    canvas.height = height
    canvas.width = width

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = 'black'
    ctx.save()

    return ctx;
}

export const drawLine = (cells, lineNumber, ctx) => {
    const x = Math.floor(ctx.canvas.width / 2) - Math.floor(cells.length / 2)
    const y = lineNumber;

    for (let i = 0; i < cells.length;) {
        while (i < cells.length && BLACK !== cells[i]) {
            i++;
        }

        let segmentSize = 0

        while (i < cells.length && BLACK === cells[i]) {
            segmentSize++;
            i++;
        }

        if (segmentSize > 0) {
            drawSegment(ctx, x + i, y, segmentSize)
        }
    }

    scale(ctx, cells.length)
}

const drawSegment = (ctx, x, y, length) => {
    ctx.fillRect(x - length, y, length, 1)
}

const scale = (ctx, cellsCount) => {
    const canvasWidth = ctx.canvas.width

    if (canvasWidth >= cellsCount) {
        return;
    }

    const ratio = cellsCount / canvasWidth
    const scale = 1 / ratio
    const canvasHeight = ctx.canvas.height
    const offset = Math.floor((cellsCount - canvasWidth) / (ratio * 2))
    console.log(canvasWidth, canvasHeight, scale, ratio, offset)

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
    const backup = document.createElement('canvas')
    backup.getContext('2d').putImageData(imageData, 0, 0)

    ctx.save() // save current matrix (default)
    ctx.transform(scale, 0, 0, scale, offset, 0) // apply dezoom matrix at scale
    ctx.clearRect(0, 0, canvasWidth, canvasHeight) // clear previous content
    ctx.drawImage(backup, 0, 0) // draw image at scale
    ctx.restore() // restore default matrix
}
