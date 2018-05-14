import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import { interval } from 'rxjs/observable/interval'
import { BUILT, LINE_DRAWN } from '../modules/canvas'
import { START_GAME, nextLineComputed, startGame, tick } from '../modules/game'
import { computeNextLine } from '../wolfram'

const startGameEpic = action$ =>
    action$.pipe(
        ofType(BUILT),
        map(startGame),
    )

const tickEpic = action$ =>
    action$.pipe(
        ofType(START_GAME),
        mergeMap(() => interval(10)),
        map(tick),
    )

const computeNextLineEpic = (action$, store) =>
    action$.pipe(
        ofType(LINE_DRAWN),
        map(() => computeNextLine(
            store.getState().game.map,
            store.getState().game.cells,
        )),
        map(nextLineComputed)
    )

export default combineEpics(
    startGameEpic,
    tickEpic,
    computeNextLineEpic,
)
