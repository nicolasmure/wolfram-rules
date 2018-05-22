const SIZE = 500

const INITIAL_STATE = {
    id: 'canvas',
    width: SIZE,
    height: SIZE,
    maxSize: SIZE,
    ctx: null,
    drawing: false,
}

export const BUILD = 'wolfram-rules/canvas/BUILD'
export const BUILT = 'wolfram-rules/canvas/BUILT'
export const DRAW = 'wolfram-rules/canvas/DRAW'
export const LINE_DRAWN = 'wolfman-rules/canvas/LINE_DRAWN'

export const build = (id, width, height) => ({
    type: BUILD,
    id,
    width,
    height,
})

export const built = ctx => ({
    type: BUILT,
    ctx,
})

export const draw = () => ({
    type: DRAW,
})

export const lineDrawn = () => ({
    type: LINE_DRAWN,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BUILT:
            return {
                ...state,
                ctx: action.ctx,
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
            }

        default:
            return state
    }
}
