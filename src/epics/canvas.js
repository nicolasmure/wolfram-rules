import { combineEpics, ofType } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { BUILD, BUILT, DRAW, built, draw, lineDrawn } from '../modules/canvas'
import { TICK } from '../modules/game'
import { build, drawLine } from '../canvas'

const buildCanvasEpic = action$ =>
    action$.pipe(
        ofType(BUILD),
        map(({ id, width, height }) => build(id, width, height)),
        map(built),
    )

const onTickEpic = (action$, store) =>
    action$.pipe(
        ofType(TICK),
        filter(() => !store.getState().canvas.drawing),
        filter(() => store.getState().game.cells.length < store.getState().canvas.maxSize),
        map(draw),
    )

const drawLineEpic = (action$, store) =>
    action$.pipe(
        ofType(DRAW),
        map(() => (drawLine(
            store.getState().game.cells,
            store.getState().game.lineNumber,
            store.getState().canvas.stage,
        ))),
        map(lineDrawn),
    )

export default combineEpics(
    buildCanvasEpic,
    onTickEpic,
    drawLineEpic,
)
