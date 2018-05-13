import { BLACK } from '../wolfram'
import { buildMap as buildMap254 } from '../wolfram/map/254'
import { buildMap as buildMap250 } from '../wolfram/map/250'
import { buildMap as buildMap126 } from '../wolfram/map/126'
import { buildMap as buildMap110 } from '../wolfram/map/110'
import { buildMap as buildMap50 } from '../wolfram/map/50'
import { buildMap as buildMap30 } from '../wolfram/map/30'

const INITIAL_STATE = {
    playing: false,
    lineNumber: 0,
    cells: [BLACK],
    map: buildMap126(),
}

export const START_GAME = 'wolfram-rules/game/START_GAME';
export const TICK = 'wolfram-rules/game/TICK';
export const NEXT_LINE_COMPUTED = 'wolfram-rules/game/NEXT_LINE_COMPUTED';

export const startGame = () => ({
    type: START_GAME,
})

export const tick = () => ({
    type: TICK,
})

export const nextLineComputed = cells => ({
    type: NEXT_LINE_COMPUTED,
    cells,
})

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                playing: true,
            }

        case NEXT_LINE_COMPUTED:
            return {
                ...state,
                lineNumber: state.lineNumber + 1,
                cells: action.cells,
            }

        default:
            return state;
    }
}
