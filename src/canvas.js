import Konva from 'konva'
import { BLACK } from './wolfram'

const LINES_PER_LAYER = 20;

/**
 * @see https://konvajs.github.io/docs/overview.html
 */
export const build = (id, width, height) => {
    return new Konva.Stage({
        container: id,
        width,
        height,
    })
}

export const drawLine = (cells, lineNumber, stage) => {
    const x = Math.floor(stage.getWidth() / 2) - Math.floor(cells.length / 2)
    const y = lineNumber;

    const layer = getLayer(stage, cells.length)

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
            layer.add(buildLine(x + i, y, segmentSize, 'black'))
        }
    }

    layer.batchDraw()
    scale(stage, cells.length)
}

const getLayer = (stage, cellsCount) => {
    // When no layer, create a new one
    if (0 === stage.getLayers().length) {
        return buildAndAddLayer(stage)
    }

    // When the previous layer is "full", we cache it and
    // we create a new one.
    if (batchLimitReached(cellsCount)) {
        stage.getLayers()[stage.getLayers().length - 1].cache()

        return buildAndAddLayer(stage)
    }

    // Use previous layer when not "full"
    return stage.getLayers()[stage.getLayers().length - 1]
}

const buildAndAddLayer = stage => {
    const layer = new Konva.Layer()
    stage.add(layer)

    return layer
}

const buildLine = (x, y, length, color) => {
    const strokeWidth = 1
    const lineY = y + strokeWidth / 2

    return new Konva.Line({
        points: [x - length, lineY, x, lineY],
        stroke: color,
        strokeWidth,
    })
}

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

/**
 * As each new line as two new cells, we have to multiply
 * the LINES_PER_LAYER by two to make it accurate.
 */
const batchLimitReached = cellsCount =>
    0 === (cellsCount + 1) % (LINES_PER_LAYER * 2)
