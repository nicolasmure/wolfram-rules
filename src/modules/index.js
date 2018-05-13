import { combineReducers } from 'redux'
import canvas from './canvas'
import game from './game'

export default combineReducers({
    canvas,
    game,
})
