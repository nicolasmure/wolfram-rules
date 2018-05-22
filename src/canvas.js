import { BLACK } from './wolfram'

export const build = (id, width, height) => {
    const canvas = document.getElementById(id)
    canvas.height = height
    canvas.width = width

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = 'black'

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

    // scale(stage, cells.length)
}

const drawSegment = (ctx, x, y, length) => {
    ctx.fillRect(x - length, y, length, 1)
}

/*
const scale = (stage, cellsCount) => {
    const stageWidth = stage.getWidth()

    if (
        stageWidth >= cellsCount
        || !batchLimitReached(cellsCount)
    ) {
        return;
    }

    const ratio = cellsCount / stageWidth
    const scale = 1 / ratio

    stage.scale({
        x: scale,
        y: scale,
    })

    stage.position({
        ...stage.position(),
        x: Math.floor((cellsCount - stageWidth) / (ratio * 2)),
    })

    // Also redraw the previous layers which did not have this scale.
    stage.batchDraw()
}
*/
