import { BLACK } from './wolfram'

export const build = (projectionId, width, height) => {
    const projectionCanvas = document.getElementById(projectionId)
    projectionCanvas.height = height
    projectionCanvas.width = width

    const projectionCtx = projectionCanvas.getContext('2d')

    const paintingCanvas = document.createElement('canvas')
    const paintingCtx = paintingCanvas.getContext('2d')
    paintingCtx.fillStyle = 'white'
    paintingCtx.fillRect(0, 0, width, height)

    paintingCtx.fillStyle = 'black'

    applyProjection(paintingCtx, projectionCtx)

    return {
        projectionCtx,
        paintingCtx,
    };
}

export const drawLine = (paintingCtx, projectionCtx, cells, lineNumber) => {
    const x = Math.floor(projectionCtx.canvas.width / 2) - Math.floor(cells.length / 2)
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
            drawSegment(paintingCtx, x + i, y, segmentSize)
        }
    }

    applyProjection(paintingCtx, projectionCtx)
    // scale(ctx, cells.length)
}

const drawSegment = (ctx, x, y, length) => {
    ctx.fillRect(x - length, y, length, 1)
}

const applyProjection = (paintingCtx, projectionCtx) => {
    const paintingHeight = paintingCtx.canvas.height
    const paintingWidth = paintingCtx.canvas.width

    console.log(paintingWidth, paintingHeight)

    const imageData = paintingCtx.getImageData(0, 0, paintingWidth, paintingHeight)
    const transfer = document.createElement('canvas')
    transfer.getContext('2d').putImageData(imageData, 0, 0)

    projectionCtx.drawImage(transfer, 0, 0)
}

/*
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
*/
