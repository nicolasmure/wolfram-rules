import { BLACK } from './wolfram'

const ENLARGE_STEP = 200

export const build = (projectionId, width, height) => {
    const projectionCanvas = document.getElementById(projectionId)
    projectionCanvas.height = height
    projectionCanvas.width = width

    const projectionCtx = projectionCanvas.getContext('2d')

    const paintingCanvas = document.createElement('canvas')
    paintingCanvas.height = height
    paintingCanvas.width = width

    const paintingCtx = paintingCanvas.getContext('2d')
    paintingCtx.fillStyle = 'white'
    paintingCtx.fillRect(0, 0, width, height)

    paintingCtx.fillStyle = 'black'

    projectPainting(paintingCtx, projectionCtx, 0)

    return {
        projectionCtx,
        paintingCtx,
    };
}

export const drawLine = (paintingCtx, projectionCtx, cells, lineNumber) => {
    // enlarge painting ctx so we can still paint when we've reached the edge
    if (cells.length > paintingCtx.canvas.width) {
        paintingCtx = enlargeCtx(paintingCtx, ENLARGE_STEP)
    }

    const x = Math.floor(paintingCtx.canvas.width / 2) - Math.floor(cells.length / 2)
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

    projectPainting(paintingCtx, projectionCtx, cells.length)

    return paintingCtx
}

const drawSegment = (ctx, x, y, length) => {
    ctx.fillRect(x - length, y, length, 1)
}

/**
 * Create a new context enlarged (width and height) by the given amount
 * from the given context.
 * The context drawing is copied to the newly created context.
 *
 * @param CanvasRenderingContext2D ctx
 * @param int amount
 *
 * @return CanvasRenderingContext2D
 */
const enlargeCtx = (ctx, amount) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    const newCanvas = document.createElement('canvas')
    newCanvas.height = height + amount
    newCanvas.width = width + amount

    const newCtx = newCanvas.getContext('2d')

    // copy the ctx image to the transfer
    const transfer = getTransfer(ctx, 0, 0, width, height)

    // draw the image to the new ctx
    newCtx.drawImage(transfer, amount / 2, 0) // top center

    return newCtx
}

/**
 * Returns a canvas contening the image cropped from x and y coordinates
 * having the given width and height dimensions.
 *
 * @param CanvasRenderingContext2D ctx
 * @param int x
 * @param int y
 * @param int width
 * @param int height
 *
 * @return canvas
 */
const getTransfer = (ctx, x, y, width, height) => {
    const imageData = ctx.getImageData(x, y, width, height)
    const transfer = document.createElement('canvas')
    transfer.width = width
    transfer.height = height

    transfer.getContext('2d').putImageData(imageData, 0, 0)

    return transfer
}

/**
 * Returns a canvas sized to the drawing copied from the given
 * painting context.
 *
 * @param CanvasRenderingContext2D ctx
 * @param int size The drawing size
 *
 * @return canvas
 */
const getTransferFittingDrawing = (paintingCtx, size) => {
    const paintingWidth = paintingCtx.canvas.width

    // create a transfer containing the whole drawing
    return getTransfer(
        paintingCtx,
        (paintingWidth - size) / 2,
        0,
        size,
        size,
    )
}

/**
 * Projects the whole paiting on the projection.
 * Scales down when necessary
 *
 * @param CanvasRenderingContext2D paintingCtx
 * @param CanvasRenderingContext2D projectionCtx
 * @param int cellsCount Determines the drawing limit.
 */
const projectPainting = (paintingCtx, projectionCtx, cellsCount) => {
    const projectionWidth = projectionCtx.canvas.width

    if (cellsCount > projectionWidth) {
        return scale(paintingCtx, projectionCtx, cellsCount)
    }

    // no need to scale for now, simply copy / paste the painting
    // to the projection
    const transfer = getTransferFittingDrawing(paintingCtx, projectionWidth)

    copyTransferToProjection(transfer, projectionCtx)
}

/**
 * Scales the painting to the projection in function of the cells count.
 *
 * @param CanvasRenderingContext2D paintingCtx
 * @param CanvasRenderingContext2D projectionCtx
 * @param int cellsCount
 */
const scale = (paintingCtx, projectionCtx, cellsCount) => {
    const projectionWidth = projectionCtx.canvas.width
    const projectionHeight = projectionCtx.canvas.height

    // compute scale
    const ratio = cellsCount / projectionWidth
    const scale = 1 / ratio

    // copy the image from the painting ctx to a transfer
    const transfer = getTransferFittingDrawing(paintingCtx, cellsCount)

    // draw the image to a scaled transfer
    const scaledTransfer = document.createElement('canvas')
    scaledTransfer.height = projectionHeight
    scaledTransfer.width = projectionWidth
    const scaledCtx = scaledTransfer.getContext('2d')
    scaledCtx.scale(scale, scale)
    scaledCtx.drawImage(transfer, 0, 0)

    // copy the scaled image to the projection
    copyTransferToProjection(scaledCtx.canvas, projectionCtx)
}

/**
 * Copy the image from the transfer to the projection
 *
 * @param canvas transfer
 * @param CanvasRenderingContext2D projectionCtx
 */
const copyTransferToProjection = (transfer, projectionCtx) => {
    const projectionWidth = projectionCtx.canvas.width
    const projectionHeight = projectionCtx.canvas.height

    projectionCtx.clearRect(0, 0, projectionWidth, projectionHeight)
    projectionCtx.drawImage(transfer, 0, 0)
}
