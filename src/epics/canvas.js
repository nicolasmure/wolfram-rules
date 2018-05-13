import { combineEpics, ofType } from 'redux-observable'
import { filter, map } from 'rxjs/operators'
import { BUILD, BUILT, DRAW, built, draw, firstLineDrawn, lineDrawn } from '../modules/canvas'
import { TICK } from '../modules/game'
import { build, drawLine } from '../canvas'

const buildCanvasEpic = action$ =>
    action$.pipe(
        ofType(BUILD),
        map(({ id, width, height }) => build(id, width, height)),
        map(built),
    )

const drawFirstLineEpic = (action$, store) =>
    action$.pipe(
        ofType(BUILT),
        map(() => draw(true)),
    )

const onTickEpic = (action$, store) =>
    action$.pipe(
        ofType(TICK),
        filter(() => !store.getState().canvas.drawing),
        filter(() => store.getState().game.cells.length < store.getState().canvas.maxSize),
        map(() => draw(false)),
    )

const drawLineEpic = (action$, store) =>
    action$.pipe(
        ofType(DRAW),
        map(({ isFirstLine }) => ({
            draw : drawLine(
                store.getState().game.cells,
                store.getState().game.lineNumber,
                store.getState().canvas.stage,
            ),
            isFirstLine,
        })),
        map(({ isFirstLine }) => isFirstLine
            ? firstLineDrawn()
            : lineDrawn()
        ),
    )

export default combineEpics(
    buildCanvasEpic,
    drawFirstLineEpic,
    onTickEpic,
    drawLineEpic,
)
