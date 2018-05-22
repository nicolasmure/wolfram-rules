const SIZE = 500

const INITIAL_STATE = {
    projectionId: 'projection',
    width: SIZE,
    height: SIZE,
    maxSize: SIZE * 2,
    projectionCtx: null,
    paintingCtx: null,
    drawing: false,
}

export const BUILD = 'wolfram-rules/canvas/BUILD'
export const BUILT = 'wolfram-rules/canvas/BUILT'
export const DRAW = 'wolfram-rules/canvas/DRAW'
export const LINE_DRAWN = 'wolfman-rules/canvas/LINE_DRAWN'

export const build = (projectionId, width, height) => ({
    type: BUILD,
    projectionId,
    width,
    height,
})

export const built = ({ projectionCtx, paintingCtx }) => ({
    type: BUILT,
    projectionCtx,
    paintingCtx,
})

export const draw = () => ({
    type: DRAW,
})

export const lineDrawn = paintingCtx => ({
    type: LINE_DRAWN,
    paintingCtx,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUILT:
            return {
                ...state,
                projectionCtx: action.projectionCtx,
                paintingCtx: action.paintingCtx,
            }

        case DRAW:
            return {
                ...state,
                drawing: true,
            }

        case LINE_DRAWN:
            return {
                ...state,
                drawing: false,
                paintingCtx: action.paintingCtx,
            }

        default:
            return state
    }
}
