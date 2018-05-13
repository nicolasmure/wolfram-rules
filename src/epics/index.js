import { combineEpics } from 'redux-observable'
import canvas from './canvas'
import game from './game'

export default combineEpics(
    canvas,
    game,
)
