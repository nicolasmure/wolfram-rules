const SIZE = 500

const INITIAL_STATE = {
    id: 'canvas',
    width: SIZE,
    height: SIZE,
    maxSize: SIZE * 4,
    stage: null,
    drawing: false,
}

export const BUILD = 'wolfram-rules/canvas/BUILD'
export const BUILT = 'wolfram-rules/canvas/BUILT'
export const DRAW = 'wolfram-rules/canvas/DRAW'
export const FIRST_LINE_DRAWN = 'wolfram-rules/canvas/FIRST_LINE_DRAWN'
export const LINE_DRAWN = 'wolfman-rules/canvas/LINE_DRAWN'

export const build = (id, width, height) => ({
    type: BUILD,
    id,
    width,
    height,
})

export const built = stage => ({
    type: BUILT,
    stage,
})

export const draw = isFirstLine => ({
    type: DRAW,
    isFirstLine,
})

export const firstLineDrawn = () => ({
    type: FIRST_LINE_DRAWN,
})

export const lineDrawn = () => ({
    type: LINE_DRAWN,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUILT:
            return {
                ...state,
                stage: action.stage,
            }

        case DRAW:
            return {
                ...state,
                drawing: true,
            }

        case FIRST_LINE_DRAWN:
        case LINE_DRAWN:
            return {
                ...state,
                drawing: false,
            }

        default:
            return state
    }
}
